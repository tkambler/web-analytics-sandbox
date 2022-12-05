import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useAppState } from '@app/components/Setup';
import { useForm } from 'react-hook-form';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function MyAccount() {

  const { user } = useAppState();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });

  console.log(formState);

  const onSubmit = (data) => {
    console.log('submit', data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ flexGrow: 1, width: 700 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                size="small"
                fullWidth
                variant="filled"
                InputProps={{
                  ...register('first_name', {
                    required: true,
                  }),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                size="small"
                fullWidth
                variant="filled"
                InputProps={{
                  ...register('last_name', {
                    required: true,
                  }),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                disableElevation
                type="submit"
                disabled={!formState.isValid}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
}

export default MyAccount;
