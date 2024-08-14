import React, { FormEvent } from "react";
import { VisibilityHandle } from "../features/Toggle.tsx";
import { useForm } from "../../hooks/useForm";
import { Box, Button, Paper, Stack, TextField } from "@mui/material";
import { useAddNewMarkMutation } from "../../redux/endpoints/marks.ts";
import useStyle from "../../theme/Style.tsx";

const MarkForm = ({
  markFormRef: markFormRef,
}: {
  markFormRef: React.MutableRefObject<VisibilityHandle | undefined>;
}) => {
  const { reset: resetTag, ...tag } = useForm("text");
  const { reset: resetTitle, ...title } = useForm("text");
  const { reset: resetUrl, ...url } = useForm("text");

  const [postMark, { isLoading }] = useAddNewMarkMutation();
  const { classes } = useStyle();

  const handleNewMark = async (e: FormEvent) => {
    e.preventDefault();

    markFormRef.current?.toggleVisibility();

    const markObject = {
      title: title.value,
      tag: tag.value,
      url: url.value,
    };

    postMark(markObject);

    resetTag();
    resetTitle();
    resetUrl();
  };

  return (
    <Paper
      sx={{
        padding: "2em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 0,
        width: "100%",
        gap: "1rem",
      }}
      component="form"
      onSubmit={handleNewMark}
      variant="outlined"
    >
      <Stack direction="column" spacing={2}>
        <TextField
          required
          size="small"
          label="Title"
          variant="outlined"
          placeholder="Title"
          {...title}
        />
        <TextField
          required
          size="small"
          label="Url"
          variant="outlined"
          placeholder="Url"
          {...url}
        />
        <TextField
          required
          size="small"
          label="Tag"
          variant="outlined"
          placeholder="Tag"
          {...tag}
        />
      </Stack>
      <Button
        aria-label="submit button"
        sx={{
          width: "fit-content",
        }}
        type="submit"
        variant="outlined"
        size="small"
        className={classes.text}
      >
        Add mark
      </Button>
    </Paper>
  );
};

export default MarkForm;
