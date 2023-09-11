import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addUpdatedBlog,
  deleteBlog,
  initializeBlogs,
} from "../../reducers/blogReducer";
import { AxiosError } from "axios";
import {
  dispalyError,
  dispalySuccess,
} from "../../reducers/notificationReducer";
import { useLocation } from "react-router-dom";
import Comments from "../Comments";
import {
  Box,
  Button,
  ButtonGroup,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import useBlog from "../../theme/Blog";
import { useEffect } from "react";

const Blog = () => {
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const blogs = useAppSelector((state) => state.blog);
  const { classes } = useBlog();
  const blog = blogs.filter((blog) => blog.id === state.id)[0];

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const updateLikes = async () => {
    try {
      dispatch(addUpdatedBlog(blog));
    } catch (exception: unknown) {
      if (exception instanceof AxiosError && exception.response) {
        dispatch(dispalyError(exception.response.data.error, 5000));
      }
    }
  };

  const removeBlog = async () => {
    if (blog && window.confirm(`Would you like to remove ${blog.title} ?`)) {
      try {
        dispatch(deleteBlog(blog.id!));
        dispatch(dispalySuccess(`${blog.title} has been removed`, 5000));
      } catch (exception: unknown) {
        if (exception instanceof AxiosError && exception.response) {
          dispatch(dispalyError(exception.response.data.error, 5000));
        }
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
      component="article"
    >
      <Paper
        sx={{
          width: "75%",
          gap: "1rem",
          padding: "2rem",
          margin: "2rem",
          display: "flex",
          flexDirection: "column",
        }}
        component="section"
      >
        <Box component="section">
          <Typography className={classes.title} component="h2" variant="h5">
            Title: {blog.title}
          </Typography>
          <Typography className={classes.author} component="h3" variant="h5">
            Author: {blog.author}
          </Typography>
        </Box>
        <Link href={blog.url}>
          <Typography className={classes.otherTxt}>
            \\ {blog.title} \\
          </Typography>
        </Link>
        <Typography className={classes.otherTxt} component="p">
          {blog.user.username}
        </Typography>
        {user === null ? (
          <Typography className={classes.otherTxt} component="p" id="likes">
            Likes: {blog.likes}
          </Typography>
        ) : (
          <>
            <Typography className={classes.otherTxt}>
              Likes: {blog.likes}
            </Typography>

            <ButtonGroup aria-label="alignment button group" size="small">
              <Button
                className={classes.button}
                startIcon={<ThumbUpOutlinedIcon />}
                aria-label="like button"
                onClick={updateLikes}
                id="likeButton"
              >
                Like
              </Button>
              <Button
                className={classes.button}
                aria-label="delete button"
                startIcon={<DeleteOutlinedIcon />}
                onClick={removeBlog}
              >
                Remove
              </Button>
            </ButtonGroup>
          </>
        )}
      </Paper>
      <Comments blogId={`${blog.id}`} />
    </Box>
  );
};

export default Blog;
