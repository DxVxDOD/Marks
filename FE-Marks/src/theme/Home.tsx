import { makeStyles } from "tss-react/mui";

const useHome = makeStyles()((theme) => {
  return {
    button: {
      [theme.breakpoints.down("sm")]: {
        padding: "0.25rem",
      },
    },
    bttnTxt: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.7rem",
      },
    },
  };
});

export default useHome;
