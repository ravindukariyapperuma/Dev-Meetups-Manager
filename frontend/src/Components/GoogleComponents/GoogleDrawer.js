import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import EventNoteIcon from '@mui/icons-material/EventNote';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { makeStyles } from "@material-ui/core/styles";



import Profile from "./GoogleProfileDetails"
import GoogleApp from './GoogleApp'
import Driveupload from './Driveupload'

const axios = require("axios");
const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
    rootDiv: {
      marginTop: theme.spacing(4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",

    },
  }));

function ZoomAppDrawer(props) {
    const classes = useStyles();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    // localStorage.setItem("selectedIndex", index);
  };

  

  const drawer = (
    <div>
      <Toolbar className={classes.rootDiv}>
          <Profile />
        </Toolbar>

      {/* <List component="nav" aria-label="main mailbox folders">
      <Divider />
        <ListItem
          button
          selected={selectedIndex === "0"}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            < EventNoteIcon/>
          </ListItemIcon>
          <ListItemText primary="Event" />
        </ListItem>
        <Divider />
        <ListItem
          button
          selected={selectedIndex === "1"}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <UploadFileIcon  />
          </ListItemIcon>
          <ListItemText primary="Drive Upload" />
        </ListItem>
        <Divider />
      </List> */}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dev Meetups Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {selectedIndex === 0 ? (
           <div></div>// <MettingsApp />
        ) : (
            <div></div>
        )}
      </Box>
    </Box>
  );
}

ZoomAppDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ZoomAppDrawer;
