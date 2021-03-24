var empty_error = "Please fill all the fields";
var fname_error = "Invalid First Name";
var lname_error = "Invalid Last Name";
var email_error = "Invalid Email";
var date_error = "Invalid Date";
var phone_error = "Invalid Phone Number";
var course = {
  name: "Life Lessons from Bhagavad gita",
  month: "December 2020"
};
init();

//firebase intialization
var firebaseConfig = {
  apiKey: "AIzaSyCMXSYkqRW9Sq5IVma69NuBlrjwM0kPbRk",
  authDomain: "thearyansclub-108.firebaseapp.com",
  databaseURL: "https://thearyansclub-108.firebaseio.com",
  projectId: "thearyansclub-108",
  storageBucket: "thearyansclub-108.appspot.com",
  messagingSenderId: "627962594151",
  appId: "1:627962594151:web:db0aaa9b72a0590c4825c2",
  measurementId: "G-G1050ZTX9E"
};
firebase.initializeApp(firebaseConfig);
var db_instance = firebase.database();
var auth_instance = firebase.auth();
var entries_ref = db_instance.ref('bgll_entries');
var transaction_ref = db_instance.ref('bgll_transaction');

function init(){
  document.getElementById("ph_code").value = String("+91");
  document.getElementById("birth_date").addEventListener("keyup", date_keyup); 
}

function save_info(){
  //Step 1: Get User from input fields
  //Step 2: Sign-in and Write User into Database
  //Step 3: Open Payment Gateway after successfully writing data
  //Step 4: Store Payment Id in Database
  var m_user = getTestUser();
  var amt = "1000";
  console.log("We're going to add details in database");
  console.log(auth_instance);
  auth_instance.signInAnonymously()
  .then(() => {
    console.log(m_user);
    // writeInDatabase("user", "amt");
    var transaction = getRazorpayTransaction(m_user, course, amt);
    console.log(transaction);
    var payment_gateway = new Razorpay(transaction);
    payment_gateway.open();
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  })
}

function writeInDatabase(user, amt){
  entries_ref.push(user, (error)=>{
    if(error){
      console.log(error);
    } else {
      console.log("Registered");
      // var transaction = getRazorpayTransaction(user, course, amt);
      // var payment_gateway = new Razorpay(transaction);
      // payment_gateway.open();
    }
  });
}

function getRazorpayTransaction(user, event, amt){
  var options = {
    "key": "rzp_test_NO41aZV6wcQ7Yo",
    "amount": amt,
    "currency": "INR",
    "name": "The Aryans Club",
    "image": "https://thearyansclub.com/assets/images/a_logo_small.jpg",
    "handler": function (response){
      // transaction_ref.push({
      //   payment_id: response.razorpay_payment_id,
      //   email: user.email,
      //   phone: user.phone,
      //   name: user.fname+" "+user.lname
      // }, (error)=>{
      //   if(error){
      //     console.log(error);
      //   } else {
      //     alert("You have successfully Registered!");
      //     location.reload();
      //   }
      // });
      console.log(response);
    },
    "prefill": {
      "name": user.fname+" "+user.lname,
      "email": user.email,
      "contact": user.phone
    },
    "notes": {
      "event": event.name,
      "month": event.month
    },
    "theme": {
      "color": "#c5331c"
    },
    "modal": {
      "backdropclose": false,
      "escape": false,
    }
  };
  return options;
}

function getTestUser(){
  console.log("We're in Test User Function");
  var test_fname_field = document.getElementById("first_name");
  var test_lname_field = document.getElementById("last_name");
  var test_user = {
    fname: "Shaktiraj",
    lname: "Daudra",
    phone: "7359802004",
    email: "shaktirajdaudra@gmail.com"
  };
  console.log("User has been created Successfully");
  console.log(test_user);
  return test_user;
}

function getUser(){
  var fname_field = document.getElementById("first_name");
  var lname_field = document.getElementById("last_name");
  var email_field = document.getElementById("email");
  var date_field = document.getElementById("birth_date");
  var phone_field = document.getElementById("ph_no");
  var phone_codef = document.getElementById("ph_code");
  var male_rbttn = document.getElementById("male_bttn");
  var female_rbttn = document.getElementById("female_bttn");
  var location_field = document.getElementById("location");
  var isgood = validation(fname_field, lname_field, email_field, date_field, phone_field, phone_codef, location_field);
  if(!isgood)
    return null;
  var first_name = fname_field.value;
  var last_name = lname_field.value;
  var email = email_field.value;
  var birth_date = date_field.value;
  var phone = phone_field.value;
  var phone_code = phone_codef.value;
  var location = location_field.value;
  var gender = "Male";
  if(male_rbttn.checked){
    gender = male_rbttn.value;
  }else{
    gender = female_rbttn.value;
  }
  var user = {
    fname: first_name,
    lname: last_name,
    email: email,
    bdate: birth_date,
    phone_code: phone_code,
    phone: phone,
    location: location,
    gender: gender
  }
  return user;
}

function validation(fname, lname, email, date, phone, phone_code, location){
  var isgood = true;
  //empty_field validation
  if(fname.value == "" || lname.value == "" || email.value == "" || phone.value == "" || phone_code.value == "" || location.value == ""){
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
  isgood = validate_date(date.value)
  if(!isgood){
    alert(date_error)
    return false
  }
  //phone validation
  if(phone.value.length < 7){
    isgood = false
    alert(phone_error)
    return isgood
  }
  return isgood
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

function date_keyup(event){
  var key = event.keyCode || event.charCode;
  var date_field = document.getElementById("birth_date");
  if(date_field.value == " "){
    date_field.value = "";
  }
  else if(date_field.value.length == 2 && key == 8){
    date_field.value = date_field.value.substring(0,1);
  }
  else if(date_field.value.length == 2){
    date_field.value += "/";
  }
  else if(date_field.value.length == 5 && key == 8){
    date_field.value = date_field.value.substring(0,4);
  } 
  else if(date_field.value.length == 5){
    date_field.value += "/";
  }
  else if(date_field.value.length >= 10){
    date_field.value = date_field.value.substring(0,10);
  }
};