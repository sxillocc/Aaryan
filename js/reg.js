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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
var db = firebase.database();
var auth = firebase.auth();
var entries_ref = db.ref('bgll_entries');
var transaction_ref = db.ref('bgll_transaction');
var obj = {
  "f_name": "Shaktiraj",
  "s_name": "Daudra",
  "id": "2018kucp1092",
  "fruits": {
    "a" : "Apple",
    "m" : "Mango",
    "b" : "Banana"
  }
};
function validateEmail(email){
  // var mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
  if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
    return true;
  } else {
    return false;
  }
}
function validate(a,b,c,d,e){
  var ans = true;
  if(a == "" || b == "" || c == "" || d == "" || e == "")
    return false;
  return ans;
}

function save_info(){
  var f_name = document.getElementById("first_name").value;
  var l_name = document.getElementById("last_name").value;
  var email = document.getElementById("email").value;
  var dob = document.getElementById("birth_date").value;
  var phone = document.getElementById("phone").value;

  var is_good = validate(f_name, l_name, email, dob, phone);
  if(!is_good){
    return;
  }

  var email_is_good = validateEmail(email);
  if(!email_is_good){
    return;
  }
  full_name = f_name + " " + l_name;
  var options = {
    "key": "rzp_test_hJzg5hre7m0Y6h", // Enter the Key ID generated from the Dashboard
    "amount": "29900", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "The Aryans Club",
    "description": "Life Lessons from Bhagavad Gita",
    "image": "https://thearyansclub.com/assets/images/a_logo_small.jpg",//This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
        // console.log(response);
        // console.log(full_name);
        // console.log(response.razorpay_payment_id);
        transaction_ref.push({
          payment_id: response.razorpay_payment_id,
          email: email,
          phone: phone
        });
    },
    "prefill": {
        "name": full_name,
        "email": email,
        "contact": phone
    },
    "notes": {
        "address": "Iskcon Juhu"
    },
    "theme": {
        "color": "#c5331c"
    }
  };
  auth.signInAnonymously()
  .then(() => {
    // console.log("Login Successful");
    writeUser(f_name, l_name, email, phone, dob, options);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  })
}


function writeUser(f_name, l_name, email, phone, dob, options){
  
  entries_ref.push({
    f_name: f_name,
    l_name: l_name,
    email: email,
    phone: phone,
    dob: dob
  }, (error)=>{
    if(error){
      console.log(error);
    } else {
      full_name = f_name + " " + l_name;
      var propay = new Razorpay(options);
      propay.open();
      // window.location.reload();
    }

  });
}


