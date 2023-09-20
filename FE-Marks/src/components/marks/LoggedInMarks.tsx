import { Link as RouterLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks.js";
import { MarkT } from "../../types/mark.js";
import { useRef } from "react";
import MarkForm from "./MarksForm.js";
import Toggleable, { VisibilityHandle } from "../Togglable.js";
import {Box, Button, Icon, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import blogList from "../../theme/BlogList.js";
import useHome from "../../theme/Home.js";
import "../../styles/marks.css";
import Reel from "../Reel.tsx";

const LoggedInMarks = () => {
  const marks = useAppSelector((state) => state.mark);
  const user = useAppSelector((state) => state.user);

  const markFormRef = useRef<VisibilityHandle>();
  const { classes } = blogList();
  const button = useHome().classes;

  return (
    <section className="logged-in-marks">
      <Reel />
      {marks.length < 1 ? (
        <Typography component="h2" variant="h4">
          You haven't posted any marks yet
        </Typography>
      ) : (
        <Paper
          sx={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            borderRadius: 0,
            borderColor: "#8F9094",
          }}
          variant="outlined"
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
            <List>
              {[...marks]
                .sort((a: MarkT, b: MarkT) => b.likes! - a.likes!)
                .filter((mark: MarkT) => mark.user.username === user.username)
                .map((mark: MarkT) => (
                  <ListItemButton
                    aria-label="button to access marks"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                    key={mark.id}
                    component={RouterLink}
                    to={`/marks/${mark.id}`}
                    state={mark}
                  >
                    <ListItemIcon className={classes.icon}>
                      <ArticleIcon
                        sx={{
                          display: "flex",
                        }}
                        fontSize="small"
                      />
                    </ListItemIcon>
                    <ListItemText className={button.bttnTxt}>
                      {mark.title}
                    </ListItemText>
                  </ListItemButton>
                ))}
            </List>
          </Box>
        </Paper>
      )}
      <Paper
        sx={{
          display: "flex",
          padding: "1rem",
          flexDirection: "column",
          borderRadius: 0,
          borderColor: "#8F9094",
        }}
        variant="outlined"
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
                to={`/marks/${mark.id}`}
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
                <Typography className={button.bttnTxt}>{mark.title}</Typography>
              </Button>
            ))}
        </Box>
      </Paper>
      <Toggleable buttonLabel="New mark" ref={markFormRef}>
        <MarkForm markFormRef={markFormRef} />
      </Toggleable>
    </section>
  );
};

export default LoggedInMarks;
