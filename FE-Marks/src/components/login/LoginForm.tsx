import { Button, Paper, Stack, TextField } from "@mui/material";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm.js";
import { useLoginMutation } from "../../redux/endpoints/login.js";
import useStyle from "../../theme/Style.js";

const LoginForm = () => {
  const { reset: usernameReset, ...username } = useForm("text");
  const { reset: passwordReset, ...password } = useForm("password");
  const navigate = useNavigate();
  const [login, {}] = useLoginMutation();
  const { classes } = useStyle();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

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

    navigate("/");
  };

  return (
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
      variant="outlined"
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
        className={classes.text}
        aria-label="login button"
        variant="outlined"
        size="small"
        id="login-button"
        type="submit"
      >
        Login
      </Button>
    </Paper>
  );
};

export default LoginForm;
