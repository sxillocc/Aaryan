var empty_error = "Please fill all the fields";

function validation(fname, lname){
  var isgood = true;
  if(fname == "" || lname == ""){
    alert(empty_error);
    isgood = false;
    return false;
  }
  return isgood;
}

function save_info(){
  fname_field = document.getElementById("first_name");
  lname_field = document.getElementById("last_name");

}