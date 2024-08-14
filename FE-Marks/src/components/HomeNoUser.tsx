import { Paper, Typography } from "@mui/material";

const HomeNoUser = () => {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: "1rem",
      }}
      component="section"
      variant="outlined"
    >
      <Typography>
        A simple web app to store and search through your bookmarks by category.
      </Typography>
    </Paper>
  );
};

export default HomeNoUser;
