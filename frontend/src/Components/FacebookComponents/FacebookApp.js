import React, {useEffect} from "react";
import axios from 'axios';

function FacebookApp() {
  useEffect(() => {
    axios.get("http://localhost:5000/auth/facebook").then(r => console.log("RR", r))
  })
  return <div>
<button>
  slef,
</button>
  </div>;
}

export default FacebookApp;
