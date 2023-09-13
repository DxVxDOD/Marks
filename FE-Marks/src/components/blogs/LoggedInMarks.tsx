import { Link as RouterLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks.js";
import { MarkT } from "../../types/mark.js";
import { useRef } from "react";
import MarkForm from "./MarksForm.js";
import Togglable, { VisibilityHandle } from "../Togglable.js";
import { Box, Button, Icon, Paper, Typography } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import blogList from "../../theme/BlogList.js";
import useHome from "../../theme/Home.js";

const LoggedInMarks = () => {
  const marks = useAppSelector((state) => state.mark);
  const user = useAppSelector((state) => state.user);

  const markFormRef = useRef<VisibilityHandle>();
  const { classes } = blogList();
  const button = useHome().classes;

  return (
    <>
      <Box
        component="section"
        sx={{
          marginTop: "2rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        {marks.length < 1 ? (
          <Typography component="h2" variant="h4">
            You haven't posted any marks yet
          </Typography>
        ) : (
          <Paper
            sx={{
              padding: "1rem",
              width: "75%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography className={classes.h2} variant="h5" component="h2">
              {user.username}s marks
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
              component="nav"
            >
              {[...marks]
                .sort((a: MarkT, b: MarkT) => b.likes! - a.likes!)
                .filter((mark: MarkT) => mark.user.username === user.username)
                .map((mark: MarkT) => (
                  <Button
                    aria-label="button to access marks"
                    sx={{
                      marginLeft: "2rem",
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                    key={mark.id}
                    component={RouterLink}
                    to={`/blog/${mark.id}`}
                    state={mark}
                  >
                    <Icon className={classes.icon}>
                      <ArticleIcon
                        sx={{
                          display: "flex",
                        }}
                        fontSize="small"
                      />
                    </Icon>
                    <Typography className={button.bttnTxt}>
                      {mark.title}
                    </Typography>
                  </Button>
                ))}
            </Box>
          </Paper>
        )}
        <Paper
          sx={{
            display: "flex",
            padding: "1rem",
            width: "75%",
            flexDirection: "column",
          }}
        >
          <Typography className={classes.h2} variant="h5" component="h2">
            Other marks
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            component="nav"
          >
            {[...marks]
              .sort((a: MarkT, b: MarkT) => b.likes! - a.likes!)
              .filter((mark: MarkT) => mark.user.username !== user.username)
              .map((mark: MarkT) => (
                <Button
                  aria-label="button to access marks"
                  sx={{
                    marginLeft: "2rem",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                  key={mark.id}
                  component={RouterLink}
                  to={`/blog/${mark.id}`}
                  state={mark}
                >
                  <Icon className={classes.icon}>
                    <ArticleIcon
                      sx={{
                        display: "flex",
                      }}
                      fontSize="small"
                    />
                  </Icon>
                  <Typography className={button.bttnTxt}>
                    {mark.title}
                  </Typography>
                </Button>
              ))}
          </Box>
        </Paper>
      </Box>
      <Togglable buttonLabel="New mark" ref={markFormRef}>
        <MarkForm markFormRef={markFormRef} />
      </Togglable>
    </>
  );
};

export default LoggedInMarks;
