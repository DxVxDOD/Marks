import { Link as RouterLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks.js";
import ArticleIcon from "@mui/icons-material/Article";
import { Box, Button, Icon, Paper, Typography } from "@mui/material";
import blogList from "../../theme/BlogList.js";
import useHome from "../../theme/Home.js";

const NotLoggedInBlogs = () => {
  const blogs = useAppSelector((state) => state.blog);
  const { classes } = blogList();
  const button = useHome().classes;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem",
      }}
      component="article"
    >
      {blogs.length < 1 ? (
        <section>
          <Typography>There are no blogs posted yet...</Typography>
        </section>
      ) : (
        <Paper
          sx={{
            padding: "2rem",
            minWidth: "75%",
            maxWidth: "75%",
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
              marginLeft: "1rem",
            }}
          >
            {[...blogs]
              .sort((a, b) => b.likes! - a.likes!)
              .map((blog) => (
                <Button
                  aria-label="button to access blogs"
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                  className={classes.listItem}
                  key={blog.id}
                  component={RouterLink}
                  to={`/blog/${blog.id}`}
                  state={blog}
                >
                  <Icon
                    fontSize="small"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                    className={classes.icon}
                  >
                    <ArticleIcon fontSize="small" />
                  </Icon>
                  <Typography className={button.bttnTxt}>
                    {blog.title}
                  </Typography>
                </Button>
              ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default NotLoggedInBlogs;
