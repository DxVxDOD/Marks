import { Button, Paper, Typography } from "@mui/material";
import { useGetAllMarksQuery } from "../../redux/endpoints/marks";
function Reel() {
  const { data: marks } = useGetAllMarksQuery();

  if (marks) {
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
          {[...marks].map((mark) => (
            <Button key={mark.id}>
              <Typography>{mark.tag}</Typography>
            </Button>
          ))}
        </div>
      </Paper>
    );
  }

  return null;
}

export default Reel;
