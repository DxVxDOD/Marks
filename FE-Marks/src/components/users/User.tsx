import { Link as RouterLink, useLocation } from "react-router-dom";
import { BlogT } from "../../types/blog";
import { Box, Button, Icon, Paper, Typography } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";

const User = () => {
  const { state } = useLocation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      component="article"
    >
      <Paper
        sx={{
          marginTop: "2rem",
          padding: "2rem",
          minWidth: "75%",
        }}
        component="section"
      >
        <Typography component="h2" variant="h5">
          {state.user.username}s blogs:
        </Typography>
        {state.blogs.length < 1 ? (
          <Typography component="h2" variant="h5">
            You haven't posted any blogs yet
          </Typography>
        ) : (
          state.blogs
            .sort((a: BlogT, b: BlogT) => b.likes! - a.likes!)
            .map((blog: BlogT) => (
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
                key={blog.id}
                component={RouterLink}
                to={`/blog/${blog.id}`}
                state={blog}
              >
                <Icon>
                  <ArticleIcon
                    sx={{
                      display: "flex",
                    }}
                  />
                </Icon>
                {blog.title}
              </Button>
            ))
        )}
      </Paper>
    </Box>
  );
};

export default User;
