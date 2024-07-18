import { Box, Paper, Typography } from "@mui/material";
import { TUserToFE } from "../../../BE_Marks/src/types/user.ts";
import useHome from "../theme/Home";
import markList from "../theme/MarkList.tsx";

const Home = ({ user }: { user: TUserToFE }) => {
  const { classes } = markList();
  const button = useHome().classes;
  console.log(user);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        width: "100%",
      }}
      component="section"
    >
      <Paper
        sx={{
          gap: "1rem",
          display: "flex",
          flexDirection: "column",
          minWidth: "75%",
          padding: "2rem",
          orderRadius: 0,
          background: "#121213",
        }}
        className="box"
        component="article"
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            borderRadius: 0,
          }}
          className="box"
        >
          <Typography variant="body2" component="h2">
            {user.name}
          </Typography>
          <div>
            <Typography>{user.username}</Typography>
            <Typography>{user.email}</Typography>
            <Typography>created at</Typography>
            <Typography>{user.marks_length}</Typography>
          </div>
        </Paper>
        <Typography
          className={classes.h3 + " loading"}
          component="h3"
          variant="h6"
        >
          Loading your marks...
        </Typography>
      </Paper>
    </Box>
  );
};

export default Home;
