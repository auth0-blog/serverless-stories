var lock = new Auth0Lock('YOUR-AUTH0-CLIENT-ID', 'YOUR-AUTH0-DOMAIN.auth0.com');

$(document).ready(function(){
  updateAuthenticationStatus();
  loadAdmin();
});
function logout(){
  localStorage.removeItem('profile');
  localStorage.removeItem('token');
  updateAuthenticationStatus();
};
function login(){
  lock.show(function(err, profile, id_token) {
    if (err) {
      return alert(err.message);
    }
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('token', id_token);
    updateAuthenticationStatus();
  });
};

function updateAuthenticationStatus(){
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

function loadAdmin(){
  if(window.location.pathname == '/admin/'){
    if(localStorage.getItem('token')){
      $.ajax({
        type : 'GET',
        url : 'https://webtask.it.auth0.com/api/run/wt-kukicadnan-gmail_com-0/newsletter-complex/subscribers?webtask_no_cache=1',
        headers : {
          Authorization : 'Bearer ' + localStorage.getItem('token')
        }
      }).done(function(data) {
        for(var i = 0; i < data.length; i++){
          $('#subscribers').append('<h4>' + data[i] + '</h4>');
        }
      });
    } else {
      window.location = '/';
    }
  }
}

$('#newsletter').submit(function(e){
  $.ajax({
    type : 'POST',
    url : 'https://webtask.it.auth0.com/api/run/wt-kukicadnan-gmail_com-0/newsletter-complex/subscribe?webtask_no_cache=1',
    data : {email : $('#email').val()},
    dataType    : 'json',
    headers : {
      Authorization : 'Bearer ' + localStorage.getItem('token')
    }
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
    url : 'https://webtask.it.auth0.com/api/run/wt-kukicadnan-gmail_com-0/tips?access_token=' + localStorage.getItem('token'),
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