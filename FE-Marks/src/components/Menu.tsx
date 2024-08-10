import { Button, ButtonGroup, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Menu = () => {
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const { user } = useAuth();

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
            Sign up
          </Button>
          <Button component={RouterLink} to="/login">
            Log in
          </Button>
        </ButtonGroup>
      ) : (
        <ButtonGroup variant="text">
          <Button component={RouterLink} to={"/marks"}>
            Marks
          </Button>
          <Button component={RouterLink} to={"/"}>
            Home
          </Button>
          <Button onClick={handleLogout}>Log out</Button>
        </ButtonGroup>
      )}
    </Paper>
  );
};

export default Menu;
