const request = require("request");
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.ZOOM_CRYPTR_SECRET);

module.exports = {
  RequestUserAuthorization: async (req, res, next) => {
    try {
      const url =
        "https://zoom.us/oauth/authorize?response_type=code&client_id=" +
        process.env.ZOOM_CLIENT_ID +
        "&redirect_uri=" +
        process.env.ZOOM_REDIRECT_URL +
        "&state=" +
        process.env.ZOOM_STATE;
      console.log("🔒 User Authorization Request URL: ", url);

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
      console.log("📇 Authorization Code Response: ", req.originalUrl);
      let url =
        "https://zoom.us/oauth/token?grant_type=authorization_code&code=" +
        req.query.code +
        "&redirect_uri=" +
        process.env.ZOOM_REDIRECT_URL;
      console.log("🔖 RequestAccessToken: ", url);
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
      const encryptedZoomRefreshToken =
        localStorage.getItem("zoomRefreshToken");
      const refresh_token = cryptr.decrypt(encryptedZoomRefreshToken);

      const options = {
        method: "POST",
        url:
          "https://zoom.us/oauth/token?refresh_token=" +
          refresh_token +
          "&grant_type=refresh_token",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          authorization: "Basic " + process.env.ZOOM_BASE64IDS,
        },
        json: true,
      };
      request(options, function (error, response, body) {
        if (error) {
          console.log("🐞 API Response Error: ", error);
        } else {
          console.log("🔭 Refresh token rsponse body: ", body);

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
        }
      });
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

  CreateMeeting: async (req, res, next) => {
    try {
      console.log("🎥 Meeting Create Request Body: ", req.body);
      const encryptedZoomAccessToken = localStorage.getItem("zoomAccessToken");
      const access_token = cryptr.decrypt(encryptedZoomAccessToken);
      const options = {
        method: "POST",
        url: "https://api.zoom.us/v2/users/me/meetings",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
        body: {
          topic: req.body.topic,
          type: 2,
          start_time: req.body.datetime,
          password: req.body.password,
          agenda: req.body.description,
          settings: {
            host_video: false,
            participant_video: false,
            join_before_host: false,
            mute_upon_entry: true,
            use_pmi: false,
            approval_type: 0,
          },
        },
        json: true,
      };
      request(options, function (error, response, body) {
        if (error) {
          console.log("🐞 API Response Error: ", error);
        } else {
          console.log("🔭 Meeting create rsponse body: ", body);
          res.send(body);
        }
      });
    } catch (error) {
      res.send(error);
    }
  },

  GetAllMeetings: async (req, res, next) => {
    try {
      const encryptedZoomAccessToken = localStorage.getItem("zoomAccessToken");
      const access_token = cryptr.decrypt(encryptedZoomAccessToken);
      request
        .get(
          "https://api.zoom.us/v2/users/me/meetings",
          (error, response, body) => {
            if (error) {
              console.log("🐞 API Response Error: ", error);
            } else {
              body = JSON.parse(body);
              // Display response in console
              console.log("API call ", body);
              res.json(body);
            }
          }
        )
        .auth(null, null, true, access_token);
    } catch (error) {
      res.send(error);
    }
  },

  DeleteMeeting: async (req, res, next) => {
    try {
      const encryptedZoomAccessToken = localStorage.getItem("zoomAccessToken");
      const access_token = cryptr.decrypt(encryptedZoomAccessToken);
      const id = req.params.id;
      console.log(id);
      request
        .delete(
          "https://api.zoom.us/v2/meetings/" + id,
          (error, response, body) => {
            if (error) {
              console.log("🐞 API Response Error: ", error);
            } else {
              res.send("deleted");
            }
          }
        )
        .auth(null, null, true, access_token);
    } catch (error) {
      res.send(error);
    }
  },

  GetAllChannels: async (req, res, next) => {
    try {
      const encryptedZoomAccessToken = localStorage.getItem("zoomAccessToken");
      const access_token = cryptr.decrypt(encryptedZoomAccessToken);
      request
        .get(
          "https://api.zoom.us/v2/chat/users/me/channels",
          (error, response, body) => {
            if (error) {
              console.log("🐞 API Response Error: ", error);
            } else {
              body = JSON.parse(body);
              // Display response in console
              console.log("API call ", body);
              res.json(body);
            }
          }
        )
        .auth(null, null, true, access_token);
    } catch (error) {
      res.send(error);
    }
  },

  CreateChannel: async (req, res, next) => {
    try {
      console.log("🎥 Meeting Create Request Body: ", req.body);
      const encryptedZoomAccessToken = localStorage.getItem("zoomAccessToken");
      const access_token = cryptr.decrypt(encryptedZoomAccessToken);
      const options = {
        method: "POST",
        url: "https://api.zoom.us/v2/chat/users/me/channels",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
        body: {
          name: req.body.name,
          type: 2,
        },
        json: true,
      };
      request(options, function (error, response, body) {
        if (error) {
          console.log("🐞 API Response Error: ", error);
        } else {
          console.log("🔭 Meeting create rsponse body: ", body);
          const meetingID = body.id;
          const options = {
            method: "POST",
            url: "https://api.zoom.us/v2/chat/users/me/messages",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${access_token}`,
            },
            body: {
              message: "This is auto genarated message from dev mettups manager",
              to_channel: meetingID,
            },
            json: true,
          };
          request(options, function (error, response, msgbody) {
            if (error) {
              console.log("🐞 API Response Error: ", error);
            } else {
              console.log("🔭 Message send rsponse body: ", msgbody);
              res.send(body);
            }
          });
        }
      });
    } catch (error) {
      res.send(error);
    }
  },

  DeleteChannel: async (req, res, next) => {
    try {
      const encryptedZoomAccessToken = localStorage.getItem("zoomAccessToken");
      const access_token = cryptr.decrypt(encryptedZoomAccessToken);
      const id = req.params.id;
      console.log(id);
      request
        .delete(
          "https://api.zoom.us/v2/chat/users/me/channels/" + id,
          (error, response, body) => {
            if (error) {
              console.log("🐞 API Response Error: ", error);
            } else {
              res.send("deleted");
            }
          }
        )
        .auth(null, null, true, access_token);
    } catch (error) {
      res.send(error);
    }
  },
};
