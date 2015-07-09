var myDataRef = new Firebase('https://cool-website.firebaseio.com/');
var messages = myDataRef.child("messages")
var accounts = myDataRef.child("account")
$('#messageInput').keypress(function (e) {
  if (e.keyCode == 13) {
    var name = $('#nameInput').val();
    var text = $('#messageInput').val();
    messages.push({name: name, text: text});
    $('#messageInput').val('');
  }
});
messages.on('child_added', function(snapshot) {
  var message = snapshot.val();
  displayChatMessage(message.name, message.text);
});
function displayChatMessage(name, text) {
  $('<p>').text(text).prepend($('<em/>').text(name+': ')).prepend("<br>").appendTo($('#messagesDiv'));
  $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

function start(){
  $("#regSuccess").hide()
  $("#Registry").hide()
  $("#messageScreen").hide()
}
function submit(){
  var username = jQuery("#name").val();
  var password = jQuery("#password").val();

  $("#messageScreen").show()
  $("#logIn").hide()
  $('Header').hide()

  myDataRef.authWithPassword({
    email    : username,
    password : password
  }, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  });

}
function regButton(){
  $("#logIn").hide();
  $("#Registry").show()
}
function reg(){
      var userName = $("#username").val()
      var passWord = $("#password").val()

      myDataRef.createUser({
  email    : userName,
  password : passWord
}, function(error, userData) {
  if (error) {
    console.log("Error creating user:", error);
  } else {
    console.log("Successfully created user account with uid:", userData.uid);
    myDataRef.authWithPassword({
      email    : userName,
      password : passWord
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        window.close()
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  }
});

      accounts.push({userName: userName, passWord: passWord});
      $('#accountInput').val('');

}
