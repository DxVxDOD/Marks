import { Link as RouterLink } from "react-router-dom";
import { TUser } from "../../types/user";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useBlog from "../../theme/Blog";
import { useGetAllUsersQuery } from "../../redux/endpoints/users";
import { useGetAllMarksQuery } from "../../redux/endpoints/marks";

const UserInformation = () => {
  const { classes } = useBlog();

  const {
    data: users,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetAllUsersQuery();
  const {
    data: marks,
    isFetching: isFetchingMarks,
    isLoading: isLoadingMarks,
  } = useGetAllMarksQuery();

  if (users && marks) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
        }}
        component="article"
      >
        <Paper
          sx={{
            padding: "2rem",
            minWidth: "75%",
            border: "solid 0.02rem #6E6E6E",
            borderRadius: 0,
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.title}>User</TableCell>
                  <TableCell className={classes.title}>Mark count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user: TUser) => (
                  <TableRow key={user.username}>
                    <TableCell>
                      <Button
                        className={classes.button}
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
      </Box>
    );
  }
};

export default UserInformation;
