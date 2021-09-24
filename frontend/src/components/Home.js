import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import banner from "../asserts/back1.png";
import HomeButtons from "./HomeButtons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%",
    },
  },
  img: {
    height: "100%",
  },
  Gitem: {
    maxHeight: "100vh",
  },
  Gitem2: {
    maxHeight: "100vh",
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    paddingRight: "3%",
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid className={classes.Gitem} item xs={6}>
          <img src={banner} className={classes.img} alt="" />
        </Grid>
        <Grid className={classes.Gitem2} item xs={6}>
          <HomeButtons />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
