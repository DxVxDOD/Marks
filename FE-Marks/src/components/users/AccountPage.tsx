import {
  Paper,
  Typography,
  Button,
  ButtonGroup,
  TextField,
  Stack,
  Box,
} from "@mui/material";
import useHome from "../../theme/Home";
import { useForm } from "../../hooks/useForm";

const AccountPage = () => {
  const { reset: usernameReset, ...username } = useForm("text");
  const { reset: nameReset, ...name } = useForm("text");
  const { reset: passwordReset, ...password } = useForm("text");
  const { reset: emailReset, ...email } = useForm("text");
  const button = useHome().classes;

  return (
    <Paper
      sx={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        width: "75%",
      }}
    >
      <Paper
        sx={{
          padding: "0.5rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography>Account settings</Typography>
      </Paper>

      <Stack component="form">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <TextField
            color="success"
            size="small"
            label="Username"
            variant="standard"
            placeholder="Username"
            {...username}
          />
          <ButtonGroup variant="outlined" size="small">
            <Button>
              <Typography className={button.bttnTxt}>Reset Field</Typography>
            </Button>
            <Button>
              <Typography className={button.bttnTxt}> Change </Typography>
            </Button>
          </ButtonGroup>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <TextField
            color="success"
            size="small"
            label="Name"
            variant="standard"
            placeholder="Name"
            {...name}
          />
          <ButtonGroup variant="outlined" size="small">
            <Button>
              <Typography className={button.bttnTxt}>Reset Field</Typography>
            </Button>
            <Button>
              <Typography className={button.bttnTxt}> Change </Typography>
            </Button>
          </ButtonGroup>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <TextField
            color="success"
            size="small"
            label="Email"
            variant="standard"
            placeholder="Email"
            {...email}
          />
          <ButtonGroup variant="outlined" size="small">
            <Button>
              <Typography className={button.bttnTxt}>Reset Field</Typography>
            </Button>
            <Button>
              <Typography className={button.bttnTxt}> Change </Typography>
            </Button>
          </ButtonGroup>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <TextField
            color="success"
            size="small"
            label="Password"
            variant="standard"
            placeholder="Password"
            {...password}
          />
          <ButtonGroup variant="outlined" size="small">
            <Button>
              <Typography className={button.bttnTxt}>Reset Field</Typography>
            </Button>
            <Button>
              <Typography className={button.bttnTxt}> Change </Typography>
            </Button>
          </ButtonGroup>
        </Box>
      </Stack>
    </Paper>
  );
};

export default AccountPage;
