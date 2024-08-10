import { useLocation, useNavigate } from "react-router-dom";
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
import {
  useDeleteMarkMutation,
  useEditMarkMutation,
  useGetMarkQuery,
} from "../../redux/endpoints/marks";
import { useAuth } from "../../hooks/useAuth.tsx";
import toast from "react-hot-toast";
import { useState } from "react";
import useStyle from "../../theme/Style.tsx";

const Mark = () => {
  const { state } = useLocation();
  const { data: mark, isFetching } = useGetMarkQuery(state.id);
  const [deleteMark, { isLoading: isDeleteLoading }] = useDeleteMarkMutation();
  const [updateMark, { isLoading: isUpdateLoading }] = useEditMarkMutation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { classes } = useStyle();

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
              className={isFetching ? " fetching" : "" + classes}
              component="h2"
              variant="h5"
            >
              Title: {mark.title}
            </Typography>
            <Typography
              className={isFetching ? " fetching" : ""}
              component="h3"
              variant="h5"
            >
              Tag: {mark.tag}
            </Typography>
          </Box>
          <Link href={mark.url}>
            <Typography
              sx={{
                color: "rgba(168, 239, 255, 0.4)",
              }}
              className={isFetching ? " fetching" : ""}
            >
              {mark.title}
            </Typography>
          </Link>
          <Typography className={isFetching ? " fetching" : ""} component="p">
            {mark.user.username}
          </Typography>
          {user && (
            <ButtonGroup aria-label="alignment button group" size="small">
              <Button
                className={isFetching ? " fetching" : "" + classes.text}
                startIcon={<ThumbUpOutlinedIcon />}
                aria-label="like button"
                onClick={updateLikes}
                id="likeButton"
              >
                Like
              </Button>
              {mark.user.username === user.username ? (
                <Button
                  className={isFetching ? " fetching" : "" + classes.text}
                  aria-label="delete button"
                  startIcon={<DeleteOutlinedIcon />}
                  onClick={removeMark}
                >
                  Remove
                </Button>
              ) : null}
            </ButtonGroup>
          )}
        </Paper>
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
        <Typography className={" loading"} component="h2" variant="h5">
          Loading title...
        </Typography>
        <Typography className={" loading"} component="h3" variant="h5">
          Loading tag...
        </Typography>
      </Box>
      <Typography className={" loading"}>\\ Loading link... \\</Typography>
      <Typography className={" loading"} component="p">
        Loading username...
      </Typography>
      <Typography className={" loading"}>Loading likes...</Typography>
      <Typography className={" loading"}>Loading comments...</Typography>
    </Paper>
  );
};

export default Mark;
