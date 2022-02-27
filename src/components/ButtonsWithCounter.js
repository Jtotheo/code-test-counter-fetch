// This component contains the bulk of the functional logic, and renders the buttons, as well the components:
// Counter, Warning and RepoInfo.

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Counter } from "./Counter";
import { Warning } from "./Warning";
import { RepoInfo } from "./RepoInfo";
import { Loading } from "./Loading";
import { createUseStyles } from "react-jss";

// JSS-styling
const useStyles = createUseStyles({
  /* Aligning buttons & counter div */
  buttonsCounter: {
    margin: "auto",
    width: "28rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@media (max-width: 720px)": {
      width: "95%",
      maxWidth: "95vw",
    },
  },

  /* Styling for "normal"/decrement button */
  normal: {
    height: "3rem",
    padding: "0 2rem",
    "@media (max-width: 500px)": {
      padding: "0 0.5rem",
    },
    backgroundColor: "white",
    border: "2px solid black",
    borderRadius: "3rem",
    color: "black",
    "&:hover": {
      color: "white",
      backgroundColor: "black",
    },
  },

  /* Styling for "primary"/decrement button */
  primary: {
    height: "3rem",
    padding: "0 2rem",
    "@media (max-width: 500px)": {
      padding: "0 0.5rem",
    },
    backgroundColor: "hotpink",
    border: "none",
    borderRadius: "3rem",
    color: "white",
    "&:hover": {
      backgroundColor: "rebeccapurple",
    },
  },

  /* Styling for the plus and minus signs */

  plus: {
    fontSize: "1.5rem",
    marginRight: "10px",
    fontWeight: "bold",
  },

  minus: {
    fontSize: "1.5rem",
    marginRight: "10px",
    fontWeight: "bold",
    position: "relative",
    bottom: "2px",
  },

  /* Aligning button text */

  buttonText: {
    position: "relative",
    bottom: "4px",
  },
  infoSection: {
    width: "35rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

// Component function:
export function ButtonsWithCounter() {
  // Using the state-hook for for the counter.
  const [counter, setCounter] = useState(0);
  // Using the state hook for a counter-limit warning (boolean).
  const [outOfBounds, setOutOfBounds] = useState(false);
  // Using the state hook for "caching" the fetched repo info to object.
  const [repoInfo, setRepoInfo] = useState({});
  // Using state hook for loading-boolean
  const [loading, setLoading] = useState(false);

  // The provided array with the 8 different repo id:s
  const repoNames = [
    "eslint/eslint",
    "oakwood/front-end-questions",
    "babel/babel",
    "webpack/webpack",
    "storybooks/storybook",
    "facebook/react",
    "reactjs/redux",
    "expressjs/express",
  ];
  // Variable to use for JSS destructuring when assigning className-attribute.
  const classes = useStyles();

  // useEffect is used to update the "repoInfo" state object on first render, using below function.
  useEffect(() => {
    fetchData(counter, repoNames);
  }, []);

  // Function to fetch repository data, using parameters for index and array. The function
  // utilizes the setState hook to update the "repoinfo"-object. If there is an error when fetching, the user is notified
  // via the UI. The function sets the "loading"-state to true until completion of fetch, then sets it to false.
  async function fetchData(i, arr) {
    let errorCode = null;
    setLoading(true);
    await fetch(`https://api.github.com/repos/${arr[i]}`)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          errorCode = res.status;
          throw Error(res.statusText);
        }
      })
      .then((data) => {
        setRepoInfo({
          name: data.full_name,
          description: data.description,
          starAmount: data.stargazers_count,
        });
        setLoading(false);
      })
      .catch((error) => {
        setRepoInfo({
          name: `Sorry, the server responed with error ${errorCode} when trying to fetch "https://api.github.com/repos/${arr[i]}"`,
          description: `${errorCode}-error`,
          starAmount: "Negative",
        });
        setLoading(false);
      });
  }

  // Functions to handle the onClick-attributes: decrease or increase counter, checking so that the span is within the
  // length of the repoNames-array, and calling the fetch function with the new counter value as index value (first argument)
  // to insert the correct repo:id in the function. Second argument is the "repoName"-array.
  function handleDecClick() {
    if (counter <= 7 && counter > 0) {
      setOutOfBounds(false);
      setCounter(counter - 1);
    } else setOutOfBounds(true);
    //As the fetch should use the next (upcoming upon rerender) decrement counter number, as long as counter !== 0,
    // counter is subtracted by one. The condition is tested using the ternary operator.
    fetchData(counter > 0 ? counter - 1 : counter, repoNames);
  }

  function handleIncClick() {
    if (counter >= 0 && counter < 7) {
      setOutOfBounds(false);
      setCounter(counter + 1);
    } else setOutOfBounds(true);
    //As the fetch should use the next (upcoming upon rerender) increment counter number, as long as counter !== 7,
    // counter is added by one. The condition is tested using the ternary operator.
    fetchData(counter < 7 ? counter + 1 : counter, repoNames);
  }

  // The returned JSX code below:
  return (
    <div>
      {/* buttons and counter */}
      <div className={classes.buttonsCounter}>
        <button className={classes.normal} onClick={() => handleDecClick()}>
          <span className={classes.minus}>-</span>
          <span className={classes.buttonText}>DECREMENT</span>
        </button>
        <Counter count={counter} />
        <button className={classes.primary} onClick={() => handleIncClick()}>
          <span className={classes.plus}>+</span>
          <span className={classes.buttonText}>INCREMENT</span>
        </button>
      </div>
      {/* Warning text that renders if the min or max number for counter has been reached
      based off the logic in the handleClick-functions above. If state "outOfBounds" is true,
      the warning text is rendered. The condition is tested using the ternary operator.*/}
      <div className={classes.infoSection}>
        {outOfBounds ? <Warning /> : ""}
        {/* Conditional ternary operator decides to render the "Loading"-component, the "RepoInfo"-component or and
        empty string based on the "loading"-state and the "repoInfo"-state. */}
        {loading ? (
          <Loading />
        ) : repoInfo ? (
          <RepoInfo
            name={repoInfo.name}
            description={repoInfo.description}
            starAmount={repoInfo.starAmount}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
