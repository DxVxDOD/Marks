import { Button, Paper, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks.ts";
function Reel() {

    const tags = useAppSelector(state => state.mark).map(mark => mark.tag)

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 0,
        borderColor: "#8F9094",
      }}
      variant="outlined"
      className="container"
    >
      <div className="reel">
        {[...tags].map((tag) => (
          <Button key={tag}>
            <Typography>{tag}</Typography>
          </Button>
        ))}
      </div>
    </Paper>
  );
}

export default Reel;
