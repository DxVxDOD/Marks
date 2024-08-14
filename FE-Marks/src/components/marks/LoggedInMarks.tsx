import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Fragment, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { TUserToFE } from "../../../../BE_Marks/src/types/user.ts";
import { useGetAllMarksQuery } from "../../redux/endpoints/marks.ts";
import { useAppSelector } from "../../redux/hook.ts";
import useStyle from "../../theme/Style.tsx";
import { TMark } from "../../types/mark.js";
import Reel from "../features/Reel.tsx";
import Toggle, { VisibilityHandle } from "../features/Toggle.tsx";
import MarkForm from "./MarksForm.js";
import styles from "./styles/marks.module.css";

const LoggedInMarks = ({ user }: { user: TUserToFE }) => {
  const { data: marks, isFetching } = useGetAllMarksQuery();

  const markFormRef = useRef<VisibilityHandle>();
  const { classes } = useStyle();
  const tag = useAppSelector((state) => state.filterTag);

  if (marks) {
    return (
      <section className={styles.section}>
        <Reel />
        {marks.length < 1 ? (
          <Typography component="h2" variant="h4">
            You haven't posted any marks yet :(
          </Typography>
        ) : (
          <Paper
            sx={{
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              borderRadius: 0,
            }}
            variant="outlined"
            className={classes.paper}
          >
            <Typography
              className={classes.list_heading}
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
                    <Fragment key={mark.id}>
                      <ListItemButton
                        aria-label="button to access marks"
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                        component={RouterLink}
                        to={`/marks/${mark.id}`}
                        state={mark}
                        key={mark.id}
                      >
                        <ListItemText key={mark.id}>
                          <Typography
                            key={mark.id}
                            className={classes.list_text}
                          >
                            {mark.title}
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                      <Divider key={mark.url} variant="middle" />
                    </Fragment>
                  ))}
              </List>
            </Box>
          </Paper>
        )}
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
          borderRadius: -1,
          minWidth: "75%",
          background: "#121213",
        }}
        className="box"
      >
        <Typography className={" " + "loading"} variant="h5" component="h2">
          Loading marks...
        </Typography>
      </Paper>
    </section>
  );
};

export default LoggedInMarks;
