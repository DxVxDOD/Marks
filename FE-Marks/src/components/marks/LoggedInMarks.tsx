import { Link as RouterLink } from "react-router-dom";
import { TMark } from "../../types/mark.js";
import { useRef } from "react";
import MarkForm from "./MarksForm.js";
import Toggle, { VisibilityHandle } from "../features/Toggle.tsx";
import {
  Box,
  Button,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import blogList from "../../theme/BlogList.js";
import useHome from "../../theme/Home.js";
import "../../styles/marks.css";
import Reel from "../features/Reel.tsx";
import { useGetAllMarksQuery } from "../../redux/endpoints/marks.ts";
import { TLoggedUser } from "../../types/user.ts";

const LoggedInMarks = ({ user }: { user: TLoggedUser }) => {
  const { data: marks, isFetching, isLoading } = useGetAllMarksQuery();

  const markFormRef = useRef<VisibilityHandle>();
  const { classes } = blogList();
  const button = useHome().classes;

  if (marks) {
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
                  .filter((mark: TMark) => mark.user.username === user.username)
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
              .filter((mark: TMark) => mark.user.username !== user.username)
              .sort((a: TMark, b: TMark) => b.likes - a.likes)
              .map((mark: TMark) => (
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
                  <Typography className={button.bttnTxt}>
                    {mark.title}
                  </Typography>
                </Button>
              ))}
          </Box>
        </Paper>
        <Toggle buttonLabel="New mark" ref={markFormRef}>
          <MarkForm markFormRef={markFormRef} />
        </Toggle>
      </section>
    );
  }
  return null;
};

export default LoggedInMarks;
