import { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useForm } from "../hooks/useForm";
import { createComment } from "../reducers/commentReducer";
import { AxiosError } from "axios";
import { dispalyError } from "../reducers/notificationReducer";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import {
  Box,
  Button,
  FormControl,
  List,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import useBlog from "../theme/Blog";

const Comments = ({ blogId }: { blogId: string }) => {
  const comments = useAppSelector((state) => state.comments);
  const dispatch = useAppDispatch();

  const { classes } = useBlog();
  const { reset: resetComment, ...comment } = useForm("text");

  const handleComment = (e: FormEvent) => {
    e.preventDefault();
    try {
      dispatch(
        createComment({
          content: comment.value,
          blogId: blogId,
        }),
      );
      resetComment();
    } catch (exception: unknown) {
      if (exception instanceof AxiosError && exception.response) {
        dispatch(dispalyError(exception.response.data.error, 5000));
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Paper
        component="aside"
        sx={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          maxWidth: "75%",
          minWidth: "75%",
        }}
      >
        <Typography className={classes.title} component="h3" variant="h5">
          Comments
        </Typography>
        {comments.length < 1 ? (
          <Typography>Be the first to comment</Typography>
        ) : (
          <>
            <List>
              {comments
                .filter((comment) => comment.blogId === blogId)
                .map((comment) => (
                  <ListItemText key={comment.id}>
                    <Typography className={classes.otherTxt}>
                      {comment.content}
                    </Typography>
                  </ListItemText>
                ))}
            </List>
          </>
        )}
        <FormControl
          sx={{
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
          }}
          component="form"
          onSubmit={handleComment}
        >
          <TextField
            className={classes.otherTxt}
            {...comment}
            size="small"
            fullWidth
            variant="standard"
            label="Comment"
          />
          <Button
            aria-label="submit button"
            className={classes.button}
            sx={{
              width: "fit-content",
            }}
            startIcon={<SendOutlinedIcon />}
            type="submit"
            size="small"
            variant="outlined"
          >
            Comment
          </Button>
        </FormControl>
      </Paper>
    </Box>
  );
};

export default Comments;
