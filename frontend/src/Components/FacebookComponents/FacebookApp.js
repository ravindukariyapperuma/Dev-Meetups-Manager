import React, {useEffect, useState} from "react";
import axios from 'axios';
import {FormControl, InputLabel} from "@mui/material";
function FacebookApp() {

  const [page, setPage] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    user === undefined && axios.get("http://localhost:5000/fbOAuth/userInfo").then(results => {
          console.log("RESDSS", results)
          results.data && setUser(results.data)
        })

    console.log("USER", user)
  }, [])
  function activateLasers() {
    console.log("EOFIJOEIFJFE")
    axios.get("http://localhost:5000/fbOAuth/getPageInfo").then(results => {
      console.log("RES", results)
      setPage([...results.data.data])
    })
  }

  return <div>
<h1>
  Hi { user && user.name}
</h1>
<button
    onClick={() =>activateLasers()}>
  Activate Lasers
</button>
  </div>;
}

export default FacebookApp;
