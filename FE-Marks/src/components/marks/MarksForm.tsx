import React, { FormEvent } from "react";
import { VisibilityHandle } from "../features/Toggle.tsx";
import { useAppDispatch } from "../../app/hooks";
import { createMark, initializeMarks } from "../../reducers/markReducer";
import { AxiosError } from "axios";
import { displayError } from "../../reducers/notificationReducer";
import { useForm } from "../../hooks/useForm";
import { Box, Button, Paper, Stack, TextField } from "@mui/material";

const MarkForm = ({
  markFormRef: markFormRef,
}: {
  markFormRef: React.MutableRefObject<VisibilityHandle | undefined>;
}) => {
  const { reset: resetTag, ...tag } = useForm("text");
  const { reset: resetTitle, ...title } = useForm("text");
  const { reset: resetUrl, ...url } = useForm("text");

  const dispatch = useAppDispatch();

  const handleNewMark = async (e: FormEvent) => {
    e.preventDefault();

    markFormRef.current?.toggleVisibility();

    const markObject = {
      title: title.value,
      tag: tag.value,
      url: url.value,
    };

    try {
      dispatch(createMark(markObject));
      dispatch(initializeMarks());
      resetTag();
      resetTitle();
      resetUrl();
    } catch (exception: unknown) {
      if (exception instanceof AxiosError && exception.response) {
        dispatch(displayError(exception.response.data.error, 5000));
      }
    }
  };

  return (
    <Paper
      sx={{
        padding: "2em",
        minWidth: "75%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        border: "solid 0.02rem #6E6E6E",
        borderRadius: 0,
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
        onSubmit={handleNewMark}
      >
        <Stack
          sx={{
            width: "100%",
          }}
          direction="column"
          spacing={2}
        >
          <TextField
            color="success"
            required
            size="small"
            label="Title"
            variant="standard"
            placeholder="Title"
            {...title}
          />
          <TextField
            required
            color="success"
            size="small"
            label="Url"
            variant="standard"
            placeholder="Url"
            {...url}
          />
          <TextField
            required
            size="small"
            label="Tag"
            variant="standard"
            placeholder="Tag"
            color="success"
            {...tag}
          />
        </Stack>
        <Button
          aria-label="submit button"
          sx={{
            width: "fit-content",
          }}
          type="submit"
          color="success"
          variant="outlined"
          size="small"
        >
          Add mark
        </Button>
      </Box>
    </Paper>
  );
};

export default MarkForm;
