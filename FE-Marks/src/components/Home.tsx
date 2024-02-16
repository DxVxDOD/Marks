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
import blogList from "../theme/BlogList";
import useHome from "../theme/Home";
import { TMark } from "../types/mark";
import Toggle, { VisibilityHandle } from "./features/Toggle.tsx";
import AccountPage from "./users/AccountPage";
import { useGetAllMarksQuery } from "../redux/endpoints/marks.ts";
import { TLoggedUser } from "../types/user.ts";

const Home = ({ user }: { user: TLoggedUser }) => {
  const { data: marks } = useGetAllMarksQuery();

  // const marks = useAppSelector((state) => {
  //   if (!Array.isArray(state.mark)) {
  //     let array = new Array();
  //     return [...array, state.mark];
  //   }
  //   return state.mark;
  // });

  const { classes } = blogList();
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
        }}
        component="article"
      >
        <Paper
          sx={{
            minWidth: "75%",
            padding: "2rem",
            border: "solid 0.05rem #6E6E6E",
            borderRadius: 0,
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
                  border: "solid 0.02rem #6E6E6E",
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
              .sort((a: TMark, b: TMark) => b.likes - a.likes)
              .filter((mark: TMark) => mark.user.username === user.username)
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
};

export default Home;
