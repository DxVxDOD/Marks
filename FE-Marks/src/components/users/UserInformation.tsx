import { Link as RouterLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { User } from "../../types/user";
import { useEffect } from "react";
import { initializeUsers } from "../../reducers/userArrayReducer";
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

const UserInformation = () => {
  const users = useAppSelector((state) => state.userArray);
  const blogs = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();
  const { classes } = useBlog();

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

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
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.title}>User</TableCell>
                <TableCell className={classes.title}>Blog count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: User) => (
                <TableRow key={user.username}>
                  <TableCell>
                    <Button
                      className={classes.button}
                      component={RouterLink}
                      size="small"
                      to={`/users/${user.id}`}
                      state={{ user, blogs }}
                    >
                      {user.username}
                    </Button>
                  </TableCell>
                  <TableCell>{user.blogs!.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default UserInformation;
