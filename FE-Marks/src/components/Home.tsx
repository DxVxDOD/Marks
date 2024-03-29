import ArticleIcon from "@mui/icons-material/Article";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import markList from "../theme/MarkList.tsx";
import useHome from "../theme/Home";
import { TMark } from "../types/mark";
import Toggle, { VisibilityHandle } from "./features/Toggle.tsx";
import AccountPage from "./users/AccountPage";
import { useGetAllMarksQuery } from "../redux/endpoints/marks.ts";
import { TLoggedUser } from "../types/user.ts";

const Home = ({ user }: { user: TLoggedUser }) => {
  const { data: marks } = useGetAllMarksQuery();

  const { classes } = markList();
  const button = useHome().classes;
  const accountRef = useRef<VisibilityHandle>();

  if (marks) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          width: "100%",
        }}
        component="article"
      >
        <Paper
          sx={{
            minWidth: "75%",
            padding: "2rem",
            border: "solid 1.5px rgba(168, 239, 255, 0.4)",
            borderRadius: 0,
            background: "#121213",
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
                  border: "solid 1.5px rgba(168, 239, 255, 0.4)",
                  borderRadius: 0,
                }}
              >
                <strong> {user.username} is logged in</strong>
              </Paper>
            </Typography>
            <Typography className={classes.h3} component="h3" variant="h6">
              My marks:
            </Typography>
          </Box>
          <List>
            {[...marks]
              .filter((mark: TMark) => mark.user.username === user.username)
              .sort((a: TMark, b: TMark) => b.likes - a.likes)
              .map((mark: TMark) => (
                <ListItemButton
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                  key={mark.id}
                  to={`/marks/${mark.id}`}
                  component={RouterLink}
                  state={mark}
                >
                  <ListItemIcon
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <ArticleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText className={button.bttnTxt}>
                    {mark.title}
                  </ListItemText>
                </ListItemButton>
              ))}
          </List>
        </Paper>
        <Toggle buttonLabel="Account settings" ref={accountRef}>
          <AccountPage />
        </Toggle>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        width: "100%",
      }}
      component="section"
    >
      <Paper
        sx={{
          gap: "1rem",
          display: "flex",
          flexDirection: "column",
          minWidth: "75%",
          padding: "2rem",
          orderRadius: 0,
          background: "#121213",
        }}
        className="box"
        component="article"
      >
        <Paper
          sx={{
            display: "flex",
            padding: "1rem",
            justifyContent: "center",
            borderRadius: 0,
          }}
          className="box"
        >
          <Typography
            className={classes.h2 + " loading"}
            component="h2"
            variant="h5"
          >
            <strong> {user.username} is logged in</strong>
          </Typography>
        </Paper>
        <Typography
          className={classes.h3 + " loading"}
          component="h3"
          variant="h6"
        >
          Loading your marks...
        </Typography>
      </Paper>
      <Toggle buttonLabel="Account settings" ref={accountRef}>
        <AccountPage />
      </Toggle>
    </Box>
  );
};

export default Home;
