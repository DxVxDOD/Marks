import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
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
import useStyle from "../../theme/Style.tsx";

const Mark = () => {
  const { state } = useLocation();
  const { data: mark, isFetching } = useGetMarkQuery(state.id);
  const [deleteMark, { isLoading: isDeleteLoading }] = useDeleteMarkMutation();
  const [updateMark, { isLoading: isUpdateLoading }] = useEditMarkMutation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { classes } = useStyle();

  if (mark) {
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
      <Paper
        sx={{
          gap: "1rem",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          borderRadius: 0,
          width: "100%",
          alignItems: "center",
        }}
        component="article"
        variant="outlined"
      >
        <List sx={{ width: "100%" }}>
          <ListItemText
            primary={
              <Typography className={classes.primary_text}>Title</Typography>
            }
            secondary={
              <Typography className={classes.text}>{mark.title}</Typography>
            }
          />
          <Divider />
          <ListItemText
            primary={
              <Typography className={classes.primary_text}>Tag</Typography>
            }
            secondary={
              <Typography className={classes.text}>{mark.tag}</Typography>
            }
          />
          <Divider />
          <ListItemText
            primary={
              <Typography className={classes.primary_text}>Link</Typography>
            }
            secondary={
              <Link className={classes.text} href={mark.url}>
                {mark.title}
              </Link>
            }
          />
        </List>
        {user && user.username === mark.user.username ? (
          <Button
            size="small"
            aria-label="delete button"
            startIcon={<DeleteOutlinedIcon />}
            onClick={removeMark}
            variant="outlined"
          >
            <Typography className={classes.text}>Remove</Typography>
          </Button>
        ) : null}
      </Paper>
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
