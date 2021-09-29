const request = require("request");
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.ZOOM_CRYPTR_SECRET);

module.exports = {
  RequestUserAuthorization: async (req, res, next) => {
    try {
      res.redirect(
        "https://zoom.us/oauth/authorize?response_type=code&client_id=" +
          process.env.ZOOM_CLIENT_ID +
          "&redirect_uri=" +
          process.env.ZOOM_REDIRECT_URL +
          "&state=" +
          process.env.ZOOM_STATE
      );
    } catch (error) {
      res.send(error);
    }
  },

  RequestAccessToken: async (req, res, next) => {
    try {
      console.log("📇 Request Query", req.query);
      let url =
        "https://zoom.us/oauth/token?grant_type=authorization_code&code=" +
        req.query.code +
        "&redirect_uri=" +
        process.env.ZOOM_REDIRECT_URL;

      request
        .post(url, (error, response, body) => {
          body = JSON.parse(body);

          console.log("📮 response:", body);
          console.log(`🔑 access_token: ${body.access_token}`);
          console.log(`🔐 refresh_token: ${body.refresh_token}`);

          const encryptedZoomAccessToken = cryptr.encrypt(body.access_token);
          const encryptedZoomRefreshToken = cryptr.encrypt(body.refresh_token);
          localStorage.setItem("zoomAccessToken", encryptedZoomAccessToken);
          localStorage.setItem("zoomRefreshToken", encryptedZoomRefreshToken);

          if (body.access_token) {
            res.redirect("http://localhost:3000/zoomApp");
          } else {
            res.send("Empty access token");
          }
        })
        .auth(process.env.ZOOM_CLIENT_ID, process.env.ZOOM_CLIENT_SECRET);
      return;
    } catch (error) {
      res.send(error);
    }
  },

  RefreshAccessToken: async (req, res, next) => {
    try {
    } catch (error) {
      res.send(error);
    }
  },

  GetUserData: async (req, res, next) => {
    try {
      const encryptedZoomAccessToken = localStorage.getItem("zoomAccessToken");
      const access_token = cryptr.decrypt(encryptedZoomAccessToken);
      request
        .get("https://api.zoom.us/v2/users/me", (error, response, body) => {
          if (error) {
            console.log("🐞 API Response Error: ", error);
          } else {
            body = JSON.parse(body);
            console.log("🧑 User Data: ", body);
            res.send(body);
          }
        })
        .auth(null, null, true, access_token);
    } catch (error) {
      res.send(error);
    }
  },
};
