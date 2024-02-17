import { makeStyles } from "tss-react/mui";

const reel = makeStyles()((theme) => {
  return {
    tagWidth: {
      [theme.breakpoints.down("sm")]: {
        gridAutoColumns: "calc(50% - (var(--gap) / 2))",
      },
    },
  };
});

export default reel;
