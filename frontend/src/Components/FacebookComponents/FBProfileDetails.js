import React, {useState, useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {makeStyles} from "@material-ui/core/styles";

const axios = require("axios");

const StyledBadge = styled(Badge)(({theme}) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const useStyles = makeStyles((theme) => ({
    rootDiv: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

    },
    text: {
        textAlign: "center",
    },
    textsub: {
        textAlign: "center"
    },
    email: {
        fontSize: 12,
    }
}));


function GoogleProfileDetails() {
    const classes = useStyles();
    const [user, setUser] = React.useState({});
    useEffect(() => {
        axios.get('http://localhost:5000/fbOAuth/userInfo')
            .then(function (response) {
                if (response.data.message === "Access token is expired.") {
                    console.log("Access token is expired.")
                } else {
                    setUser(response.data)
                    console.log(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <Stack direction="row" spacing={0} className={classes.rootDiv}>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    variant="dot"
                >
                    <Avatar alt="Remy Sharp" src={user.picture} sx={{width: 100, height: 100}}/>
                </StyledBadge>
            </Stack>
            <Typography className={classes.email}>
                {user.name}
            </Typography>
            <br/>
        </div>
    );
}

export default GoogleProfileDetails
