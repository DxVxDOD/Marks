import {
  Box,
  Divider,
  List,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { TUserToFE } from "../../../BE_Marks/src/types/user.ts";
import markList from "../theme/MarkList.tsx";

const Home = ({ user }: { user: TUserToFE }) => {
  const { classes } = markList();

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
          <List>
            <ListItemText
              primary="Username"
              secondary={
                <Typography variant="body2" component="span" color="gray">
                  {user.username}
                </Typography>
              }
            ></ListItemText>
            <Divider variant="middle" />
            <ListItemText
              primary="Name"
              secondary={
                <Typography variant="body2" component="span" color="gray">
                  {user.name}
                </Typography>
              }
            ></ListItemText>
            <Divider variant="middle" />
            <ListItemText
              primary="Email"
              secondary={
                <Typography variant="body2" component="span" color="gray">
                  {user.email}
                </Typography>
              }
            ></ListItemText>
            <Divider variant="middle" />
            <ListItemText
              primary="Created"
              secondary={
                <Typography variant="body2" component="span" color="gray">
                  {user.createdAt}
                </Typography>
              }
            ></ListItemText>
            <Divider variant="middle" />
            <ListItemText
              primary="Number of marks"
              secondary={
                <Typography variant="body2" component="span" color="gray">
                  {user.marks_length}
                </Typography>
              }
            ></ListItemText>
          </List>
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
