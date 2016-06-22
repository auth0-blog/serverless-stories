var _ = require('lodash');

const RESPONSE = {
  OK : {
    statusCode : 200,
    message: "You have successfully subscribed to the newsletter!",
  },
  DUPLICATE : {
    statusCode : 400,
    message : "You are already subscribed."
  },
  ERROR : {
    statusCode : 400,
    message: "Something went wrong. Please try again."
  }
};

module.exports = function(context, cb){
  var email = context.query.email;

  if(email){
    context.storage.get(function(err, data){
      if(err){
        cb(null, RESPONSE.ERROR);
      }
      console.log(data);
      data = data || [];
      
      exists = _.indexOf(data, email);
      
      if(exists == -1){
        data.push(email);
        context.storage.set(data, function(err){
          if(err){
            cb(null, RESPONSE.ERROR);
          } else {
            cb(null, RESPONSE.OK);
          }
        })
      } else {
        cb(null, RESPONSE.DUPLICATE);
      }
    })
  } else {
    cb(null, RESPONSE.ERROR)
  }
};