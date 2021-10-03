import React, { Component } from 'react'
import axios from 'axios'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment'
import Googledrawer from "./GoogleDrawer"

export default class GoogleApp extends Component {

   

   constructor(props) {
      super(props);
 
       this.OnChangesummary = this.OnChangesummary.bind(this);
       this.OnChangelocation = this.OnChangelocation.bind(this);
       this.OnChangedescription = this.OnChangedescription.bind(this);
       this.OnChangestartDateTime = this.OnChangestartDateTime.bind(this);
       this.OnChangestartDateTimeTimezone = this.OnChangestartDateTimeTimezone.bind(this);
       this.OnChangeendDateTime  = this. OnChangeendDateTime.bind(this);
       this.OnChangendDateTimeTimezone = this.OnChangendDateTimeTimezone.bind(this);
       this.OnChangeemail = this.OnChangeemail.bind(this);
       this.onSubmit = this.onSubmit.bind(this);
       this.OnChangeFile = this.OnChangeFile.bind(this);
       this.onFileSubmit = this.onFileSubmit.bind(this);
     
      this.state = {
           emails : [],
           summary : '',  
           location : '',
           description : '',
           startDateTime :0,
           startDateTimeTimezone : 'America/Los_Angeles',
           endDateTime : '' ,
           endDateTimeTimezone  : 'America/Los_Angeles',
           email : '',
           fileUpload : null
           
      }
    }

   
 
   
   OnChangesummary(e){
      this.setState({
         summary: e.target.value
      });
    }

    OnChangelocation (e){
      this.setState({
         location : e.target.value
      });
    }

    OnChangedescription (e){
      this.setState({
         description : e.target.value
      });
    }

    OnChangestartDateTime (e){
      this.setState({startDateTime: e.toDate(),
     
       }) 
      
    }

    OnChangestartDateTimeTimezone (e){
      this.setState({
         startDateTimeTimezone : e.target.value
      });
    }

    OnChangeendDateTime (e){
      this.setState({
         endDateTime :  e.toDate(),
         endDatetimeFormat :  moment(this.state.endDateTime).format()
      });
    }

    OnChangendDateTimeTimezone(e){
      this.setState({
         endDateTimeTimezone  : e.target.value
      });
    }

    OnChangeemail(e){
      this.setState({
        email : e.target.value
      });
    }
    OnChangeFile(e){
      console.log(e.target.files);

      let file = e.target.files[0]
      
       this.setState({
        fileUpload : file
       })
    }

    onFileSubmit(e){
 
      e.preventDefault();
 
     
      var  file = this.state.fileUpload;

      let formdata = new FormData();
      formdata.append('file',file);

      console.log(formdata)

      axios.post('http://localhost:5000/googleOAuth/upload-files',formdata)
       .then(res=>console.log(res.data));
      

    }

    onSubmit(e)
    {
       e.preventDefault();
 
      
       var  summary = this.state.summary; 
       var  location = this.state.location;
       var  description  = this.state.description ;
       var  startDateTime = startDateTimeTimezone;
       var  startDateTimeTimezone = this.state.startDateTimeTimezone;
       var  endDateTime =  endDateTime;
       var endDateTimeTimezone = this.state.endDateTimeTimezone;
      
        axios({
         method: 'post',
         url: 'http://localhost:5000/googleOAuth/create-event',
         data: {
           summary: this.state.summary,
           location : this.state.location,
           description :this.state.description ,
           startDateTime : this.state.startDateTime,
           startDateTimeTimezone : this.state.startDateTimeTimezone,
           endDateTime: this.state.endDateTime,
           endDateTimeTimezone : this.state.endDateTimeTimezone,
           email : this.state.email
         }
       });
    }
  


  render() {
     
    return (
      <div>
      <div>
         < Googledrawer />
      </div>
      <div className="jumbotron"  style={{ width: "60%",marginLeft:"25%",height:"50%",marginTop:"1%"}}>
       
    <form onSubmit={this.onSubmit}>
   <div class="card">
  <div class="card-body">
    <h5 class="card-title"  style={{marginLeft:"40%"}}>Google Add Event</h5><br/>
    <div class="form-outline">
       <label class="form-label" for="form1">Summary</label>
       <input type="text" placeholder="Enter event summary"  value={this.state.summary} onChange={this.OnChangesummary}   id="form1" class="form-control" />   
    </div><br/>
    <div class="form-outline">
       <label class="form-label" for="form1">Location</label>
       <input type="text" placeholder ="Enter event location"  value={this.state.location } onChange={this.OnChangelocation}  id="form1" class="form-control" />
    </div><br/><br/>
    <div class="form-outline">
       <label class="form-label" for="form1">description</label>
       <input type="text" placeholder="Enter event description" value={this.state.description } onChange={this.OnChangedescription}  id="form1" class="form-control" />
    </div><br/><br/>

    <div class="form-outline" >
        <label class="form-label" for="form1"  style={{ width: "10%",marginLeft:"2%",height:"50%"}}>Starttime</label>
           <div  style={{ width: "40%",marginLeft:"2%",height:"50%"}}>
           <Datetime value={this.state.startDateTime } onChange={this.OnChangestartDateTime}/>
              
            </div>

               <div style={{ width: "40%",marginLeft:"50%",marginTop:"-7%"}}>
                 <label class="form-label" for="form1">Start timeZone</label>
               </div>
                 <div style={{ width: "40%",marginLeft:"60%"}}>
                      <select ref = "userInput" required className="form-control"  value={this.state.startDateTimeTimezone} onChange={this.OnChangestartDateTimeTimezone} multiple= {false}>
                                <option key ="America/Los_Angeles" value="America/Los_Angeles">America/Los_Angeles</option>
                                <option key ="Asia/Bangkok" value="Asia/Bangkok">Asia/Bangkok</option>
                                <option key ="Australia/Canberra" value="Australia/Canberra">Australia/Canberra</option>
                                <option key ="Canada/Atlantic" value="Canada/Atlantic">Canada/Atlantic</option>
                     </select>   
                </div> 
          
     </div><br/><br/>
     <div class="form-outline" >
        <label class="form-label" for="form1"  style={{ width: "10%",marginLeft:"2%",height:"50%"}}>Endtime</label>
           <div  style={{ width: "40%",marginLeft:"2%",height:"50%"}}>
               <Datetime value={this.state.endDateTime } onChange={this.OnChangeendDateTime}/>
            </div>
               <div style={{ width: "40%",marginLeft:"50%",marginTop:"-7%"}}>
                 <label class="form-label" for="form1">End timeZone</label>
               </div>
                 <div class="dropdown" style={{ width: "40%",marginLeft:"60%"}}>
                 <select ref = "userInput" required className="form-control"  value={this.state.endDateTimeTimezone} onChange={this.OnChangendDateTimeTimezone} multiple= {false}>
                                <option key ="America/Los_Angeles" value="America/Los_Angeles">America/Los_Angeles</option>
                                <option key ="Asia/Bangkok" value="Asia/Bangkok">Asia/Bangkok</option>
                                <option key ="Australia/Canberra" value="Australia/Canberra">Australia/Canberra</option>
                                <option key ="Canada/Atlantic" value="Canada/Atlantic">Canada/Atlantic</option>
                  </select>   
                </div> 
          
     </div><br/><br/>
     <div class="form-outline">
       <label class="form-label" for="form1">Email</label>
       <input type="text"  placeholder="Enter receiver email" value={this.state.email} onChange={this.OnChangeemail}   id="form1" class="form-control" />   
    </div><br/>
    <button type="submit" value="Submit" style={{ width: "20%",marginLeft:"35%"}} class="btn btn-primary">Add Event</button>
  </div>
</div>
</form>
<form onSubmit={this.onFileSubmit}>
  <div class="card" style={{marginTop:"2%"}}>
   <div class="card-body">
    <h5 class="card-title"  style={{marginLeft:"34%"}}>Google Drive File Upload</h5><br/>
    <div class="form-outline">
       <label class="form-label" for="form1">File Upload</label>
       <input type="file" className="form-control" id="exampleFormControlFile1"  onChange={(e)=>this.OnChangeFile(e)} />
    </div><br/>
    <button type="submit" value="Submit" style={{ width: "20%",marginLeft:"35%"}} class="btn btn-primary">Upload</button><br/>
    <br/>
    </div>
  </div>
</form>
    
</div>
</div>
    );
  }
}
