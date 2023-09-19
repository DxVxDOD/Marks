import Toggleable, { VisibilityHandle } from "../Togglable.js";
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
      <Toggleable buttonLabel="Sign up" ref={signUpRef}>
        <CreateUserForm signUpRef={signUpRef} />
      </Toggleable>
    </Box>
  );
};

export default NotLoggedIn;
