import { Link as RouterLink, useLocation } from "react-router-dom";
import { TMark } from "../../types/mark";
import { Box, Button, Icon, Paper, Typography } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";

const User = () => {
  const { state } = useLocation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      component="article"
    >
      <Paper
        sx={{
          marginTop: "2rem",
          padding: "2rem",
          minWidth: "75%",
          border: "solid 0.02rem #6E6E6E",
          borderRadius: 0,
        }}
        component="section"
      >
        <Typography component="h2" variant="h5">
          {state.user.username}s marks:
        </Typography>
        {state.user.marks.length < 1 ? (
          <Typography component="h2" variant="h5">
            You haven't posted any marks yet
          </Typography>
        ) : (
          state.user.marks
            .sort((a: TMark, b: TMark) => b.likes! - a.likes!)
            .map((mark: TMark) => (
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
                key={mark.id}
                component={RouterLink}
                to={`/blog/${mark.id}`}
                state={mark}
              >
                <Icon>
                  <ArticleIcon
                    sx={{
                      display: "flex",
                    }}
                  />
                </Icon>
                {mark.title}
              </Button>
            ))
        )}
      </Paper>
    </Box>
  );
};

export default User;
