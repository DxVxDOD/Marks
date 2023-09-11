import Togglable, { VisibilityHandle } from "../Togglable.js";
import LoginForm from "./LoginForm.js";
import CreateUserForm from "../users/CreateUserForm.js";
import { useRef } from "react";
import { Box } from "@mui/material";

const NotLoggedIn = () => {
  const signUpRef = useRef<VisibilityHandle>();

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column'
    }} component='article'>
      <LoginForm />
      <Togglable buttonLabel="Sign up" ref={signUpRef}>
        <CreateUserForm signUpRef={signUpRef} />
      </Togglable>
    </Box>
  );
};

export default NotLoggedIn;
