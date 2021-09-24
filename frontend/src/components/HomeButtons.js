import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import googleImg from "../asserts/Google.png";
import facebookImg from "../asserts/facebook.png";
import githubImg from "../asserts/github.png";
import linkedinImg from "../asserts/linkedin.png";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%",
    },
  },
  con: {
    maxHeight: "100vh",
    paddingTop: "12%",
    paddingBottom: "12%",
    paddingLeft: "20%",
  },
  cli: {
    border: "none",
    padding: "0",
    background: "none",
  },
  btn: {
    padding: "6%",
  },
  img: {
    boxShadow: "0 8px 15px 0 rgba(0, 0, 0, 0.5)",
    "&:hover": {
      transform: "scale(1.1, 1.1)",
    },
  },
}));

function HomeButtons() {
  const classes = useStyles();
  return (
    <div>
      <Grid className={classes.con} container spacing={0}>
        <Grid className={classes.btn} item xs={6}>
          <button className={classes.cli}>
            <img src={googleImg} className={classes.img} width="100%" alt="" />
          </button>
        </Grid>
        <Grid className={classes.btn} item xs={6}>
          <button className={classes.cli}>
            <img
              src={facebookImg}
              className={classes.img}
              width="100%"
              alt=""
            />
          </button>
        </Grid>
        <Grid className={classes.btn} item xs={6}>
          <button className={classes.cli}>
            <img src={githubImg} className={classes.img} width="100%" alt="" />
          </button>
        </Grid>
        <Grid className={classes.btn} item xs={6}>
          <button className={classes.cli}>
            <img
              src={linkedinImg}
              className={classes.img}
              width="100%"
              alt=""
            />
          </button>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomeButtons;
