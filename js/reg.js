var empty_error = "Please fill all the fields";
var fname_error = "Invalid First Name";
var lname_error = "Invalid Last Name";
var email_error = "Invalid Email";

function validation(fname, lname, email){
  var isgood = true;
  if(fname.value == "" || lname.value == "" || email.value == ""){
    alert(empty_error);
    isgood = false;
    return isgood;
  }
  if(fname.value.length <= 1){
    alert(fname_error)
    isgood = false
    return isgood
  }
  if(lname.value.length <= 1){
    alert(lname_error)
    isgood = false
    return isgood
  }
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re.test(email.value.toLowerCase())){
    alert(email_error)
    isgood = false
    return isgood
  }
  return isgood;
}

function date(){
  phone_field = document.getElementById("phone");
  alert("hello");
}

function save_info(){
  fname_field = document.getElementById("first_name");
  lname_field = document.getElementById("last_name");
  email_field = document.getElementById("email");
  var isgood = validation(fname_field, lname_field, email_field);
}