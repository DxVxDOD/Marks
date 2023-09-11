import { makeStyles } from "tss-react/mui";

const useHeader = makeStyles()((theme) => {
  return {
    button: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.6rem",
      },
    },
    h1: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
    },
    bttnStack: {
      [theme.breakpoints.down("sm")]: {
        margin: 0,
      },
    },
  };
});

export default useHeader;
