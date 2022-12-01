import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { actions, useAppState, useToast } from '@app/components/Setup';

export const LoginPanel = () => {

  const [ email, setEmail ] = useState('john.doe@fakesite.local');
  const [ password, setPassword ] = useState('123');
  const { dispatch } = useAppState();
  const toast = useToast();

  const onSubmit = async () => {
    dispatch(actions.login(email, password, toast));
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
          <TextField
            required
            label="Email Address"
            variant="standard"
            value={email}
            style={{
              marginBottom: 15,
            }}
            onChange={e => {
              setEmail(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            label="Password"
            variant="standard"
            value={password}
            style={{
              marginBottom: 15,
            }}
            type="password"
            autoComplete="current-password"
            onChange={e => {
              setPassword(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant="contained" disableElevation onClick={onSubmit}>
            Sign In
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default LoginPanel;
