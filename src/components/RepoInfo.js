// Component to render the information about the repositories
// using props.name, props.description and props.starAmount to recieve
// data from parent component: "ButtonsWithCounter.js"

import { createUseStyles } from "react-jss";

// JSS-styling
const useStyles = createUseStyles({
  /* Aligning info section */
  headerRepoInfo: {
    textAlign: "center",
  },

  repoInfo: {
    marginTop: "0",
    position: "absolute",
    top: "28rem",
    width: "35rem",
  },
});

export function RepoInfo(props) {
  const classes = useStyles();
  return (
    <div className={classes.repoInfo}>
      <h2 className={classes.headerRepoInfo}>Repository Information</h2>
      <p>
        <strong>Repository Name:</strong> {props.name}
      </p>
      <p>
        <strong>Description:</strong> {props.description}
      </p>
      <p>
        <strong>Amount of stars:</strong> {props.starAmount}
      </p>
    </div>
  );
}
