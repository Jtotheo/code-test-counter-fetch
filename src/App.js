import { ButtonsWithCounter } from "./components/ButtonsWithCounter";
import { Header } from "./components/Header";
import { createUseStyles } from "react-jss";

// JSS-styling
const useStyles = createUseStyles({
  /* Remove browser styling */
  App: {
    padding: 0,
    margin: 0,
    boxSizing: "borderBox",
  },
  /* Aligning content to center */
  container: {
    width: "100%",

    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.App}>
      <div className={classes.container}>
        <Header />
        <ButtonsWithCounter />
      </div>
    </div>
  );
}

export default App;
