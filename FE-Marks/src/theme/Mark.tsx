import { makeStyles } from "tss-react/mui";

const useMark = makeStyles()((theme) => {
  return {
    title: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
    },
    author: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
    },
    button: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.8rem",
      },
    },
    otherTxt: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.8rem",
      },
    },
  };
});

export default useMark;
