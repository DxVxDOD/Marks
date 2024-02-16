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
import { FormEvent } from "react";
import { useForm } from "../../hooks/useForm.tsx";
import useBlog from "../../theme/Blog.tsx";
import {
  useAddNewCommentMutation,
  useGetAllCommentsQuery,
} from "../../redux/endpoints/comments.ts";

const Comments = ({ markId }: { markId: string }) => {
  const { data: comments } = useGetAllCommentsQuery();
  const [postComment, { isLoading, isError }] = useAddNewCommentMutation();

  const { classes } = useBlog();
  const { reset: resetComment, ...comment } = useForm("text");

  const handleComment = (e: FormEvent) => {
    e.preventDefault();

    postComment({
      markId,
      content: comment.value,
    });
  };

  if (comments) {
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
            border: `${
              isError ? "solid 0.025rem red" : "solid 0.02rem #6E6E6E"
            }`,
            borderRadius: 0,
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
                  .filter((comment) => comment.markId === markId)
                  .map((comment) => (
                    <ListItemText key={comment.markId}>
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
  }

  if (isLoading) {
    return <>Is Loading....</>;
  }

  return null;
};

export default Comments;
