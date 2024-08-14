import { Divider, List, ListItemText, Paper, Typography } from "@mui/material";
import { TUserToFE } from "../../../BE_Marks/src/types/user.ts";
import useStyle from "../theme/Style.tsx";

const Home = ({ user }: { user: TUserToFE }) => {
  // const created_at = user.createdAt
  //   .toString()
  //   .split(":")[0]
  //   .split("T")[0]
  //   .replaceAll("-", " ");
  const { classes } = useStyle();

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        borderRadius: 0,
      }}
      variant="outlined"
      className={classes.paper}
    >
      <List>
        <ListItemText
          primary={
            <Typography className={classes.primary_text}>Username</Typography>
          }
          secondary={
            <Typography
              className={classes.text}
              variant="body2"
              component="span"
              color="gray"
            >
              {user.username}
            </Typography>
          }
        ></ListItemText>
        <Divider variant="middle" />
        <ListItemText
          primary={
            <Typography className={classes.primary_text}>Name</Typography>
          }
          secondary={
            <Typography
              className={classes.text}
              variant="body2"
              component="span"
              color="gray"
            >
              {user.name}
            </Typography>
          }
        ></ListItemText>
        <Divider variant="middle" />
        <ListItemText
          primary={
            <Typography className={classes.primary_text}>Email</Typography>
          }
          secondary={
            <Typography
              className={classes.text}
              variant="body2"
              component="span"
              color="gray"
            >
              {user.email}
            </Typography>
          }
        ></ListItemText>
        <Divider variant="middle" />
        <ListItemText
          primary={
            <Typography className={classes.primary_text}>
              Number of marks
            </Typography>
          }
          secondary={
            <Typography
              className={classes.text}
              variant="body2"
              component="span"
              color="gray"
            >
              {user.marks_length}
            </Typography>
          }
        ></ListItemText>
      </List>
    </Paper>
  );
};

export default Home;
