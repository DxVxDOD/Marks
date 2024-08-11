import { makeStyles } from "tss-react/mui";
import theme from "./Theme";

const useStyle = makeStyles()(() => {
  return {
    text: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.75rem",
      },
    },
    primary_text: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.8rem",
      },
    },
    list_heading: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
    },
    paper: {
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
  };
});

export default useStyle;
