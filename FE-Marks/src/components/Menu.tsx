import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import useHeader from "../theme/Header";
import { useAuth } from "../hooks/useAuth";

const Menu = () => {
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const { user } = useAuth();

  const { classes } = useHeader();

  return (
    <Paper
      component="header"
      sx={{
        borderRadius: 0,
        display: "flex",
        width: "100%",
        alignItems: "center",
        padding: "0.5em",
        borderColor: "#8F9094",
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        justifyContent: "space-between",
      }}
      variant="outlined"
    >
      <Box
        component="nav"
        sx={{
          width: "33.33%",
        }}
      >
        <Stack
          className={classes.bttnStack}
          sx={{
            display: "flex",
            marginLeft: "4rem",
          }}
          direction="column"
        >
          <ButtonGroup variant="outlined" aria-label="alignment button group">
            <Button
              className={classes.button}
              component={RouterLink}
              to={"/marks"}
            >
              Marks
            </Button>
            {user === null ? null : (
              <Button
                className={classes.button}
                component={RouterLink}
                to={"/users"}
              >
                Users
              </Button>
            )}
            <Button className={classes.button} component={RouterLink} to={"/"}>
              Home
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>

      <Button>
        <Typography
          className={classes.h1}
          variant="h3"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          component="h1"
        >
          Marks
          <NewspaperIcon fontSize="inherit" />
        </Typography>
      </Button>

      {user === null ? (
        <Box
          className={classes.bttnStack}
          sx={{
            width: "33.33%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            className={classes.button}
            variant="outlined"
            color="success"
            component={RouterLink}
            to={"/login"}
          >
            Login
          </Button>
        </Box>
      ) : (
        <Box
          className={classes.bttnStack}
          sx={{
            width: "33.33%",
            display: "flex",

            justifyContent: "flex-end",
          }}
        >
          <Button
            sx={{
              marginRight: "1rem",
            }}
            size="small"
            className={classes.button}
            variant="outlined"
            color="success"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default Menu;
