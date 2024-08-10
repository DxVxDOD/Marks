import { makeStyles } from "tss-react/mui";
import theme from "./Theme";

const useStyle = makeStyles()(() => {
  return {
    text: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.75rem",
      },
    },
  };
});

export default useStyle;
