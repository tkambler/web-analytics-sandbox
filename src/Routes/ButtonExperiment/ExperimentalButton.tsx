import React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { useFeature } from '@app/lib/hooks';
import { purple } from '@mui/material/colors';

const PurpleButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

export const ExperimentalButton = ({ onClick }) => {
  const purpleButton = useFeature('purple_button');
  console.log('purpleButton', purpleButton);
  const ButtonVariant = purpleButton.on ? PurpleButton : Button;
  const exp = useFeature('button_experiment');
  console.log('exp', exp);
  console.log('exp.value', exp.value);
  console.log('purpleButton', purpleButton);

  return (
    <ButtonVariant variant="contained" disableElevation onClick={onClick}>
      Click Me
    </ButtonVariant>
  );
};

export default ExperimentalButton;
