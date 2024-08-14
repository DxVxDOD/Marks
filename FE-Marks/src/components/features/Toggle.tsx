import { Box, Button } from "@mui/material";
import { useState, forwardRef, useImperativeHandle, ReactNode } from "react";
import useStyle from "../../theme/Style";

export type VisibilityHandle = {
  toggleVisibility: () => void;
};

const Toggle = forwardRef(
  (
    { buttonLabel, children }: { buttonLabel: string; children: ReactNode },
    refs,
  ) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    const toggleVisibility = () => setVisible(!visible);
    const { classes } = useStyle();

    useImperativeHandle(refs, () => {
      return {
        toggleVisibility,
      };
    });

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: "2rem",
        }}
        component="section"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          style={hideWhenVisible}
        >
          <Button
            className={classes.text}
            aria-label={`${buttonLabel} button`}
            variant="outlined"
            size="small"
            onClick={toggleVisibility}
          >
            {buttonLabel}
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          style={showWhenVisible}
        >
          {children}
          <Button
            className={classes.text}
            aria-label="cancel button"
            sx={{
              marginY: "1rem",
            }}
            variant="outlined"
            size="small"
            onClick={toggleVisibility}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    );
  },
);

Toggle.displayName = "Toggle";

export default Toggle;
