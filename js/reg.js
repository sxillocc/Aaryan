var empty_error = "Please fill all the fields";
var fname_error = "Invalid First Name";
var lname_error = "Invalid Last Name";
var email_error = "Invalid Email";
var date_error = "Invalid Date"

function validation(fname, lname, email){
  var isgood = true;
  //empty_field validation
  if(fname.value == "" || lname.value == "" || email.value == ""){
    alert(empty_error);
    isgood = false;
    return isgood;
  }
  //name validation
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
  //email validation
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re.test(email.value.toLowerCase())){
    alert(email_error)
    isgood = false
    return isgood
  }
  //date validation
  isgood = validate_date(date_field.value)
  if(!isgood){
    alert(date_error)
    return false
  }
  return isgood;
}

function validate_date(bdate){
  if(bdate.length < 10)
    return false;
  var dd = parseInt(bdate.substring(0,2));
  var mm = parseInt(bdate.substring(3,5));
  var yyyy = parseInt(bdate.substring(6));
  
  if(isNaN(dd) || dd < 1 || dd > 31)
    return false;
  if(isNaN(mm) || mm < 1 || mm > 12)
    return false;
  if(isNaN(yyyy) || yyyy < 1800 || yyyy > 2020)
    return false;
  return true;
}
function date_keyup(){
  date_field = document.getElementById("birth_date");
  if(date_field.value == " "){
    date_field.value = "";
  }
  if(date_field.value.length == 2){
    date_field.value += "/";
  }
  if(date_field.value.length == 5){
    date_field.value += "/";
  }
  if(date_field.value.length >= 10){
    date_field.value = date_field.value.substring(0,10);
  }
}

function save_info(){
  fname_field = document.getElementById("first_name");
  lname_field = document.getElementById("last_name");
  email_field = document.getElementById("email");
  var isgood = validation(fname_field, lname_field, email_field);
}