import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import useHeader from "../theme/Header";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Menu = () => {
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const [alignment, setAlignment] = useState<string>("first");

  const { user } = useAuth();

  const { classes } = useHeader();

  function handleAlignmen(
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) {
    setAlignment(newAlignment);
  }

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
      <Button to={"/"} component={RouterLink}>
        <Typography
          className={classes.h1}
          variant="h4"
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
          component={"nav"}
          className={classes.bttnStack}
          sx={{
            width: "33.33%",
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
          }}
        >
          <ToggleButtonGroup
            value={alignment}
            onChange={handleAlignmen}
            exclusive
            aria-label="button group alignment"
          >
            <ToggleButton
              component={RouterLink}
              to={"/"}
              value={"first"}
              aria-label="first buttton"
            >
              Home
            </ToggleButton>
            <ToggleButton
              value={"second"}
              aria-label="second buttton"
              className={classes.button}
              component={RouterLink}
              to={"/marks"}
            >
              Marks
            </ToggleButton>
            <ToggleButton
              value={"third"}
              aria-label="third button"
              className={classes.button}
              component={RouterLink}
              to={"/account"}
            >
              Account
            </ToggleButton>
          </ToggleButtonGroup>
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
