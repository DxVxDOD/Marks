import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useAddNewUserMutation } from "../../redux/endpoints/users.ts";
import { TNewUser } from "../../types/user.ts";
import useStyle from "../../theme/Style.tsx";

const CreateUserForm = () => {
  const { reset: resetUsername, ...username } = useForm("text");
  const { reset: resetPassword, ...password } = useForm("password");
  const { reset: resetName, ...name } = useForm("text");
  const { reset: resetEmail, ...email } = useForm("text");
  const navigate = useNavigate();
  const [addNewUser, {}] = useAddNewUserMutation();
  const { classes } = useStyle();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    navigate("/login");

    const newUserObj: TNewUser = {
      username: username.value,
      name: name.value,
      password: password.value,
      email: email.value,
    };

    toast.promise(addNewUser(newUserObj), {
      loading: "Loading...",
      success: <b>New user created successfully!</b>,
      error: <b>Could not create user.</b>,
    });
  };

  return (
    <Paper
      sx={{
        display: "flex",
        padding: "2rem",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
      component="form"
      onSubmit={handleSubmit}
      variant="outlined"
    >
      <Stack direction="column" spacing={2}>
        <TextField
          required
          size="small"
          label="Username"
          variant="outlined"
          placeholder="Username"
          {...username}
        ></TextField>
        <TextField
          size="small"
          required
          label="Name"
          placeholder="Name"
          variant="outlined"
          {...name}
        />
        <TextField
          size="small"
          required
          label="Password"
          variant="outlined"
          placeholder="Password"
          {...password}
        />
        <TextField
          size="small"
          required
          label="Email"
          placeholder="Email"
          variant="outlined"
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
          variant="outlined"
        >
          <Typography className={classes.text}>Sign up</Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default CreateUserForm;
