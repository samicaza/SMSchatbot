// Twilio Credentials
var accountSid = process.env.ACCOUNTSID;
var authToken = process.env.AUTHTOKEN;

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

client.messages.create({
    to: process.env.MYNUMBER,
    from: process.env.TWILIONUMBER,
    body: "This is the ship that made the Kessel Run in fourteen parsecs?",
}, function(err, message) {
    console.log(message.sid);
});