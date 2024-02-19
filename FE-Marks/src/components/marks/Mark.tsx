import { useLocation, useNavigate } from "react-router-dom";
// import Comments from "./Comments.tsx";
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
import useMark from "../../theme/Mark.tsx";
import {
  useDeleteMarkMutation,
  useEditMarkMutation,
  useGetMarkQuery,
} from "../../redux/endpoints/marks";
import { useAuth } from "../../hooks/useAuth.tsx";
import toast from "react-hot-toast";
import { useState } from "react";

const Mark = () => {
  const { state } = useLocation();
  const { classes } = useMark();
  const { data: mark, isFetching } = useGetMarkQuery(state.id);
  const [deleteMark, { isLoading: isDeleteLoading }] = useDeleteMarkMutation();
  const [updateMark, { isLoading: isUpdateLoading }] = useEditMarkMutation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [like, setLike] = useState(true);

  if (mark) {
    const updateLikes = async () => {
      setLike(!like);

      if (like) {
        await toast.promise(updateMark({ ...mark, likes: mark.likes + 1 }), {
          loading: "Updating...",
          success: <b>Mark updated successfully!</b>,
          error: <b>Could not update mark.</b>,
        });
      }

      if (!like) {
        await toast.promise(updateMark({ ...mark, likes: mark.likes - 1 }), {
          loading: "Updating...",
          success: <b>Mark updated successfully!</b>,
          error: <b>Could not update mark.</b>,
        });
      }
    };

    const removeMark = async () => {
      if (window.confirm(`Would you like to remove ${mark.title} ?`)) {
        navigate("/");
        await toast.promise(deleteMark(mark), {
          loading: "Deleting...",
          success: <b>Mark deleted successfully!</b>,
          error: <b>Could not delete Mark.</b>,
        });
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
            border: "solid 1.5px rgba(168, 239, 255, 0.4)",
            borderRadius: 0,
            background: "#121213",
          }}
          component="section"
          className={isDeleteLoading || isUpdateLoading ? "box" : ""}
        >
          <Box component="section">
            <Typography
              className={isFetching ? " fetching" : "" + classes.title}
              component="h2"
              variant="h5"
            >
              Title: {mark.title}
            </Typography>
            <Typography
              className={isFetching ? " fetching" : "" + classes.author}
              component="h3"
              variant="h5"
            >
              Author: {mark.tag}
            </Typography>
          </Box>
          <Link href={mark.url}>
            <Typography
              sx={{
                color: "rgba(168, 239, 255, 0.4)",
              }}
              className={isFetching ? " fetching" : "" + classes.otherTxt}
            >
              \\ {mark.title} \\
            </Typography>
          </Link>
          <Typography
            className={isFetching ? " fetching" : "" + classes.otherTxt}
            component="p"
          >
            {mark.user.username}
          </Typography>
          {user === null ? (
            <Typography
              className={isFetching ? " fetching" : "" + classes.otherTxt}
              component="p"
              id="likes"
            >
              Likes: {mark.likes}
            </Typography>
          ) : (
            <>
              <Typography
                className={isFetching ? " fetching" : "" + classes.otherTxt}
              >
                Likes: {mark.likes}
              </Typography>

              <ButtonGroup aria-label="alignment button group" size="small">
                <Button
                  className={isFetching ? " fetching" : "" + classes.button}
                  startIcon={<ThumbUpOutlinedIcon />}
                  aria-label="like button"
                  onClick={updateLikes}
                  id="likeButton"
                >
                  Like
                </Button>
                {mark.user.username === user.username ? (
                  <Button
                    className={isFetching ? " fetching" : "" + classes.button}
                    aria-label="delete button"
                    startIcon={<DeleteOutlinedIcon />}
                    onClick={removeMark}
                  >
                    Remove
                  </Button>
                ) : null}
              </ButtonGroup>
            </>
          )}
        </Paper>
        {/* <Comments markId={`${mark.id}`} /> */}
      </Box>
    );
  }

  return (
    <Paper
      sx={{
        width: "75%",
        gap: "1rem",
        padding: "2rem",
        margin: "2rem",
        display: "flex",
        flexDirection: "column",
        borderRadius: 0,
        background: "#121213",
      }}
      className="box"
      component="section"
    >
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Typography
          className={classes.title + " loading"}
          component="h2"
          variant="h5"
        >
          Loading title...
        </Typography>
        <Typography
          className={classes.author + " loading"}
          component="h3"
          variant="h5"
        >
          Loading author...
        </Typography>
      </Box>
      <Typography className={classes.otherTxt + " loading"}>
        \\ Loading link... \\
      </Typography>
      <Typography className={classes.otherTxt + " loading"} component="p">
        Loading username...
      </Typography>
      <Typography className={classes.otherTxt + " loading"}>
        Loading likes...
      </Typography>
      <Typography className={classes.otherTxt + " loading"}>
        Loading comments...
      </Typography>
    </Paper>
  );
};

export default Mark;
