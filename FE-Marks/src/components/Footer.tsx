import { Button, Paper } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        marginTop: "auto",
      }}
      component="footer"
    >
      <Button
        aria-label="Twitter/X button"
        style={{ backgroundColor: "transparent" }}
        sx={{
          paddingY: "1rem",
        }}
      >
        <TwitterIcon />
      </Button>
      <Button
        aria-label="Github button"
        style={{ backgroundColor: "transparent" }}
        sx={{
          padding: "1rem",
        }}
      >
        <GitHubIcon />
      </Button>

      <Button
        aria-label="LinkedIn button"
        style={{ backgroundColor: "transparent" }}
        sx={{
          padding: "1rem",
        }}
      >
        <LinkedInIcon />
      </Button>
    </Paper>
  );
};

export default Footer;
