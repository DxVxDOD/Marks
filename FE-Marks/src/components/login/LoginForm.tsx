import { FormEvent } from "react";
import loginService from "../../services/login.js";
import blogService from "../../services/blog.js";
import { AxiosError } from "axios";
import { useAppDispatch } from "../../app/hooks.js";
import { dispalyError } from "../../reducers/notificationReducer.js";
import { setUser } from "../../reducers/userReducer.js";
import { useForm } from "../../hooks/useForm.js";
import { Box, Button, Paper, Stack, TextField } from "@mui/material";

const LoginForm = () => {
  const { reset: usernameReset, ...username } = useForm("text");
  const { reset: passwordReset, ...password } = useForm("password");

  const dispatch = useAppDispatch();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      usernameReset();
      passwordReset();
    } catch (exception: unknown) {
      if (exception instanceof AxiosError && exception.response) {
        dispatch(dispalyError(exception.response.data.error, 5000));
      }
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
