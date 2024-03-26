import { Route, Routes } from "react-router-dom";
import Mark from "./components/marks/Mark.tsx";
import Marks from "./components/marks/Marks.tsx";
import Menu from "./components/Menu.tsx";
import Home from "./components/Home.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import NotLoggedIn from "./components/login/NotLoggedIn.tsx";
import Footer from "./components/Footer.tsx";
import HomeNoUser from "./components/HomeNoUser.tsx";
import theme from "./theme/Theme.tsx";
import { useAuth } from "./hooks/useAuth.tsx";
import { useEffect } from "react";
import { setCredentials } from "./redux/slices/auth.ts";
import { useAppDispatch } from "./redux/hook.ts";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("logged_in_user");
    if (loggedUserJSON !== null) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(
        setCredentials({
          user: { username: loggedUser.username, name: loggedUser.name },
          token: loggedUser.token,
        }),
      );
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
            <Route path="/login" element={<NotLoggedIn />} />
            {user === null ? (
              <Route path="/" element={<HomeNoUser />} />
            ) : (
              <Route path="/" element={<Home user={user} />} />
            )}
            {user && <Route path="/marks" element={<Marks user={user} />} />}
            <Route path="/marks/:id" element={<Mark />} />
          </Routes>
        </main>
        <Footer />
      </>
    </ThemeProvider>
  );
};

export default App;
