import { useLocation } from "react-router-dom";
import Comments from "./Comments.tsx";
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
import { useGetAllMarksQuery } from "../../redux/endpoints/marks";
import { setSuccess } from "../../redux/slices/notifications";
import { useAuth } from "../../hooks/useAuth.tsx";

const Mark = () => {
  const { state } = useLocation();
  const { classes } = useBlog();
  const { data: marks } = useGetAllMarksQuery();
  const { user } = useAuth();

  if (marks) {
    const mark = marks.filter((mark) => mark.id === state.id)[0];

    const updateLikes = () => {};

    const removeMark = async () => {
      if (mark && window.confirm(`Would you like to remove ${mark.title} ?`)) {
        setSuccess(`${mark.title} has been removed`);
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
            border: "solid 0.02rem #6E6E6E",
            borderRadius: 0,
          }}
          component="section"
        >
          <Box component="section">
            <Typography className={classes.title} component="h2" variant="h5">
              Title: {mark.title}
            </Typography>
            <Typography className={classes.author} component="h3" variant="h5">
              Author: {mark.tag}
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
                {mark.user.username === user.username ? (
                  <Button
                    className={classes.button}
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
        <Comments markId={`${mark.id}`} />
      </Box>
    );
  }
};

export default Mark;
