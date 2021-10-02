import React, { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddIcon from '@mui/icons-material/Add';

import MeetingTable from "./ChannelTable";

const axios = require("axios");

function ChannelsApp() {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState(10);

  const [name, setName] = React.useState("");

  const [channels, setChannels] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/zoomOAuth/getchannels").then((response) => {
        
            setChannels(response.data.channels.map((channels) => channels));
            
        
        console.log(response)
          
    });

},[]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const data = {
        name: name,
      };

      await axios.post("http://localhost:5000/zoomOAuth/createchannel", data).then((res) => {
      console.log("res", res);
      setName("");
    });
    setOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <Button startIcon={<AddIcon />} variant="outlined" onClick={handleClickOpen}>
        Create New Channel
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth="100%">
        <DialogTitle>Create New Meeting</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create new meeting, please enter meeting details here.
          </DialogContentText>
          <form>

          <TextField
            margin="dense"
            id="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            label="Channel Name"
            type="text"
            fullWidth
            variant="filled"
            size="small"
            color="secondary"
            required
          />

          
          
          
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">Cancel</Button>
          <Button onClick={handleFormSubmit} color="secondary">Submit</Button>
        </DialogActions>
        
      </Dialog>
<br />
<br />
      <MeetingTable meetings={channels} />
    </div>
  );
}

export default ChannelsApp;
