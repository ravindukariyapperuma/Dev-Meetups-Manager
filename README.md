# Dev Meetups Manager

<img src="https://i.postimg.cc/nVSPDxt1/logoicon1.jpg" width="15%">

The Dev-Meetups-Manager makes it easier to manage meetups. When organizing a meetup, this allows you to create google calendar event, upload files to the google drive, create and delete zoom meetings and zoom chat channels, upload facebook posts, create github repositories. After you can share created meeting resource among the members attending the meetup. With the help of the Dev-Meetups-Manager application, event organizers can easily manage event calendar, online meetings, GitHub repositories for their events, and performing facebook social media campaigns for their events. The Dev Meetups Manager application uses the OAuth 2.0 authentication framework to gain access to **Google**, **Zoom**, **Facebook** and **GitHub** resources through the API.
<br/>
<br/>
<img src="https://i.postimg.cc/hGSj66tf/Screenshot-2021-10-02-204451.png" width="100%">

## To access the google OAuth APIs
1. Go to https://console.developers.google.com and create an OAuth app to get a `client_id`, `project_id` and `client_secret`.
2. Create a `googlecredentials.json` (if it is not existing) file in the `Dev-Meetups-Manager\backend\services\Googleservices` folder and add `client_id`, `project_id` and `client_secret`.
3. When creating the app, add the google scope that you want to access OAuth APIs

`googlecredentials.json` file template:
```
{"web":
{"client_id":"",
"project_id":"",
"auth_uri":"https://accounts.google.com/o/oauth2/auth",
"token_uri":"https://oauth2.googleapis.com/token",
"auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
"client_secret":"",
"redirect_uris":["http://localhost:5000/googleOAuth/oauth"]}}
```

Scops:
`["https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile","https://www.googleapis.com/auth/drive.file" ,"https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/calendar.events","https://www.googleapis.com/auth/drive"];`

## To access the zoom OAuth APIs
1. Go to https://marketplace.zoom.us/ and create an OAuth app to get a client id and client secret.
2. Create a .env (if it is not existing) file in the backend root file and add client id and client secret.
3. When creating the app, add the zoom scope that you want to access OAuth APIs

Scops:
`chat_channel:read` `chat_channel:write` `chat_contact:read` `chat_message:read` `chat_message:write` `meeting:read` `meeting:write` `user:read` `user:write`

`.env` file template:
```
ZOOM_CLIENT_ID=
ZOOM_CLIENT_SECRET=
ZOOM_REDIRECT_URL=http%3A%2F%2Flocalhost%3A5000%2FzoomOAuth%2Fredirect
ZOOM_STATE=
ZOOM_CRYPTR_SECRET=
ZOOM_BASE64IDS=
```
- You can add any string for the `ZOOM_STATE` and `ZOOM_CRYPTR_SECRET`. 

- `ZOOM_BASE64IDS` is Client ID and Client Secret with a colon : in between, Base64 Encoded. For example, `Client_ID:Client_Secret` [Base64 Encoded](https://www.base64encode.org/) is `Q2xpZW50X0lEOkNsaWVudF9TZWNyZXQ=`.

## To access the facebook OAuth APIs
1. Go to https://developers.facebook.com and create an OAuth app to get a client id and secret id.
2. Create a .env (if it is not existing) file in the backend root file and add client id and secrect id.
3. Add the facebook scope that you want to access OAuth APIs

`.env` file template:
```
clientID=
clientSecret=
callbackURL=http://localhost:5000/fbOauth/redirect
PORT=5000
FB_AUTH_SCOPE="pages_show_list, pages_manage_engagement, pages_manage_posts, pages_read_engagement"
```

## To access the github OAuth APIs
1. Login to the github account and navigate to deveoper settings in the settigs section and create a new app and get client id and client secret.
2. Create a .env (if it is not existing) file in the backend root file and add client id and secrect id.

`.env` file template:
```
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

## Run backend

Open terminal in inside the `Dev-Meetups-Manager\backend` folder

1. Run this command to the install packages
```
npm install
```

2. Run this command to the start project
```
npm start
```
## Run frontend

Open terminal in inside the `Dev-Meetups-Manager\frontend` folder
1. Run this command to the install packages
```
npm install
```

2. Run this command to the start project
```
npm start
```
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Technologies
- `JavaScript`
- `NodeJS`
- `ReactJS`

## Members Details

| Team Role | Student Number | Student Name | Email |
| ------------- | ------------- | ------------- | ------------- |
| Member 1 | **IT18121834**  | **Jayasekara A.S** | it18121834@my.sliit.lk |
| Member 2 | **IT18126020** | **Ranjith K.H.V.S** | 18126020@my.sliit.lk |
| Member 3 | **IT18115444** | **Ratnasooriya K.A.L.L.** | it18115444@my.sliit.lk |
| Member 4 | **IT18121766** | **Kariyapperuma.K.A.D.R.L.** | it18121766@my.sliit.lk |

**Team ZeroBugs** All Rights Reserved
