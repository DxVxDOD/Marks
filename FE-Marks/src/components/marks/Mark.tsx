import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  ButtonGroup,
  Divider,
  Link,
  List,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.tsx";
import {
  useDeleteMarkMutation,
  useGetMarkQuery,
} from "../../redux/endpoints/marks";
import useStyle from "../../theme/Style.tsx";
import { useState } from "react";

const Mark = () => {
  const [open, setOpen] = useState(false);

  const { state } = useLocation();
  const { data: mark } = useGetMarkQuery(state.id);
  const [deleteMark] = useDeleteMarkMutation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { classes } = useStyle();

  if (mark) {
    const removeMark = async () => {
      if (window.confirm(`Would you like to remove ${mark.title} ?`)) {
        navigate("/marks");
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
          <ButtonGroup variant="text">
            <Button
              size="small"
              aria-label="delete button"
              startIcon={<EditIcon />}
              onClick={() => setOpen(true)}
            >
              <Typography className={classes.text}>Edit</Typography>
            </Button>
            <Button
              size="small"
              aria-label="delete button"
              startIcon={<DeleteOutlinedIcon />}
              onClick={removeMark}
            >
              <Typography className={classes.text}>Remove</Typography>
            </Button>
          </ButtonGroup>
        ) : null}
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        width: "100%",
        gap: "1rem",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        borderRadius: 0,
        background: "#121213",
      }}
      className="box"
      component="section"
    >
      <Typography className={" loading"}>Loading title...</Typography>
      <Divider variant="middle" />
      <Typography className={" loading"}>Loading tag...</Typography>
      <Divider variant="middle" />
      <Typography className={" loading"}>Loading link...</Typography>
      <Divider variant="middle" />
      <Typography className={" loading"} component="p">
        Loading username...
      </Typography>
      <Divider variant="middle" />
      <Typography className={" loading"}>Loading likes...</Typography>
      <Divider variant="middle" />
      <Typography className={" loading"}>Loading comments...</Typography>
    </Paper>
  );
};

export default Mark;
