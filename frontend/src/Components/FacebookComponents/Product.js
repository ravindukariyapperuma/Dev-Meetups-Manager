import React from 'react';
import Button from 'react-bootstrap/Button'
import {Card} from '@mui/material';
import Col from 'react-bootstrap/Col';
import { CardContent, CardHeader } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import image from './images/sample.png'
const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);
function Product({product, name}) {
    return(
        <Col xs={2} md={2} lg={2} key={product.id}>
            <Card style={{ width: '30rem', height:'20rem'}}>
                <CardHeader></CardHeader>
                <CardContent>
                    <CardHeader>{product.message}sefsefsefsef</CardHeader>
                </CardContent>
                <CardMedia
                    component="img"
                    image= {image}
                    height={30}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography sx={{ fontSize: 5 }} color="text.secondary" gutterBottom>
                       Page Name : {name}
                    </Typography>
                    <Typography fontSize={40}>
                        Page Message : {product.message}
                    </Typography>
                </CardContent>
            </Card>
        </Col>
    )
}

export default Product;