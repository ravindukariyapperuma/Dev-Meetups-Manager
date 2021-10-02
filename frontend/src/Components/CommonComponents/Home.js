import React from "react";
// import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';

import banner from "../../Asserts/logo.gif";
import googleImg from "../../Asserts/G1.png";
import zoomImg from "../../Asserts/Z1.png";
import facebookImg from "../../Asserts/F1.png";
import githubImg from "../../Asserts/GH1.png";
const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    boxShadow: "0 8px 15px 0 rgba(0, 0, 0, 0.5)",
    marginTop: theme.spacing(7),
    padding: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  gridLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#aaa"
  },
  gridRight: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#614c87",

  },
  container: {
    width: "100%",
  },
  containerRight: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2%",
  },
  link: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    boxShadow: "0 8px 15px 0 rgba(0, 0, 0, 0.5)",
    "&:hover": {
      transform: "scale(1.05, 1.05)",
    },
  },
  cli: {
    border: "none",
    padding: "0",
    background: "none",
  },
}));

function Home() {
  const classes = useStyles();

//   const handleChangeZoomLoginButton = () => {
//     axios({
//         method: 'get',
//         url: 'http://localhost:5000/ZoomApp/',
//       });
//     }

  return (
    <Container component="main" className={classes.container}>
      <div className={classes.paper}>
        <div className={classes.card}>
          <Grid container spacing={0}>
            <Grid className={classes.gridLeft} item xs={6}>
              <img src={banner} width="100%" />
            </Grid>
            <Grid className={classes.gridRight} item xs={6}>
              <Grid container spacing={0}>
              
                <Grid item className={classes.containerRight} xs={12}>
                <a className={classes.link} href="/">
                    <img
                      src={googleImg}
                      className={classes.buttons}
                      width="65%"
                    />
                  </a>
                </Grid>
                <Grid item className={classes.containerRight} xs={12}>
                <a className={classes.link} href="http://localhost:5000/zoomOAuth/">
                    <img
                      src={zoomImg}
                      className={classes.buttons}
                      width="65%"
                    />
                  </a>
                </Grid>
                <Grid item className={classes.containerRight} xs={12}>
                <a className={classes.link} href="http://localhost:5000/auth/facebook">
                    <img
                      src={facebookImg}
                      className={classes.buttons}
                      width="65%"
                    />
                  </a>
                </Grid>
                <Grid item className={classes.containerRight} xs={12}>
                <a className={classes.link} href="http://localhost:5000/github/">
                    <img
                      src={githubImg}
                      className={classes.buttons}
                      width="65%"
                    />
                  </a>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
}

export default Home;
