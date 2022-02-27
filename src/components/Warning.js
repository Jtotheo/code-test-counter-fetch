// Component renders a warning text, so user knows why counter is not
// increasing or decreasing.
import { createUseStyles } from "react-jss";

// JSS-styling
const useStyles = createUseStyles({
  warning: {
    border: "solid 4px red",
    textAlign: "center",
    margin: "20px",
    backgroundColor: "orange",
    fontWeight: "bolder",
    width: "80%",
  },
});

export function Warning() {
  const classes = useStyles();
  return (
    <div className={classes.warning}>
      <p>
        <span>WARNING</span>
        <br /> Counter only goes between 0 and 7!
      </p>
    </div>
  );
}
