import { Link as RouterLink } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { MarkT } from "../types/mark";
import { Box, Button, Icon, Paper, Typography } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import blogList from "../theme/BlogList";
import useHome from "../theme/Home";
import AccountPage from "./users/AccountPage";
import Togglable, { VisibilityHandle } from "./Togglable";
import { useRef } from "react";

const Home = () => {
  const user = useAppSelector((state) => state.user);
  const marks = useAppSelector((state) => state.mark);
  const { classes } = blogList();
  const button = useHome().classes;
  const accountRef = useRef<VisibilityHandle>();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
      }}
      component="article"
    >
      <Paper
        sx={{
          minWidth: "75%",
          padding: "2rem",
        }}
      >
        <Box
          sx={{
            gap: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
          component="section"
        >
          <Typography className={classes.h2} component="h2" variant="h5">
            <Paper
              sx={{
                display: "flex",
                padding: "1rem",
                justifyContent: "center",
              }}
            >
              <strong> {user.username} is logged in</strong>
            </Paper>
          </Typography>
          <Typography className={classes.h3} component="h3" variant="h6">
            My marks:
          </Typography>
        </Box>
        {[...marks]
          .sort((a: MarkT, b: MarkT) => b.likes! - a.likes!)
          .filter((mark: MarkT) => mark.user.username === user.username)
          .map((mark: MarkT) => (
            <Button
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
              key={mark.id}
              to={`/blog/${mark.id}`}
              component={RouterLink}
              state={mark}
            >
              <Icon
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ArticleIcon fontSize="small" />
              </Icon>
              <Typography className={button.bttnTxt}>
                {mark.title} by {mark.author}
              </Typography>
            </Button>
          ))}
      </Paper>
      <Togglable buttonLabel="Account settings" ref={accountRef}>
        <AccountPage />
      </Togglable>
    </Box>
  );
};

export default Home;
