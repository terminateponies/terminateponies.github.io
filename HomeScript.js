var myDataRef = new Firebase('https://cool-website.firebaseio.com/');
var messages = myDataRef.child("messages")
var accounts = myDataRef.child("account")
$('#messageInput').keypress(function (e) {
  if (e.keyCode == 13) {

    var text = $('#messageInput').val();
    messages.push({name: chatName, text: text});
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
  $('enterName').hide()
  $('NameScreen').hide()
  $('#pickName').hide()
}
function submit(){
  var username = jQuery("#name").val();
  var password = jQuery("#loginPassword").val();


  myDataRef.authWithPassword({
    email    : username,
    password : password
  }, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
      $('#loginfailed').show();

    } else {
      console.log("Authenticated successfully with payload:", authData);
      $('#success').show();

      $('NameScreen').show()
      $("#messageScreen").hide()
      $("#logIn").hide()
      $('Header').hide()
      $('#pickName').show()
      $('enterName').show()
    }
  });

}
function regButton(){
  $("#logIn").hide();
  $("#Registry").show();
}
function reg() {
      var userName = $("#username").val()
      var passWord = $("#password").val()

      myDataRef.createUser({
        email    : userName,
        password : passWord
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
          $('#register-error').show();
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          myDataRef.authWithPassword({
            email    : userName,
            password : passWord
          }, function(error, authData) {
            if (error) {
              console.log("Login Failed!", error);
            } else {
              console.log("Authenticated successfully with payload:", authData);
            }
          });
        }
      });

      // account.push({userName: userName, passWord: passWord});
      // $('#accountInput').val('');

}

var chatName = ""
function enterChat(){
  chatName = $("#enterName").val()
  $('NameScreen').hide()
  $('#messageScreen').show()
}
