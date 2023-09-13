import { useEffect } from "react";
import blogService from "./services/marks.ts";
import Notification from "./components/Notifications.tsx";
import { useAppDispatch, useAppSelector } from "./app/hooks.ts";
import { initializeMarks } from "./reducers/markReducer.ts";
import { setUser } from "./reducers/userReducer.ts";
import { initializeUsers } from "./reducers/userArrayReducer.ts";
import { Route, Routes } from "react-router-dom";
import User from "./components/users/User.tsx";
import Blog from "./components/blogs/Mark.tsx";
import NotLoggedInBlogs from "./components/blogs/NotLoggedInMarks.tsx";
import LoggedInBlogs from "./components/blogs/LoggedInMarks.tsx";
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
    const loggesUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggesUserJSON !== null) {
      const loggedUser = JSON.parse(loggesUserJSON);
      blogService.setToken(loggedUser.token);
      dispatch(initializeUsers());
      dispatch(setUser(loggedUser));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        <Notification />
        <Menu />
        <main className="main">
          <div className="svgBg">
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
                  <Route path="/blogs" element={<NotLoggedInBlogs />} />
                </>
              ) : (
                <Route path="/blogs" element={<LoggedInBlogs />} />
              )}
              <Route path="/blog/:id" element={<Blog />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </>
    </ThemeProvider>
  );
};

export default App;
