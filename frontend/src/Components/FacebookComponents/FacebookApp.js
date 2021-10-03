import React, {useEffect, useState} from "react";
import axios from 'axios';
import swal from 'sweetalert';
import Posts from './Posts.js';
import Row from 'react-bootstrap/Row';
import fblogo from './images/fblogo.png';
import FBDrawer from './FBDrawer';
import {Redirect} from "react-router-dom";

function FacebookApp() {

    const [page, setPage] = useState();
    const [user, setUser] = useState();
    const [optionsState, setoptionsState] = useState(page && [{name: page[0].name}])
    const [posts, setPosts] = useState([]);
    const [deleteData, setDeleteData] = useState(0);
    const [logoutout, setlogoutout] = useState(false);
    const [inputField, setInputField] = useState({message: '', id: ''})

    useEffect(() => {
        getPostData()
    }, [deleteData])

    useEffect(() => {
        deleteData && getPostData()
    }, [deleteData])

    const inputsHandler = (e) => {
        setInputField({[e.target.name]: e.target.value, id: page[0].id})
    }

    useEffect(() => {
        page === undefined &&
        axios.get("http://localhost:5000/fbOAuth/getPageInfo").then(results => {
            console.log("PAGEINFO", page)
            setPage([...results.data.data])
        })
        page && setoptionsState([{name: page[0].name}])
    }, [])

    useEffect(() => {
        user === undefined && axios.get("http://localhost:5000/fbOAuth/userInfo").then(results => {
            results.data && setUser(results.data)
        })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:5000/fbOauth/getPagePosts").then(results => {
            setPosts(old => [old, ...results.data])
        })
    }, [page])


    const getPostData = () => {
        axios.get("http://localhost:5000/fbOauth/getPagePosts").then(results => {
            results.data.length && setPosts(old => [old, ...results.data]) && <Redirect to='/FacebookApp'/>
        })
    }

    function onSubmit() {
        setInputField({...inputField, id: page[0].id})
        axios.post("http://localhost:5000/fbOAuth/publishPost", inputField).then(results => {
            results &&
            swal({
                title: `Posted!`,
                text: `Successfully posted on ${page[0].name}!`,
                icon: "success",
                button: "Ok!"
            }) && getPostData();
        })
    }

    function handleSelectChange(event) {
        setoptionsState(event.target.value);
    }

    function logout() {
        axios.delete("http://localhost:5000/fbOAuth/deleteFBSession").then(results => {
            results &&
            swal({
                title: `Sign out!`,
                text: `Successfully Signout from ${page[0].name}!`,
                icon: "success"
            }) && setlogoutout(true)
        })
    }

    return <div>
        <FBDrawer/>
        {logoutout && <Redirect to='/'/>}
        <div className="jumbotron"
             style={{width: "70%", marginLeft: "25%", marginTop: "-2%", backgroundColor: "#EBF4FA"}}>
            <button onClick={logout} type="submit" value="Submit" style={{width: "10%", marginLeft: "90%"}}
                    className="btn btn-primary">
                Logout
            </button>
            <div className="card-body">
                <div className="card-title">
                    <h5 className="card-title" style={{
                        marginLeft: "30%",
                        fontSize: 25,
                        marginTop: "2%",
                        fontFamily: 'Roboto'
                    }}>Welcome {user && user.name}!</h5><br/>
                    <img src={fblogo} height={100} width={100} style={{marginLeft: "1%", marginTop: "-10%"}}/>

                    <br/><br/>
                    <h5 className="card-title" style={{marginLeft: "1%", fontSize: 20, fontFamily: 'Roboto'}}>Create
                        your facebook announcement</h5><br/>
                </div>
                <div className="form-outline">
                    <label className="form-label" htmlFor="form1">Type your message</label>
                    <input type="text"
                           placeholder="Hit your message"
                           id="form1" className="form-control"
                           name="message"
                           onChange={inputsHandler}
                           value={inputField.message}
                    /> <br/>
                    <label className="form-label" htmlFor="form1">Select your group</label>
                    <div className="dropdown" style={{width: "40%", marginLeft: "0%"}}>
                        <select className="form-control" value={optionsState} onChange={handleSelectChange}>
                            {page && true && page.map(option => <option key={option.name}
                                                                        value={option.name}>{option.name}</option>)}
                        </select>
                    </div>
                    <br/><br/>
                    <button onClick={onSubmit} type="submit" value="Submit" style={{width: "20%", marginLeft: "35%"}}
                            className="btn btn-primary">
                        Publish post
                    </button>
                </div>
                <br/>
            </div>
        </div>
        <Row>
            {posts && posts.map(product => (
                <Posts key={product.id} product={product} name={page && page[0].name} deleteData={deleteData}
                       setDeleteData={setDeleteData}/>
            ))}
        </Row>
    </div>;
}

export default FacebookApp;
