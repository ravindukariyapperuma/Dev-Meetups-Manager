const request = require("request");
const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const Session = require('express-session');
const {google} = require('googleapis');
const fs = require('fs');
const formidable = require('formidable')
const credentials = require('./googlecredentials.json');
// const TOKEN_PATH = require('./token.json');
const cookieParser = require('cookie-parser');
const multer = require("multer");
const moment = require('moment')
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

const client_id = credentials.web.client_id;
const client_secret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(client_id,client_secret,redirect_uris[0]);


app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());


const SCOPE = ["https://www.googleapis.com/auth/userinfo.profile","https://www.googleapis.com/auth/drive.file" ,"https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/calendar.events","https://www.googleapis.com/auth/drive"];





exports.getAuthUrlService = (req,res)=>{
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type:"offline",
        scope:SCOPE,
    });
 
   console.log(authUrl);
   return res.redirect( `${authUrl}`);
  
 };

exports.OauthService = (req,res)=>{
 
    var session = req.session;
    var code =  req.query.code;
    console.log('code=='+code);
    oAuth2Client.getToken(code,function(err,tokens){
        if(!err){
            
          oAuth2Client.setCredentials(tokens)       
          const encryptedtoken = cryptr.encrypt(JSON.stringify(tokens));  
          localStorage.setItem('token',encryptedtoken);
          res.redirect(`http://localhost:3000/GoogleApp`)
        }
        else{
            res.send(`
            <h3>Login failed!!</h3>
        `);
        }
    });

};


exports.googleCreateEventService = (req,res)=>{

  
    oAuth2Client.setCredentials(JSON.parse(cryptr.decrypt(localStorage.getItem('token'))));
   
      
    const  summary = req.body.summary;
    const  location = req.body.location;
    const  description = req.body.description;
    const  startDateTime = req.body.startDateTime;
    const  startDateTimeTimezone = req.body.startDateTimeTimezone;
    const  endDateTime = req.body.endDateTime;
    const endDateTimeTimezone = req.body.endDateTimeTimezone;
    const email = req.body.email;
  
  
    const calendar = google.calendar({version:'v3',oAuth2Client})
    var event = {
      summary: summary ,
      location: location,
      description:description,
      start: {
        dateTime:moment().utcOffset(startDateTime),
    
        timeZone: startDateTimeTimezone
      },
      end: {
        dateTime:  moment().utcOffset(endDateTime),
        timeZone: endDateTimeTimezone
      },
     
      attendees: [{ email: email  }]
    };
  
    calendar.events.insert(
      {
        auth: oAuth2Client,
        calendarId: 'primary',
        resource: event
      },
      function(err, event) {
        if (err) {
          console.log(
            'There was an error contacting the Calendar service: ' + err
          );
          return;
        }
        console.log('Event created: %s', event.data.htmlLink);
      }
    );
  };

  exports.googleDriveUpload = (req,res)=>{

    oAuth2Client.setCredentials(JSON.parse(cryptr.decrypt(localStorage.getItem('token'))));
  
        const drive = google.drive({ version: "v3",auth:oAuth2Client  });
        const fileMetadata = {
          name: req.file.filename,
        };
        const media = {
          mimeType: req.file.mimetype,
          body: fs.createReadStream(req.file.path),
        };
        drive.files.create({
          resource: fileMetadata,
          media: media,
          fields: 'id'
        }, function (err, file) {
          if (err) {
            // Handle error
            console.error(err);
            console.log('failed')
          } else {
            console.log('File Id: ', file.id);
          }
        });
  };
  
  
  
