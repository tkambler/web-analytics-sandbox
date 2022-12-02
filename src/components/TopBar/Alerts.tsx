import React from 'react';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import MailIcon from '@mui/icons-material/Mail';

const Alerts = ({ menuId, handleProfileMenuOpen }) => {
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <IconButton size="large" aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={4} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
      >
        <Badge badgeContent={17} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </Box>
  );
};

export default Alerts;
