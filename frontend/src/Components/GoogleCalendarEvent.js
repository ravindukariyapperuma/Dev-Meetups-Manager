import * as React from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';


export default function GoogleCalendarEvent() {
 
  return (
    
    <Card sx={{ Width: '75ch',marginLeft:'35ch',marginRight:'50ch',marginTop:'10ch' }}>
    <CardContent>
  
      <FormLabel component="legend" sx={{ m: 1, width: '45ch',marginLeft:'20ch' }}>Google Add Event</FormLabel> <br/>   
      <TextField id="filled-basic" label="summary" variant="filled" sx={{ m: 1, width: '45ch',marginLeft:'10ch' }}/><br/>
      <TextField id="filled-basic" label="location" variant="filled" sx={{ m: 1, width: '45ch',marginLeft:'10ch' }}/><br/>
      <TextField id="filled-basic" label="description" variant="filled" sx={{ m: 1, width: '45ch',marginLeft:'10ch' }}/><br/>
   
    </CardContent>
    <CardActions>
       <Button variant="contained"  sx={{ m: 1, width: '45ch',marginLeft:'14ch' }}>Add Event</Button>
    </CardActions>
   </Card>  
    
  )
}
