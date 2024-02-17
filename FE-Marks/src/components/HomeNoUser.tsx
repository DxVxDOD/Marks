import { Box, Button, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import markList from "../theme/MarkList";

const HomeNoUser = () => {
  const { classes } = markList();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "center",
      }}
      component="section"
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "75%",
          padding: "2rem",
          background: "#121213",
        }}
      >
        <Box>
          <Typography className={classes.h2} component="h2" variant="h5">
            Marks let's you store, filter, organize an search your and others
            bookmarks!
          </Typography>
          <Typography
            className={classes.h3}
            sx={{
              margin: "1rem",
            }}
            component="h3"
            variant="subtitle1"
          >
            This way knowledge and fun articles can be spread easily!
          </Typography>
        </Box>
        <Box>
          <Typography
            className={classes.otherTxt}
            component="h4"
            variant="subtitle1"
          >
            If you would like to get started right away just sign up and start
            viewing and storing!
          </Typography>
        </Box>
      </Paper>
      <Button
        variant="outlined"
        size="small"
        color="success"
        component={RouterLink}
        to={"/login"}
      >
        Sign up
      </Button>
    </Box>
  );
};

export default HomeNoUser;
