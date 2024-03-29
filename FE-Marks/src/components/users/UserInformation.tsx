import { Link as RouterLink } from "react-router-dom";
import { TUser } from "../../types/user";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useMark from "../../theme/Mark";
import { useGetAllUsersQuery } from "../../redux/endpoints/users";
import { useGetAllMarksQuery } from "../../redux/endpoints/marks";

const UserInformation = () => {
  const { classes } = useMark();

  const { data: users, isFetching: isFetchingUsers } = useGetAllUsersQuery();
  const { data: marks, isFetching: isFetchingMarks } = useGetAllMarksQuery();

  if (marks && users) {
    return (
      <Paper
        sx={{
          padding: "2rem",
          minWidth: "75%",
          border: "solid 1.5px rgba(168, 239, 255, 0.4)",
          borderRadius: 0,
          background: "#121213",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
        }}
        component="article"
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  className={
                    isFetchingMarks || isFetchingUsers
                      ? "fetching "
                      : "" + classes.title
                  }
                >
                  User
                </TableCell>
                <TableCell
                  className={
                    isFetchingMarks || isFetchingUsers
                      ? "fetching "
                      : "" + classes.title
                  }
                >
                  Mark count
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: TUser) => (
                <TableRow key={user.username}>
                  <TableCell>
                    <Button
                      sx={{
                        color: "#e0e0e0",
                      }}
                      className={
                        isFetchingMarks || isFetchingUsers
                          ? "fetching "
                          : "" + classes.button
                      }
                      component={RouterLink}
                      size="small"
                      to={`/users/${user.id}`}
                      state={{ user, marks: marks }}
                    >
                      {user.username}
                    </Button>
                  </TableCell>
                  <TableCell>{user.marks.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        padding: "2rem",
        borderRadius: 0,
        background: "#121213",
        display: "flex",
        flexDirection: "column",
        minWidth: "75%",
        alignItems: "center",
        marginTop: "2rem",
      }}
      component="article"
      className="box"
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.title}>
                <Typography fontSize={"large"} className="loading">
                  User
                </Typography>
              </TableCell>
              <TableCell className={classes.title}>
                <Typography className="loading" fontSize={"large"}>
                  Mark Count
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography fontSize={"medium"} className="loading">
                  Loading
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontSize={"medium"} className="loading">
                  Loading
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserInformation;
