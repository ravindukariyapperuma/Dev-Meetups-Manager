import React, {useEffect, useState} from "react";
import axios from 'axios';
import swal from 'sweetalert';
import Product  from './Product.js';
import Row from 'react-bootstrap/Row';
import fblogo from './images/fblogo.png';

function FacebookApp() {

  const [page, setPage] = useState();
  const [user, setUser] = useState();
  const [optionsState, setoptionsState] = useState(page && [{name:page[0].name}])
  const [showSuccess, setShowSuccess] = useState(false);
  const [posts, setPosts] = useState([]);

  const [inputField , setInputField] = useState({
    message: '',
    id:''
  })

  const inputsHandler = (e) =>{
    setInputField( {[e.target.name]: e.target.value, id:page[0].id} )
  }

  useEffect(() => {
    user === undefined && axios.get("http://localhost:5000/fbOAuth/userInfo").then(results => {
          results.data && setUser(results.data)
        })

    page === undefined &&
    axios.get("http://localhost:5000/fbOAuth/getPageInfo").then(results => {
      console.log("RES", results)
      setPage([...results.data.data])
    })

    page && setoptionsState([{name:page[0].name}])
  }, [])

  useEffect(() => {
    axios.get("http://localhost:5000/fbOauth/getPagePosts").then(results => {
     setPosts(old => [...results.data])
    })
  }, [])

  const getPostData = () => {
    axios.get("http://localhost:5000/fbOauth/getPagePosts").then(results => {
      setPosts(old => [...results.data])
      console.log("EFOEKF", posts)
    })
  }

  function onSubmit() {
    setInputField({...inputField, id:page[0].id})
    axios.post("http://localhost:5000/fbOAuth/publishPost", inputField).then(results => {
      results &&
      swal({
        title:`Posted!`,
        text:`Successfully posted on ${page[0].name}!`,
        icon:"success",
        button:"Ok!"
      });
    })
    getPostData()
  }

  function handleSelectChange(event) {
    setoptionsState(event.target.value);
  }

  return <div>
    <div className="jumbotron"  style={{ width: "50%",marginLeft:"25%",marginTop:"1%"}}>
    <div className="card-body">
      <img src={fblogo} height={80} width={100} style={{marginLeft: "1%", marginBottom:"0%"}}/>
      <h5 className="card-title" style={{marginLeft: "40%", marginBottom:"0%", fontSize:25}}>Welcome { user && user.name}!</h5><br/>
      <h5 className="card-title" style={{marginLeft: "1%"}}>Create your facebook announcement</h5><br/>
      <div className="form-outline">

        <label className="form-label" htmlFor="form1">Hit your message</label>
        <input type="text"
               placeholder="Hit your message"
               id="form1" className="form-control"
               name="message"
               onChange={inputsHandler}
               value={inputField.message}
        /> <br/>
        <div className="dropdown" style={{width: "40%", marginLeft: "0%"}}>
          <select className="form-control" value={optionsState} onChange={handleSelectChange}>
            {page && true && page.map(option =>  <option key={option.name} value={option.name}>{option.name}</option>)}
          </select>
        </div> <br/><br/>

        <button onClick={onSubmit} type="submit" value="Submit" style={{width: "20%", marginLeft: "35%"}} className="btn btn-primary">
          Create your post
        </button>
      </div>
      <br/>
    </div>
      {/*<div className='row-wrapper'>*/}
      <Row>
        {posts && posts.map(product => (
            <Product key={product.id} product={product} name={page && page[0].name}/>
        ))}
      </Row>
    {/*</div>*/}
    </div>
  </div>;
}

export default FacebookApp;
