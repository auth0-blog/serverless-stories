var app = new (require('express'))();
var wt = require('webtask-tools');
var client = require('twilio')('YOUR-TWILIO-ACCOUNT-SID', 'YOUR-TWILIO-AUTH-TOKEN');

const RESPONSE = {
  OK : {
    statusCode : 200,
    message: "Tip successfully sent! Thank you!",
  },
  ERROR : {
    statusCode : 400,
    message: "Something went wrong. Please try again."
  }
};

app.post('/', function (req, res) {
    var body = req.webtaskContext.body;
    if(body.message){
        client.sendMessage({
          to:'PHONE-NUMBER-YOU-WANT-TO-RECEIVE-MESSAGE',
          from: 'YOUR-TWILIO-PHONE-NUMBER', 
          body: body.message
        }, function(err, responseData) {
          if(!err){
            res.end(JSON.stringify(RESPONSE.OK));
          } else {
            res.end(JSON.stringify(RESPONSE.ERROR));
          }
        });
    } else {
      res.end(JSON.stringify(RESPONSE.ERROR));
    }
});

module.exports = wt.fromExpress(app).auth0();