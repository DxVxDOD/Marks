import { makeStyles } from "tss-react/mui";
import theme from "./Theme";

const useStyle = makeStyles()(() => {
  return {
    text: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.75rem",
      },
    },
    list_text: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.8rem",
      },
    },
    primary_text: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
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

    reel_text: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.75rem",
      },
      textWrap: "nowrap",
    },
    text_field: {
      [theme.breakpoints.up("sm")]: {
        width: "100%",
      },
    },
    home_paper: {
      [theme.breakpoints.up("sm")]: {
        width: "50%",
      },
    },
  };
});

export default useStyle;
