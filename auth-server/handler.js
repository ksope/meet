//using strict mode to reduce "sloppyness" of Javascript
"use strict";

//required packages imported
const { google } = require("googleapis");
const calendar = google.calendar("v3");

//scope setup for access levels
const SCOPES = [
    "https://www.googleapis.com/auth/calendar.events.public.readonly",
];

//environment variables set to refer to those defined in the config.json file
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;

//URL users are directed to login with google and receive authorisation code is defined here
const redirect_uris = ["https://ksope.github.io/meet/"];

//new instance of google.auth.OAuth2 method is called and created
const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    redirect_uris[0]
);

module.exports.getAuthURL = async () => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
            authUrl,
        }),
    };
};

//get access token function below
module.exports.getAccessToken = async (event) => {
    // Decode authorization code extracted from the URL query
    const code = decodeURIComponent(`${event.pathParameters.code}`);

    return new Promise((resolve, reject) => {
        /**
         *  Exchange authorization code for access token with a “callback” after the exchange,
         *  The callback in this case is an arrow function with the results as parameters: “error” and “response”
         */

        oAuth2Client.getToken(code, (error, response) => {
            if (error) {
                return reject(error);
            }
            return resolve(response);
        });
    })
        .then((results) => {
            // Respond with OAuth token
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify(results),
            };
        })
        .catch((error) => {
            // Handle error
            return {
                statusCode: 500,
                body: JSON.stringify(error),
            };
        });
};

//function which will pass the access token to the Google Calendar APi and get the calendar events
module.exports.getCalendarEvents = async (event) => {
    //get the access token
    const access_token = decodeURIComponent(
        `${event.pathParameters.access_token}`
    );

    //set the access token as credentials
    oAuth2Client.setCredentials({ access_token });

    return new Promise((resolve, reject) => {
        calendar.events.list(
            {
                calendarId: CALENDAR_ID,
                auth: oAuth2Client,
                timeMin: new Date().toISOString(),
                singleEvents: true,
                orderBy: "startTime",
            },
            (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            }
        );
    })
        .then((results) => {
            // Respond with OAuth token
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({ events: results.data.items }),
            };
        })
        .catch((error) => {
            // Handle error
            return {
                statusCode: 500,
                body: JSON.stringify(error),
            };
        });
};
