function submit(){
  var username = jQuery("#name");
  var password = jQuery("#password");
  var uservalue = username.val();
  var passvalue = password.val();

if (uservalue == "terminateponies") {
  if (passvalue == "Bongo123456")

 window.open("HomePage.html");

  console.log("Access Granted");

  }
  else {
    console.log("Incorrect Username Or Password")
    $("#wrong").text("Incorrect Username Or Password");
    

  }

}
