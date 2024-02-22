import {
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useGetAllMarksQuery } from "../../redux/endpoints/marks";
import styles from "./reel.module.css";
import reel from "../../theme/Reel";
import { useAuth } from "../../hooks/useAuth";
import { useAppDispatch } from "../../redux/hook";
import { setTag } from "../../redux/slices/filterTag";
import React, { useRef, useState } from "react";

function Reel() {
  const { data: marks, isFetching } = useGetAllMarksQuery();
  const { classes } = reel();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const textRef = useRef<HTMLSpanElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const [alignment, setAlignment] = useState<string>("all");

  const handleAlignment = (
    _e: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  if (marks && user) {
    if (
      marks.filter((mark) => mark.user.username === user.username).length > 0
    ) {
      return (
        <Paper
          ref={buttonContainerRef}
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
          <ToggleButtonGroup
            exclusive
            color="info"
            value={alignment}
            aria-label="tag button group"
            onChange={handleAlignment}
          >
            <ToggleButton onClick={() => dispatch(setTag("all"))} value="all">
              <Typography>All</Typography>
            </ToggleButton>
            {[...marks]
              .filter((mark) => mark.user.username === user.username)
              .map((mark) => mark.tag)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((tag) => (
                <ToggleButton
                  value={tag}
                  key={tag}
                  onClick={() => dispatch(setTag(tag))}
                >
                  <Typography
                    ref={textRef}
                    className={isFetching ? "fetching " : ""}
                  >
                    {tag}
                  </Typography>
                </ToggleButton>
              ))}
          </ToggleButtonGroup>
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

}

export default Reel;
