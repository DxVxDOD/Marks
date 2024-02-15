import { FormEvent } from "react";
import { useForm } from "../../hooks/useForm";
import { VisibilityHandle } from "../features/Toggle.tsx";
import { Box, Button, Paper, Stack, TextField } from "@mui/material";

const CreateUserForm = ({
  signUpRef,
}: {
  signUpRef: React.MutableRefObject<VisibilityHandle | undefined>;
}) => {
  const { reset: resetUsername, ...username } = useForm("text");
  const { reset: resetPassword, ...password } = useForm("password");
  const { reset: resetName, ...name } = useForm("text");
  const { reset: resetEmail, ...email } = useForm("text");

  const handleReset = () => {
    resetPassword();
    resetUsername();
    resetName();
  };

  // TODO: Doesn't do anything, need to add mutation
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    signUpRef.current?.toggleVisibility();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          padding: "2rem",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
          minWidth: "50%",
          maxWidth: "94%",
          gap: "1rem",
        }}
        component="form"
        className="from-field"
        onSubmit={handleSubmit}
      >
        <Stack
          sx={{
            minWidth: "75%",
          }}
          direction="column"
          spacing={2}
        >
          <TextField
            required
            size="small"
            label="Username"
            variant="standard"
            placeholder="Username"
            {...username}
          />
          <TextField
            size="small"
            required
            label="Name"
            placeholder="Name"
            variant="standard"
            {...name}
          />
          <TextField
            size="small"
            required
            label="Password"
            variant="standard"
            placeholder="Password"
            {...password}
          />
          <TextField
            size="small"
            required
            label="Email"
            variant="standard"
            placeholder="Email"
            {...email}
          />
        </Stack>
        <Stack
          sx={{
            display: "flex",
            gap: "0.5rem",
            width: "fit-content",
          }}
        >
          <Button
            type="submit"
            aria-label="create user button"
            size="small"
            variant="outlined"
            color="success"
          >
            Create
          </Button>
          <Button
            aria-label="reset button"
            size="small"
            variant="outlined"
            color="error"
            type="button"
            onClick={handleReset}
          >
            Reset fields
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default CreateUserForm;
