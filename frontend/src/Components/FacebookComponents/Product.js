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
        <Col xs={12} md={6} lg={2} key={product.id}>
            <Card style={{ width: '20rem' }}>
                <CardHeader></CardHeader>
                <CardContent>
                    <CardHeader>{product.message}sefsefsefsef</CardHeader>
                </CardContent>
                <CardMedia
                    component="img"
                    height="194"
                    image= {image}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                       Page Name : {name}
                    </Typography>
                    <Typography variant="body2">
                        Page Message : {product.message}
                    </Typography>
                </CardContent>
            </Card>
        </Col>
    )
}

export default Product;