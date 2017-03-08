var http = require('http'),
    express = require('express'),
    twilio = require('twilio'),
    bodyParser = require('body-parser');

var dotenv = require('dotenv');
dotenv.load();

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

var prompt = require('prompt-sync')();
var ConversationV1 = require('watson-developer-cloud/conversation/v1');

var conversation = new ConversationV1({
  username: process.env.CONVERSATION_USERNAME,
  password: process.env.CONVERSATION_PASSWORD,
  path: {
    workspace_id: process.env.WORKSPACE_ID },
  version_date: '2017-02-03'
});

var storageUnit = {}

app.post('/sms', function(req, res) {
    var twilio = require('twilio');
    var twiml = new twilio.TwimlResponse();

    console.log('this is storageUnit',storageUnit)

    conversation.message({
    input: {'text': req.body.Body},
    context: storageUnit
    }, function(err, response) {

        storageUnit = response.context
        twiml.message(response.output.text[0])
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    })
});

http.createServer(app).listen(1337, function () {
    console.log("Express server listening on port 1337");
});