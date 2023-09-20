import { useEffect } from "react";
import blogService from "./services/marks.ts";
import { useAppDispatch, useAppSelector } from "./app/hooks.ts";
import { initializeMarks } from "./reducers/markReducer.ts";
import { setUser } from "./reducers/userReducer.ts";
import { initializeUsers } from "./reducers/userArrayReducer.ts";
import { Route, Routes } from "react-router-dom";
import User from "./components/users/User.tsx";
import Blog from "./components/marks/Mark.tsx";
import NotLoggedInMarks from "./components/marks/NotLoggedInMarks.tsx";
import LoggedInMarks from "./components/marks/LoggedInMarks.tsx";
import Menu from "./components/Menu.tsx";
import UserInformation from "./components/users/UserInformation.tsx";
import Home from "./components/Home.tsx";
import { initializeComments } from "./reducers/commentReducer.ts";
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

const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeMarks());
    dispatch(initializeComments());
  }, []);

  useEffect(() => {
    const loggerUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggerUserJSON !== null) {
      const loggedUser = JSON.parse(loggerUserJSON);
      blogService.setToken(loggedUser.token);
      dispatch(initializeUsers());
      dispatch(setUser(loggedUser));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        <Menu />
        <main className="main">
          <Routes>
            <Route path="/login" element={<NotLoggedIn />} />
            <Route path="/users/:id" element={<User />} />
            {user === null ? (
              <Route path="/" element={<HomeNoUser />} />
            ) : (
              <Route path="/" element={<Home />} />
            )}

            <Route path="/users" element={<UserInformation />} />
            {user === null ? (
              <>
                <Route path="/marks" element={<NotLoggedInMarks />} />
              </>
            ) : (
              <Route path="/marks" element={<LoggedInMarks />} />
            )}
            <Route path="/marks/:id" element={<Blog />} />
          </Routes>
        </main>

        <Footer />
      </>
    </ThemeProvider>
  );
};

export default App;
