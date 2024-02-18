import { Button, Paper, Typography } from "@mui/material";
import { useGetAllMarksQuery } from "../../redux/endpoints/marks";
import styles from "./reel.module.css";
import reel from "../../theme/Reel";

function Reel() {
  const { data: marks } = useGetAllMarksQuery();
  const { classes } = reel();

  if (marks) {
    return (
      <Paper
        sx={{
          border: "solid 1.5px rgba(168, 239, 255, 0.4)",
          maxWidth: "75%",
          borderRadius: 0,
        }}
        variant="outlined"
        className={styles.reel + " " + classes.tagWidth}
      >
        {[...marks].map((mark) => (
          <Button key={mark.id}>
            <Typography>{mark.tag}</Typography>
          </Button>
        ))}
      </Paper>
    );
  }

  return null;
}

export default Reel;
