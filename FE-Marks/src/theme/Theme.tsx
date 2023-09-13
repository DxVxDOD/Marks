import { createTheme } from "@mui/material";
import { amber, blueGrey, grey, red, teal } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1F2022",
      paper: grey[900],
    },
    primary: {
      main: blueGrey.A400,
    },
    text: {
      primary: blueGrey.A400,
    },
    success: {
      main: teal.A700,
    },
    error: {
      main: red.A400,
    },
    secondary: {
      main: amber.A700,
    },
  },
  typography: {
    fontFamily: "monospace",
  },
});

export default theme;
