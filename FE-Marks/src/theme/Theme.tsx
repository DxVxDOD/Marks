import { createTheme } from "@mui/material";
import { amber, grey, red, teal } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#171717",
      paper: "#121213",
    },
    primary: {
      main: "#8F9094",
    },
    text: {
      primary: grey[300],
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
    info: {
      main: "rgba(168, 239, 255, 0.8)",
    },
  },
  typography: {
    fontFamily: "monospace",
  },
});

export default theme;
