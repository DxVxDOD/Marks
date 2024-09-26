import { Button, ButtonGroup, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useStyle from "../theme/Style";

const Menu = () => {
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const { user } = useAuth();
  const { classes } = useStyle();

  return (
    <Paper
      component="header"
      sx={{
        display: "flex",
        padding: "0.5em",
        justifyContent: "flex-end",
        borderRadius: 0,
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
      }}
      variant="outlined"
    >
      {user === null ? (
        <ButtonGroup variant="text">
          <Button component={RouterLink} to="/sign-up">
            <Typography className={classes.text}>Sign up</Typography>
          </Button>
          <Button component={RouterLink} to="/login">
            <Typography className={classes.text}>Log in</Typography>
          </Button>
        </ButtonGroup>
      ) : (
        <ButtonGroup variant="text">
          {user && (
            <Button component={RouterLink} to={"/mark-form"}>
              <Typography className={classes.text}>New Mark</Typography>
            </Button>
          )}
          <Button component={RouterLink} to={"/"}>
            <Typography className={classes.text}>Marks</Typography>
          </Button>
          <Button onClick={handleLogout}>
            <Typography className={classes.text}>Log out</Typography>
          </Button>
        </ButtonGroup>
      )}
    </Paper>
  );
};

export default Menu;
