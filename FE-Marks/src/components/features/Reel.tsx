import { Button, Paper, Typography } from "@mui/material";
import { useGetAllMarksQuery } from "../../redux/endpoints/marks";
function Reel() {
  const { data: marks } = useGetAllMarksQuery();

  if (marks) {
    const tags = marks.map((mark) => mark.tag);

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

  return null;
}

export default Reel;
