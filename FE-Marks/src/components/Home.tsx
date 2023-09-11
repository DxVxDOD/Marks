import { Link as RouterLink } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { BlogT } from "../types/blog";
import { Box, Button, Icon, Paper, Typography } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import blogList from "../theme/BlogList";

const Home = () => {
  const user = useAppSelector((state) => state.user);
  const blogs = useAppSelector((state) => state.blog);
  const { classes } = blogList();

  return (
    <Box
      sx={{
        marginTop: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          minWidth: "75%",
          padding: "2rem",
        }}
      >
        {user === null ? (
          <Typography>Proper home page</Typography>
        ) : (
          <>
            <Box
              sx={{
                gap: "1rem",
                display: "flex",
                flexDirection: "column",
              }}
              component="article"
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
                My blogs:
              </Typography>
            </Box>
            {[...blogs]
              .sort((a: BlogT, b: BlogT) => b.likes! - a.likes!)
              .filter((blog: BlogT) => blog.user.username === user.username)
              .map((blog: BlogT) => (
                <Button
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                  key={blog.id}
                  to={`/blog/${blog.id}`}
                  component={RouterLink}
                  state={blog}
                >
                  <Icon
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <ArticleIcon fontSize="small" />
                  </Icon>
                  <Typography className={classes.otherTxt}>
                    {blog.title} by {blog.author}
                  </Typography>
                </Button>
              ))}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Home;
