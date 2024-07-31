import { Divider, List, ListItemText, Paper, Typography } from "@mui/material";
import { TUserToFE } from "../../../BE_Marks/src/types/user.ts";
import useHome from "../theme/Home.tsx";

const Home = ({ user }: { user: TUserToFE }) => {
  const { classes } = useHome();
  const created_at = user.createdAt
    .toString()
    .split(":")[0]
    .split("T")[0]
    .replaceAll("-", " ");

  return (
    <Paper
      sx={{
        gap: "1rem",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        orderRadius: 0,
        background: "#121213",
      }}
      component="section"
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
                {created_at}
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
    </Paper>
  );
};

export default Home;
