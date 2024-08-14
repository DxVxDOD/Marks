import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import { TUserToFE } from "../../../../BE_Marks/src/types/user.ts";
import { useGetAllMarksQuery } from "../../redux/endpoints/marks.ts";
import { useAppSelector } from "../../redux/hook.ts";
import useStyle from "../../theme/Style.tsx";
import { TMark } from "../../types/mark.js";
import Reel from "../features/Reel.tsx";

const LoggedInMarks = ({ user }: { user: TUserToFE }) => {
  const { data: marks } = useGetAllMarksQuery();

  const { classes } = useStyle();
  const tag = useAppSelector((state) => state.filterTag);

  if (marks) {
    return (
      <Box component="section" sx={{ width: "100%" }}>
        <Reel />
        {marks.length < 1 ? (
          <Typography component="h2" variant="h4">
            You haven't posted any marks yet :(
          </Typography>
        ) : (
          <Paper
            sx={{
              paddingX: "2rem",
              paddingY: "1rem",
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
              {user.username}s marks:
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
      </Box>
    );
  }

  return (
    <Paper
      sx={{
        padding: "2rem",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#121213",
      }}
      className="box"
      component="section"
    >
      <Typography className={" " + "loading"}>Loading your marks...</Typography>
    </Paper>
  );
};

export default LoggedInMarks;
