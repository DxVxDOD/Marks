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
import { useAppSelector } from "../app/hooks";
import useHeader from "../theme/Header";

const Menu = () => {
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const user = useAppSelector((state) => state.user);

  const { classes } = useHeader();

  return (
    <Paper
      component="header"
      sx={{
        display: "flex",
        width: "100%",
        bgcolor: "#2E3033",
        alignItems: "center",
        padding: "0.5em",
      }}
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
              to={"/blogs"}
            >
              Blogs
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
      <Typography
        className={classes.h1}
        sx={{
          width: "33.33%",
          display: "flex",
          justifyContent: "center",
          color: "#BFC8D6",
          alignItems: "center",
        }}
        color="black"
        variant="h3"
        component="h1"
      >
        Blogs
        <NewspaperIcon fontSize="inherit" />
      </Typography>
      {user === null ? (
        <Box
          className={classes.bttnStack}
          sx={{
            width: "33.33%",
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "4rem",
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
            size="small"
            className={classes.button}
            variant="contained"
            color="error"
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
