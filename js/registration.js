//courseInitialzation
let course = JSON.parse(localStorage.getItem("course"));
console.log(course);
if(course === null){
  alert("Please select some course");
  window.location.href = "./courses.html"
}
var courseCode = course['courseCode'];
//Loader initialized
var loader = document.getElementById("loader");
function loaderOn(){
  document.getElementById("joinbttn").disabled = true;
  loader.style.display = "block";
}
function loaderOff(){
  document.getElementById("joinbttn").disabled = false;
  loader.style.display = "none";
}
// Modal initiation
const elem = document.getElementById('registered1');
const instance = M.Modal.init(elem, {dismissible: false});

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

//constructor
function init(){
  let courseField = document.getElementById("courseField");
  courseField.innerHTML = course['courseName'];
}
init();
var k=0;

//Asking Location, If user is from India
function togglecountry(element){
  let value = element.options[element.selectedIndex].value;
  let locationbox = document.getElementById("locationbox");
  if(value == "91"){
    locationbox.style.display = "block";
    return;
  }
  locationbox.style.display = "none";
}

//Asking College Name, if user is Studying
function toggle(element){
  let value = element.options[element.selectedIndex].value;
  if(value == "Student"){
    let cnamefield = document.getElementById("colledgename");
    cnamefield.style.display = "block";
    return;
  }
  let cnamefield = document.getElementById("colledgename");
  cnamefield.style.display = "none";
}

//Pay now function
function payNow(user, courseCode, amt){
  let transaction = getRazorpayTransaction(user, courseCode, amt);
  try{
    let payment_gateway = new Razorpay(transaction)
    //Update database if payment successfull
    payment_gateway.open();
    
    //Update database if payment failed
    payment_gateway.on('payment.failed', function (response){
        let errormsg = response.error.code + ": "+response.error.description+", "+response.error.reason;  
        pstatus = {
          "status": "Failed",
          "pid": response.error.metadata.payment_id,
          "description": errormsg
        }

        //location--> coursecode/whatsapp/pstatus = pstatus
        db_instance.ref(courseCode+"/"+user.whatsapp+"/pstatus").set(pstatus);
    });
  }catch(error){
    console.log(error.message);
    alert("Payment Gateway not working, Please try again later.");
  }
}
function n(n){
  return n > 9 ? "" + n: "0" + n;
}
//register page
function register(){
  courseCode = course['courseCode'];
  var criticalAge = 35;
  
  var fnamefield = document.getElementById("fname");
  var lnamefield = document.getElementById("lname");
  var agefield = document.getElementById("age");
  var genderfield = document.getElementById("gender");
  var countrycodefield = document.getElementById("countrycode");
  var whatsappfield = document.getElementById("whatsapp");
  var professionfield = document.getElementById("profession");
  var cnamefield = document.getElementById("cname");
  var statefield = document.getElementById("state");
  var cityfield = document.getElementById("city");
  var camefromfield = document.getElementById("camefrom");

  var fname = fnamefield.value;
  var lname = lnamefield.value;
  var age = agefield.value;
  var gender = genderfield.value;
  var language = course['courseLang'];
  var countrycode = countrycodefield.value;
  var whatsapp = whatsappfield.value;
  var profession = professionfield.value;
  var cname = cnamefield.value;
  var state = statefield.value;
  var city = cityfield.value;
  var location = countrycodefield.options[countrycodefield.selectedIndex].text;
  var isYouth = false;
  var camefrom = camefromfield.value;

  let isValid = checkvalidity(fname, lname, age, countrycode, whatsapp, profession, cname, state, city);
  if(!isValid)
    return;
  if( profession !="Student"){
    cname = "N/A";
  }
  if(countrycode != "91"){
    state = "N/A";
    city = "N/A";
  }else{
    location = state+", "+city;
  }
  var fullname = fname+" "+lname;
  if(gender == "Male" && age<=criticalAge){
    isYouth = true;
  }
  //getting timestamp
  var currentTime = new Date();
  var currentOffset = currentTime.getTimezoneOffset();
  var ISTOffset = 330;   // IST offset UTC +5:30 
  var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
  // ISTTime now represents the time in IST coordinates
  var hoursIST = n(ISTTime.getHours())
  var minutesIST = n(ISTTime.getMinutes())
  var dd = n(ISTTime.getDate())
  var mm = n(ISTTime.getMonth()+1)
  var yyyy = ISTTime.getFullYear()
  var timestamp = dd+"/"+mm+"/"+yyyy+"-"+hoursIST+":"+minutesIST
  var user = {
    name: fullname,
    age: age,
    gender: gender,
    language: language,
    countrycode: countrycode,
    whatsapp: whatsapp,
    profession: profession,
    cname: cname,
    location: location,
    isYouth: isYouth,
    courseCode: courseCode,
    timestamp: timestamp,
    cameFrom: camefrom
  }
  if (!navigator.onLine){
    alert("Please check your internet connection");
    return;
  }
  
  loaderOn();
  auth_instance.signInAnonymously()
  .then(() => {
    if (!navigator.onLine){
      alert("Please check your internet connection");
      return;
    }
    uploadEntry(user, courseCode);
  })
  .catch((error) => {
    var errorMessage = error.message;
    console.log(errorMessage);
    alert("Please try again.. ");
    loaderOff();
  })
  // TODO LIST--------------------------
  // Push "user" in firebase at location "courseCode"
  // Give them link of whatsapp group (First read link from firebase then give)
  // -------------------------------------------------------------------------- 

  // alert("Entry taken");
}
function checkvalidity(fname, lname, age, countrycode, whatsapp, profession, cname, state, city){
  if(fname == "" || lname == "" || age == "" || whatsapp == "" || profession == ""){
    alert("Please fill all the required fields");
    return false;
  }
  if(profession == "Student" && cname == ""){
    alert("Please fill Colledge name");
    return false;
  }
  if(countrycode == "91" && (state == "" || city == "")){
    alert("Please fill location");
    return false;
  }
  if(age > 100 || age < 8){
    alert("Please recheck the Age");
    return false;
  }
  return true;
}

//Invoke when given contact is already registered in the event
function alreadyRegistered(courseCode, group_num){
  if (!navigator.onLine){
    alert("Please check your internet connection");
    return;
  }
  db_instance.ref(courseCode+"wlink").get().then(function(snapshot){
    let courseDetail = snapshot.val();
    let link = courseDetail[group_num];
    //switching off loader and showing the MODAL
    loaderOff();
    let wlink1 = document.getElementById("wlink1");
    wlink1.href = link;
    let wlinknote = document.getElementById("wlinknote");
    wlinknote.innerHTML = "You have already Registered, Incase you have not yet joined the Whatsapp group then please join.";
    instance.open();
  }).catch(function(error){
    let errorMessage = error.message;
    loaderOff();
    alert("You're already Registered");
    console.log(errorMessage);
  })
}

//Invoke when given contact is not registered in the event
function newEntry(user, uid, courseCode){
  //write new entry
  let userref = db_instance.ref(courseCode + "/" + uid);
  userref.set(user).then(function () {
    loaderOff();
    if (!navigator.onLine){
      alert("Please check your internet connection");
      return;
    }
    payNow(user, courseCode, course['amt']);
  });
}
function uploadEntry(user, courseCode){
  let uid = user.whatsapp;

  //Checking whether given contact is already registered or not?
  db_instance.ref("root/"+uid).get().then(function(snapshot){
    if(snapshot.exists()){
      let reglist = snapshot.val();
      if(reglist[courseCode] !== undefined){
        alreadyRegistered(courseCode, reglist[courseCode]);
        return;
      }
    }
    if (!navigator.onLine){
      alert("Please check your internet connection");
      return;
    }
    newEntry(user, uid, courseCode);

  }).catch(function(error){
    let errorMessage = error.message;
    k = k + 1;
    if(k < 2){
      console.log(errorMessage + ": "+k );
      register();
      return;
    }else{
      loaderOff();
      // window.location.href = "./registration.html";
      alert("Something wrong, please try again. (3)");
      db_instance.ref("error/ramayan").push(errorMessage);
      console.log(errorMessage);
    }
  })
}
function updateCount(courseCode, link){
  let countref = db_instance.ref(courseCode+"wlink/count");
  //Updating count, THIS BLOCK WILL NEVER CHANGE... You can add things after completion of this promise
  countref.transaction(function(count){
    if(count === null){
      return 1;
    }
    else{
      return count+1;
    }
  }).then(function(){
    loaderOff();
    let wlink1 = document.getElementById("wlink1");
    wlink1.href = link;
    let wlinktitle = document.getElementById("wlinktitle");
    wlinktitle.innerHTML = "You have successfully registered.";
    let wlinknote = document.getElementById("wlinknote");
    wlinknote.innerHTML = "Important Note:- Whatsapp group में जुड़ना आवश्यक हैं | Must join in Whatsapp Group.";
    instance.open();
  }).catch(function(error){
    console.log("Count not updated:- "+error.errorMessage);
  });
}
function showModal(user, courseCode){
  //Again turning on loader
  loaderOn();
  let root = db_instance.ref("root/"+user.whatsapp+"/"+courseCode);
  db_instance.ref(courseCode+"wlink").get().then(function(snapshot){
    let courseDetail = snapshot.val();
    let i = parseInt(courseDetail['count']);
    i = (Math.floor(i / 246)) + 1;
    i = "wlink" + i.toString();
    root.set(i).then(function(){
      updateCount(courseCode, courseDetail[i]);
    });
  }).catch(function(error){
    loaderOff();
    window.location.href="./courses.html";
    // IF SOMETHING WENTS WRONG THEN TRY LATER............
    let errorMessage = error.message;
    console.log("Whatsapp Link not generated due to reason:- "+ errorMessage);
    alert("You have successfully Registered. Our volunteer will communicate with you soon. Thank-you");
  });
}
function getRazorpayTransaction(user, courseCode, amt){
  var options = {
    "key": "rzp_live_qLeEwleT8UJmOH",
    "amount": amt,
    "currency": "INR",
    "name": "The Aryans Club",
    "image": "https://thearyansclub.com/assets/images/a_logo_small.jpg",
    "handler": function (response){
      pstatus = {
        "status": "Successful",
        "pid": response.razorpay_payment_id
      }
      db_instance.ref(courseCode+"/"+user.whatsapp+"/pstatus").set(pstatus).then(
        function(){
          if (!navigator.onLine){
            alert("Please check your internet connection");
            return;
          }
          showModal(user, courseCode);
        }
      );
    },
    "prefill": {
      "name": user.fullname,
      "contact": user.whatsapp
    },
    "notes": {
      "courseCode": courseCode
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