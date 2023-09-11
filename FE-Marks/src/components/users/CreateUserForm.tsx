import { FormEvent } from "react";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch } from "../../app/hooks";
import { createUsers } from "../../reducers/userArrayReducer";
import { VisibilityHandle } from "../Togglable";
import { Box, Button, Paper, Stack, TextField } from "@mui/material";

const CreateUserForm = ({
  signUpRef,
}: {
  signUpRef: React.MutableRefObject<VisibilityHandle | undefined>;
}) => {
  const { reset: resetUsername, ...username } = useForm("text");
  const { reset: resetPassword, ...password } = useForm("password");
  const { reset: resetName, ...name } = useForm("text");

  const dispatch = useAppDispatch();

  const handleReset = () => {
    resetPassword();
    resetUsername();
    resetName();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    signUpRef.current?.toggleVisibility();

    dispatch(
      createUsers({
        username: username.value,
        name: name.value,
        password: password.value,
      }),
    );
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
            label="name"
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
