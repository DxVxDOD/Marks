import { Button, Paper, Typography } from "@mui/material";
import { useGetAllMarksQuery } from "../../redux/endpoints/marks";
import styles from "./reel.module.css";
import reel from "../../theme/Reel";
import { useAuth } from "../../hooks/useAuth";

function Reel() {
  const { data: marks, isFetching } = useGetAllMarksQuery();
  const { classes } = reel();
  const { user } = useAuth();

  if (marks && user) {
    if (
      marks.filter((mark) => mark.user.username === user.username).length > 0
    ) {
      return (
        <Paper
          sx={{
            border: "solid 1.5px rgba(168, 239, 255, 0.4)",
            width: "75%",
            borderRadius: 0,
            background: "#121213",
          }}
          className={
            isFetching ? "box " : "" + styles.reel + " " + classes.tagWidth
          }
        >
          {[...marks]
            .filter((mark) => mark.user.username === user.username)
            .map((mark) => (
              <Button key={mark.id}>
                <Typography className={isFetching ? "fetching " : ""}>
                  {mark.tag}
                </Typography>
              </Button>
            ))}
        </Paper>
      );
    }
    return (
      <Paper
        sx={{
          border: "solid 1.5px rgba(168, 239, 255, 0.4)",
          maxWidth: "75%",
          minWidth: "50%",
          borderRadius: 0,
          background: "#121213",
        }}
        className={styles.reel + " " + classes.tagWidth}
      >
        <Typography className="loading">Loading tags...</Typography>
      </Paper>
    );
  }

  return null;
}

export default Reel;
