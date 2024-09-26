import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { TUserToFE } from "../../BE_Marks/src/types/user.ts";
import Footer from "./components/Footer.tsx";
import Home from "./components/Home.tsx";
import HomeNoUser from "./components/HomeNoUser.tsx";
import Menu from "./components/Menu.tsx";
import LoginForm from "./components/login/LoginForm.tsx";
import LoggedInMarks from "./components/marks/LoggedInMarks.tsx";
import Mark from "./components/marks/Mark.tsx";
import { useAuth } from "./hooks/useAuth.tsx";
import "./index.css";
import { useAppDispatch } from "./redux/hook.ts";
import { setCredentials } from "./redux/slices/auth.ts";
import theme from "./theme/Theme.tsx";
import CreateUserForm from "./components/users/CreateUserForm.tsx";
import MarkForm from "./components/marks/MarksForm.tsx";

const App = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("logged_in_user");
    if (loggedUserJSON !== null) {
      const loggedUser: TUserToFE = JSON.parse(loggedUserJSON);
      dispatch(setCredentials({ user: loggedUser }));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        <Toaster position="top-center" reverseOrder={false} />
        <Menu />
        <main className="main">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            {user === null ? (
              <>
                <Route path="/" element={<HomeNoUser />} />
              </>
            ) : (
              <>
                <Route path="/" element={<LoggedInMarks user={user} />} />
              </>
            )}
            <Route path="/marks/:id" element={<Mark />} />
            <Route path="/sign-up" element={<CreateUserForm />} />
            <Route path="/mark-form" element={<MarkForm />} />
          </Routes>
        </main>
        <Footer />
      </>
    </ThemeProvider>
  );
};

export default App;
