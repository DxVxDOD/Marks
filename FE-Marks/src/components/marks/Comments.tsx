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
import useMark from "../../theme/Mark.tsx";
import {
  useAddNewCommentMutation,
  useGetAllCommentsQuery,
} from "../../redux/endpoints/comments.ts";

const Comments = ({ markId }: { markId: string }) => {
  const {
    data: comments,
    isFetching,
    isLoading: isLoadingComments,
  } = useGetAllCommentsQuery();
  const [
    postComment,
    { isLoading: isCommentLoading, isError: isCommentError },
  ] = useAddNewCommentMutation();

  const { classes } = useMark();
  const { reset: resetComment, ...comment } = useForm("text");

  const handleComment = (e: FormEvent) => {
    e.preventDefault();

    postComment({
      markId,
      content: comment.value,
    });
  };

  if (isLoadingComments) {
    return (
      <Paper
        component="aside"
        sx={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          width: "75%",
          borderRadius: 0,
          justifyContent: "center",
        }}
        className="box"
      >
        <Typography
          className={"loading " + classes.title}
          component="h3"
          variant="h5"
        >
          Loading comments...
        </Typography>
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
            disabled
            {...comment}
            size="small"
            fullWidth
            variant="standard"
            label="Comment"
          />
          <Button
            disabled
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
    );
  }

  if (comments) {
    return (
      <Paper
        component="aside"
        sx={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          width: "75%",
          border: "solid 1.5px rgba(168, 239, 255, 0.4)",
          borderRadius: 0,
          justifyContent: "center",
        }}
      >
        <Typography className={classes.title} component="h3" variant="h5">
          Comments
        </Typography>
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
    );
  }

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
          border: "solid 1.5px rgba(168, 239, 255, 0.4)",
          borderRadius: 0,
          background: "#121213",
        }}
      >
        <Typography className={classes.title} component="h3" variant="h5">
          Comments
        </Typography>
        <Typography>Be the first to comment</Typography>
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
            color="info"
          >
            Comment
          </Button>
        </FormControl>
      </Paper>
    </Box>
  );
};

export default Comments;
