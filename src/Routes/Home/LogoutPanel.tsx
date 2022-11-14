import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { actions, useAppState, useToast } from '@app/components/Setup';

export const LogoutPanel = () => {
  const { user, dispatch } = useAppState();
  const toast = useToast();

  const onSubmit = async () => {
    dispatch(actions.logout(toast));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
        },
      }}
    >
      <Paper
        elevation={0}
        style={{
          padding: 15,
          width: 500,
        }}
      >
        <Stack>
          <Typography variant="body1" gutterBottom>
            You are signed in as {user.first_name} {user.last_name}.
          </Typography>
          <Button variant="contained" disableElevation onClick={onSubmit}>
            Sign Out
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default LogoutPanel;
