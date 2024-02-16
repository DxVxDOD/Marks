import { Button, Paper, Typography } from "@mui/material";
import { useGetAllMarksQuery } from "../../redux/endpoints/marks";
import { useRef } from "react";
function Reel() {
  const { data: marks } = useGetAllMarksQuery();

  if (marks) {
    const reelRef = useRef<HTMLDivElement>(null);

    function onDrag(e: MouseEvent) {
      let pointerFrom = 0;
      let elementFrom = 0;

      const scrollable = reelRef.current;
    }

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
        <div ref={reelRef} className="reel">
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
