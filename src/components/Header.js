// Component to render the header and some descriptive text
import { createUseStyles } from "react-jss";

// JSS-styling
const useStyles = createUseStyles({
  description: {
    width: "60%",
    "@media (max-width: 720px)": {
      width: "95%",
      maxWidth: "100vw",
    },
  },
});

export function Header(props) {
  const classes = useStyles();
  return (
    <>
      <p className={classes.description}>
        <em>
          The task is to render a counter, that is incremented and decremented
          with the buttons, styled in below fashion using JSS. <br></br>
          <br></br> Following the change of the counter, an API-fetch is made,
          displaying info on the Github-repository that corresponds with the
          counter number, based on the index of the repo-id (full name) in an
          array. If the fetch throws and error, this is communicated in the UI.
          <br></br>
          <br></br>
          Please see, among others, component "ButtonsWithCounter.js" in
          src/components for code and comments.
        </em>
      </p>
      <h1>Code excercise @Jtotheo</h1>
    </>
  );
}
