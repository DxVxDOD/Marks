import { FormEvent } from "react";
import { useForm } from "../../hooks/useForm.js";
import { Box, Button, Paper, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/endpoints/login.js";

const LoginForm = () => {
  const { reset: usernameReset, ...username } = useForm("text");
  const { reset: passwordReset, ...password } = useForm("password");
  const navigate = useNavigate();
  const [login, { }] = useLoginMutation();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    navigate("/");

    try {
      await login({
        username: username.value,
        password: password.value,
      });

      usernameReset();
      passwordReset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      component="section"
    >
      <Paper
        sx={{
          padding: "1.5em",
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          marginTop: "2rem",
          alignItems: "center",
        }}
        component="form"
        onSubmit={handleLogin}
      >
        <Stack direction="column" spacing={2}>
          <TextField
            size="small"
            required
            autoFocus
            color="success"
            variant="standard"
            label="Username"
            {...username}
          />
          <TextField
            size="small"
            required
            variant="standard"
            label="Password"
            color="success"
            {...password}
          />
        </Stack>
        <Button
          aria-label="login button"
          sx={{
            width: "fit-content",
          }}
          color="success"
          variant="outlined"
          size="small"
          id="login-button"
          type="submit"
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginForm;
