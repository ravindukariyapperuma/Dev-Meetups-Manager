import React, { Component } from 'react'
import axios from 'axios'

export class Driveupload extends Component {
    constructor(props) {
        super(props);
         this.OnChangeFile = this.OnChangeFile.bind(this);
         this.onFileSubmit = this.onFileSubmit.bind(this);
       
        this.state = {
             fileUpload : null       
        }
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
  
  
    render() { 
      return ( 
<div className="jumbotron"  style={{ width: "50%",marginLeft:"25%",height:"50%",marginTop:"1%"}}> 
  <div class="card">
   <div class="card-body">
    <form onSubmit={this.onFileSubmit}>
         <h5 class="card-title"  style={{marginLeft:"35%",marginTop:"1%"}}>Google Drive File Upload</h5><br/>
      <div class="form-outline">
         <label class="form-label" for="form1">File Upload</label>
         <input type="file" className="form-control" id="exampleFormControlFile1"  onChange={(e)=>this.OnChangeFile(e)} />
      </div><br/>
      <button type="submit" value="Submit" style={{ width: "20%",marginLeft:"35%"}} class="btn btn-primary">Upload</button><br/>
      <br/>
     </form>
    </div>
   </div>
  </div>
      );
    }
}

export default Driveupload
