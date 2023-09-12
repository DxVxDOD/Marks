import { useAppDispatch, useAppSelector } from "../../app/hooks";
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
import { useEffect } from "react";
import useBlog from "../../theme/Blog";
import {
  deleteMark,
  initializeMarks,
  updateMark,
} from "../../reducers/markReducer";

const mark = () => {
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const marks = useAppSelector((state) => state.mark);
  const { classes } = useBlog();
  const mark = marks.filter((mark) => mark.id === state.id)[0];

  useEffect(() => {
    dispatch(initializeMarks());
  }, []);

  const updateLikes = async () => {
    try {
      dispatch(updateMark(mark));
    } catch (exception: unknown) {
      if (exception instanceof AxiosError && exception.response) {
        dispatch(dispalyError(exception.response.data.error, 5000));
      }
    }
  };

  const removemark = async () => {
    if (mark && window.confirm(`Would you like to remove ${mark.title} ?`)) {
      try {
        dispatch(deleteMark(mark.id!));
        dispatch(dispalySuccess(`${mark.title} has been removed`, 5000));
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
            Title: {mark.title}
          </Typography>
          <Typography className={classes.author} component="h3" variant="h5">
            Author: {mark.author}
          </Typography>
        </Box>
        <Link href={mark.url}>
          <Typography className={classes.otherTxt}>
            \\ {mark.title} \\
          </Typography>
        </Link>
        <Typography className={classes.otherTxt} component="p">
          {mark.user.username}
        </Typography>
        {user === null ? (
          <Typography className={classes.otherTxt} component="p" id="likes">
            Likes: {mark.likes}
          </Typography>
        ) : (
          <>
            <Typography className={classes.otherTxt}>
              Likes: {mark.likes}
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
                onClick={removemark}
              >
                Remove
              </Button>
            </ButtonGroup>
          </>
        )}
      </Paper>
      <Comments markId={`${mark.id}`} />
    </Box>
  );
};

export default mark;
