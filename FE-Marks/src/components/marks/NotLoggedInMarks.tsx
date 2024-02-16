import { Link as RouterLink } from "react-router-dom";
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
import markList from "../../theme/MarkList.js";
import useHome from "../../theme/Home.js";
import { useGetAllMarksQuery } from "../../redux/endpoints/marks.js";

const NotLoggedInMarks = () => {
  const { data: marks } = useGetAllMarksQuery();
  const { classes } = markList();
  const button = useHome().classes;

  if (marks) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
        component="article"
      >
        {marks.length < 1 ? (
          <section>
            <Typography>There are no blogs posted yet...</Typography>
          </section>
        ) : (
          <Paper
            sx={{
              padding: "2rem",
              display: "flex",
              gap: "1rem",
              flexDirection: "column",
            }}
            component="section"
          >
            <Typography className={classes.h2} component="h3" variant="h5">
              Featured blogs
            </Typography>
            <Box
              component="nav"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: {
                  xs: "1rem",
                },
              }}
            >
              <List>
                {[...marks]
                  .sort((a, b) => b.likes - a.likes)
                  .map((mark) => (
                    <ListItemButton
                      aria-label="button to access blogs"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                      className={classes.listItem}
                      key={mark.id}
                      component={RouterLink}
                      to={`/marks/${mark.id}`}
                      state={mark}
                    >
                      <ListItemIcon
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                        className={classes.icon}
                      >
                        <ArticleIcon fontSize="small" />
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
      </Box>
    );
  }
};

export default NotLoggedInMarks;
