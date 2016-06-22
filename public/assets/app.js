var lock = new Auth0Lock('YOUR-AUTH0-CLIENT-ID', 'YOUR-AUTH0-DOMAIN.auth0.com');

$(document).ready(function(){
  getUser();
});
function logout(){
  localStorage.removeItem('profile');
  localStorage.removeItem('token');
  getUser();
};
function login(){
  lock.show(function(err, profile, id_token) {
    if (err) {
      return alert(err.message);
    }
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('token', id_token);
    getUser();
  });
};

function getUser(){
  $('#user').empty();
  $('#login').empty();
  var user = localStorage.getItem('profile');
  if(user){
    user = JSON.parse(user);
    $('#user').show().append('<a onclick="logout()">' + user.email + ' (Log out)</a>');
    $('#login').hide();
  } else {
    $('#login').show().append('<a onclick="login()">Log in</a>');
    $('#user').hide();
  }
}

$('#newsletter').submit(function(e){
  $.ajax({
    type : 'GET',
    url : 'https://webtask.it.auth0.com/api/run/{YOUR-WEBTASK-ACCOUNT}/newsletter?email=' + $('#email').val()
  }).done(function(data) {
    if(data.statusCode == 200){
      $('#newsletter').hide();
      $('#response').append('<div class="alert alert-success">'+ data.message +'</div>')
    } else {
      $('#newsletter').hide();
      $('#response').append('<div class="alert alert-danger">'+ data.message +'</div>')
    }
  });
  e.preventDefault();
})

$('#tip').submit(function(e){
  $.ajax({
    type : 'POST',
    url : 'https://webtask.it.auth0.com/api/run/{YOUR-WEBTASK-ACCOUNT}/tips?access_token=' + localStorage.getItem('token'),
    data : {message : $('#message').val()},
    dataType    : 'json'
  }).done(function(data) {
    $('#response').empty();
    if(data.statusCode == 200){
      $('#tip').hide();
      $('#response').append('<div class="alert alert-success">'+ data.message +'</div>')
    } else {
      $('#tip').hide();
      $('#response').append('<div class="alert alert-danger">'+ data.message +'</div>')
    }
  }).error(function(data){
    $('#response').empty();
    if(data.status == 401){
      $('#response').append('<div class="alert alert-danger">You must be logged in to submit tips. :(</div>')
    }
  });
  e.preventDefault();
})