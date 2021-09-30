const request = require("request");
const axios = require('axios');
const {getUserInfo} = require("./facebook.services");

module.exports = {
    getFBAuthCode : async (req, res) => {
        res.redirect(
            "https://www.facebook.com/v12.0/dialog/oauth?response_type=code&client_id=" +
            process.env.clientID +
            "&redirect_uri=" +
            process.env.callbackURL +
            "&state=" +
            process.env.state
        );
    },

    RequestAccessToken : async (req, res) => {
        try {
            let url =
                "https://graph.facebook.com/v12.0/oauth/access_token?client_id=" +
                process.env.clientID +
                "&redirect_uri=" +
                process.env.callbackURL +
                "&client_secret=" +
                process.env.clientSecret +
                "&code=" +
                req.query.code;
            const result = await axios.get(url);
            const {access_token} = result.data
            localStorage.setItem("fbToken", access_token)
            if (access_token) res.redirect("http://localhost:3000/FacebookApp");
        }catch (e) {
            res.send(e)
        }
    },

    getPageInfo : async (req, res) => {
        try {
            const userInfo = await axios.get("http://localhost:5000/fbOAuth/userInfo");
            const id = userInfo.data.id
            const token = localStorage.getItem("fbToken")
            const url = "https://graph.facebook.com/" +
                id +
                "/accounts?fields=name,access_token&access_token=" +
                token
            const result = await axios.get(url)
            localStorage.setItem("PageInfo", JSON.stringify(result.data.data))
            result.status === 200 ? res.send({data: result.data.data}) : res.send(404)
        }catch (e) {
            res.send(e)
        }
    },

    getUserInfo : async ( req, res) => {
        try{
            const token = localStorage.getItem("fbToken")
            console.log("FERFEF", token)
            const url =
                "https://graph.facebook.com/me?access_token=" +
                token
            const result = await axios.get(url);
            const {name, id} = result.data;
            result.status === 200 ? res.send({id: id, name: name}) : res.send(404)
        }catch (e) {
            res.send(e)
        }
    },

    publishPost : async (req, res) => {
        try{
            const publishPageId = req.body.id
            const content = req.body.message
            await axios.get("http://localhost:5000/fbOAuth/getPageInfo");
            const data = JSON.parse(localStorage.getItem("PageInfo"));
            data.filter(x => x.id = publishPageId);

            const url = "https://graph.facebook.com/" +
                publishPageId+
                "/feed?message="+
                content +
                "&access_token="+
                data[0].access_token
            const result = await axios.post(url);
            result.status === 200 ? res.send(result.status) : res.send(404)
        }catch (e) {
            res.send(e)
        }
    }
}
