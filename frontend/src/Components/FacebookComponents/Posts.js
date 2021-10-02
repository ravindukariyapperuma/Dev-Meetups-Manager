import React, {useState} from 'react';
import Button from 'react-bootstrap/Button'
import {Card} from '@mui/material';
import Col from 'react-bootstrap/Col';
import { CardContent, CardHeader } from '@mui/material';
import Typography from '@mui/material/Typography';
import posts from "./images/posts.png";
import cancel from "./images/cancel.png";
import Moment from 'moment';

import axios from "axios";
import  { Redirect } from 'react-router-dom'
import swal from "sweetalert";

function Posts({product, name, setDeleteData}) {
    const getPostData = () => {
        console.log("eoifjosfi")
        axios.get("http://localhost:5000/fbOauth/getPagePosts").then(results => {
            console.log("RESULT>DATA", results.data)
        })
    }

    const deletePagePost = (postId) => {
        axios.delete('http://localhost:5000/fbOauth/deletePosts', {
            data: {
                id: postId
            }
        }).then(results => {
            console.log("REST", results)
        }) && swal({
            title:`Deleted!`,
            text:`Successfully deleted your post!`,
            icon:"success"
        }) && window.location.reload();
    }

    return(
        <Col xs={3} key={product.id} >
            <Card style={{ width: '100rem'}}>
                <CardContent>
                    <img src={cancel} height={20} width={20}  style={{marginLeft: "1%", marginBottom:"0%", textAlign:"center"}} onClick={() => deletePagePost(product.id)}/>
                    <img src={posts} height={80} width={100} style={{marginLeft: "1%", marginBottom:"0%", textAlign:"right"}} /> <br/><br/>
                    <Typography sx={{ fontSize: 12 }} style={{marginLeft:"2%"}} color="text.secondary" gutterBottom>
                       Page Name : {name}
                    </Typography>
                    <Typography fontSize={14} style={{marginLeft:"2%"}}>
                        Message : {product.message}
                    </Typography>
                    <Typography fontSize={14} style={{marginLeft:"2%"}}>
                        Created time : {Moment(product.created_time).format('YYYY-MM-DD HH:mm')}
                    </Typography>
                </CardContent>
            </Card>
        </Col>
    )
}

export default Posts;