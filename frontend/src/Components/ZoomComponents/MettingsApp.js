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

import MeetingTable from "./MeetingTable";

const axios = require("axios");

function MettingsApp() {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState(10);

  const [topic, setTopic] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [datetime, setDatetime] = React.useState("");
  const [meetings, setMeetings] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/zoomOAuth/getmeetings").then((response) => {
        if (response.data.meetings.length > 0) {
            setMeetings(response.data.meetings.map((meetings) => meetings));
            
        }
        console.log(response)
            console.log(meetings)
    });

},[]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const data = {
        topic: topic,
        description: description,
        password: password,
        datetime: datetime,
      };

      await axios.post(" http://localhost:5000/zoomOAuth/createmeeting", data).then((res) => {
      console.log("res", res);
      setTopic("");
    setDescription("");
    setPassword("");
    setDatetime("");
    });
    setOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <Button startIcon={<AddIcon />} variant="outlined" onClick={handleClickOpen}>
        Create New Meeting
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
            id="topic"
            id="name"
            onChange={(e) => setTopic(e.target.value)}
            value={topic}
            label="Meeting Topic"
            type="text"
            fullWidth
            variant="filled"
            size="small"
            color="secondary"
            required
          />

          <TextField
            margin="dense"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            label="Meeting Description"
            type="text"
            fullWidth
            variant="filled"
            size="small"
            color="secondary"
            required
          />
          <TextField
            margin="dense"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            label="Meeting Password"
            type="text"
            fullWidth
            variant="filled"
            size="small"
            color="secondary"
            required
          />
          <br />
          <br />

          <InputLabel id="demo-simple-select-label1">Start Time *</InputLabel>
          <TextField
            labelId="demo-simple-select-label1"
            margin="dense"
            id="datetime"
            onChange={(e) => setDatetime(e.target.value)}
            value={datetime}
            type="datetime-local"
            fullWidth
            variant="filled"
            size="small"
            color="secondary"
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
      <MeetingTable meetings={meetings} />
    </div>
  );
}

export default MettingsApp;
