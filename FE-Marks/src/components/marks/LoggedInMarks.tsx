import { Link as RouterLink } from "react-router-dom";
import { TMark } from "../../types/mark.js";
import { useRef } from "react";
import MarkForm from "./MarksForm.js";
import Toggle, { VisibilityHandle } from "../features/Toggle.tsx";
import {
  Box,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import markList from "../../theme/MarkList.js";
import useHome from "../../theme/Home.js";
import Reel from "../features/Reel.tsx";
import { useGetAllMarksQuery } from "../../redux/endpoints/marks.ts";
import { TLoggedUser } from "../../types/user.ts";
import styles from "./styles/marks.module.css";
import { useAppSelector } from "../../redux/hook.ts";

const LoggedInMarks = ({ user }: { user: TLoggedUser }) => {
  const { data: marks, isFetching } = useGetAllMarksQuery();

  const markFormRef = useRef<VisibilityHandle>();
  const { classes } = markList();
  const button = useHome().classes;
  const tag = useAppSelector((state) => state.filterTag);

  if (marks) {
    return (
      <section className={styles.section}>
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
              minWidth: "75%",
              border: "1.5px solid rgba(168, 239, 255, 0.4)",
              background: "#121213",
            }}
          >
            <Typography
              className={isFetching ? " fetching" : "" + classes.h2}
              variant="h5"
              component="h2"
            >
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
                  .filter((mark: TMark) => mark.user.username === user.username)
                  .filter((mark) => {
                    if (tag === "all") {
                      return mark;
                    }

                    return tag === mark.tag;
                  })
                  .sort((a: TMark, b: TMark) => b.likes - a.likes)
                  .map((mark: TMark) => (
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
                      <ListItemText
                        className={
                          isFetching ? " fetching" : "" + button.bttnTxt
                        }
                      >
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
            border: "solid 1.5px rgba(168, 239, 255, 0.4)",
            background: "#121213",
            minWidth: "75%",
          }}
        >
          <Typography
            className={isFetching ? " fetching" : "" + classes.h2}
            variant="h5"
            component="h2"
          >
            Other marks
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
                .filter((mark: TMark) => mark.user.username !== user.username)
                .filter((mark) => {
                  if (tag === "all") {
                    return mark;
                  }

                  return tag === mark.tag;
                })
                .sort((a: TMark, b: TMark) => b.likes - a.likes)
                .map((mark: TMark) => (
                  <ListItemButton
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
                    <Typography
                      className={isFetching ? " fetching" : "" + button.bttnTxt}
                    >
                      {mark.title}
                    </Typography>
                  </ListItemButton>
                ))}
            </List>
          </Box>
        </Paper>
        <Toggle buttonLabel="New mark" ref={markFormRef}>
          <MarkForm markFormRef={markFormRef} />
        </Toggle>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <Paper
        sx={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          borderRadius: 0,
          minWidth: "75%",
          background: "#121213",
        }}
        className="box"
      >
        <Typography
          className={classes.h2 + " " + "loading"}
          variant="h5"
          component="h2"
        >
          Loading marks...
        </Typography>
      </Paper>
      <Paper
        sx={{
          display: "flex",
          padding: "1rem",
          flexDirection: "column",
          minWidth: "75%",
          borderRadius: 0,
          background: "#121213",
        }}
        className="box"
      >
        <Typography
          className={classes.h2 + " " + "loading"}
          variant="h5"
          component="h2"
        >
          Loading others' marks...
        </Typography>
      </Paper>
    </section>
  );
};

export default LoggedInMarks;
