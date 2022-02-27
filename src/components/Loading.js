// Component to be rendered during page load, awaiting completion of fetch.
import { createUseStyles } from "react-jss";

// JSS-styling
const useStyles = createUseStyles({
  loader: {
    marginTop: "2rem",
    border: "solid 4px red",
    textAlign: "center",
    backgroundColor: "orange",
    fontWeight: "bolder",
    padding: "20px",
  },
});

export function Loading() {
  const classes = useStyles();
  return <div className={classes.loader}>Loading...</div>;
}
