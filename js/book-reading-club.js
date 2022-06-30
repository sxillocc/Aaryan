//Loader initialized
var loader = document.getElementById("loader");
function loaderOn(){
  document.getElementById("submitbttn").disabled = true;
  loader.style.display = "block";
}
function loaderOff(){
  document.getElementById("submitbttn").disabled = false;
  loader.style.display = "none";
}


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

var langArray = [
  {val:'English', name:"English"}, 
  {val:'Hindi', name:"हिंदी (Hindi)"}, 
  {val:'Marathi', name:"मराठी (Marathi)"},
  {val:'Sindhi', name:'سنڌي (Sindhi)'},
  {val:'Malayalam', name:'മലയാളം (Malayalam)'},
  {val:'Kannada', name:'ಕನ್ನಡ (Kannada)'},
  {val:'Bengali', name:'বাংলা (Bengali)'},
  {val:'Punjabi', name:'ਪੰਜਾਬੀ (Punjabi)'},
  {val:'Tamil', name:'தமிழ் (Tamil)'}
];

for (let i = 0; i < langArray.length; i++) {
  let opt = document.createElement("option");
  opt.value = langArray[i].val; 
  opt.innerHTML = langArray[i].name; 
  var languageElement = document.getElementById('language');
  languageElement.append(opt); 
}

var languageElement = document.getElementById('language');
var batchesElement = document.getElementById('time');

var createOption = (field, text, value) => {
  var opt = document.createElement('option');
  opt.value = value;
  opt.text = text;
  field.options.add(opt);
}

var configureDropDownLists = (field1, field2) => {
  var english = ['11:00 AM', '02:00 PM', '05:00 PM', '09:00 PM'];
  var hindi = ['11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM','07:00 PM','08:00 PM','09:00 PM'];
  var marathi = ['07:00 PM', '09:00 PM'];
  var sindhi = ['09:00 PM'];
  var malayalam = ['09:00 PM'];
  var kannada = ['09:00 PM'];
  var bengali = ['07:30 PM'];
  var punjabi = ['06:00 PM'];
  var tamil = ['07:00 PM'];

  field2.options.length = 0;

  switch (field1.value) {
    case 'English':
      for (var time of english) {
        createOption(field2, time, time);
      }
      break;
    case 'Hindi':
      for (var time of hindi) {
        createOption(field2, time, time);
      }
      break;
    case 'Marathi':
      for (var time of marathi) {
        createOption(field2, time, time);
      }
      break;
    case 'Sindhi':
      for (var time of sindhi) {
        createOption(field2, time, time);
      }
      break;
    case 'Malayalam':
      for (var time of malayalam) {
        createOption(field2, time, time);
      }
      break;
    case 'Kannada':
      for (var time of kannada) {
        createOption(field2, time, time);
      }
      break;
    case 'Bengali':
      for (var time of bengali) {
        createOption(field2, time, time);
      }
      break;
    case 'Punjabi':
      for (var time of punjabi) {
        createOption(field2, time, time);
      }
      break;
    case 'Tamil':
      for (var time of tamil) {
        createOption(field2, time, time);
      }
      break;
    default:
      break;
  }
}

languageElement.addEventListener('change', () => {
  configureDropDownLists(languageElement, batchesElement)
})

// function togglecountry(element){
//   let value = element.options[element.selectedIndex].value;
//   let locationbox = document.getElementById("locationbox");
//   if(value == "91"){
//     locationbox.style.display = "block";
//     return;
//   }
//   locationbox.style.display = "none";
// }

// function toggle(element){
//   let value = element.options[element.selectedIndex].value;
//   if(value == "Student"){
//     let cnamefield = document.getElementById("colledgename");
//     cnamefield.style.display = "block";
//     return;
//   }
//   let cnamefield = document.getElementById("colledgename");
//   cnamefield.style.display = "none";
// }
function n(n){
  return n > 9 ? "" + n: "0" + n;
}

function getCourseCode(language, time){
  return ""+ language[0]+language[1]+language[2]+time[0]+time[1]+time[3]+time[4]+time[6]+time[7];
}

function join(){
  var fnamefield = document.getElementById("fname"); // fullname
  var agefield = document.getElementById("age");
  var genderfield = document.getElementById("gender");
  var statefield = document.getElementById("state");
  var cityfield = document.getElementById("city");
  var countrycodefield = document.getElementById("countrycode");
  var whatsappfield = document.getElementById("contact");

  
  var fname = fnamefield.value;
  var age = agefield.value;
  var gender = genderfield.value;
  var state = statefield.value;
  var city = cityfield.value;
  var countrycode = countrycodefield.value;
  var whatsapp = whatsappfield.value;
  var language = languageElement.value;
  var time = batchesElement.value;

  var courseCode = getCourseCode(language, time);

  // let isValid = checkvalidity(fname, age, state, city, whatsapp);
  // if(!isValid)
  //   return;
  
  var location = city +", "+state;
  
  var fullname = fname;
  
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
    time: time,
    countrycode: countrycode,
    contact: whatsapp,
    location: location,
    courseCode: courseCode,
    timestamp: timestamp,
    grpno: "not alloted"
  }
  
  loaderOn();
  auth_instance.signInAnonymously()
  .then(() => {
    // console.log("Signed In");
    uploadEntry(user, courseCode);
  })
  .catch((error) => {
    var errorMessage = error.message;
    // console.log(errorCode);
    console.log(errorMessage);
    loaderOff();
  })


  
  // alert("Entry taken");
}


function checkvalidity(fname, age, state, city, whatsapp){
  if(fname == "" || whatsapp == "" || age == ""){
    alert("Please fill all the required fields");
    return false;
  }
  if(state == "" || city == ""){
    alert("Please fill location");
    return false;
  }
  return true;
}
function alreadyRegistered(){
  alert("You are already registered for this program. If you are not in whatsapp group then please whatsapp us on 7359802004 (Shaktiraj). ")
}
function newEntry(user, uid, courseCode){
  db_instance.ref("ReadingProgram/"+courseCode).get().then(function(snapshot){
    //
    let courseDetail = snapshot.val();
    let i = parseInt(courseDetail['count']);
    i = (Math.floor(i / 246)) + 1;
    i = "wlink" + i.toString();
    user['grpno'] = i;

    let userref = db_instance.ref("ReadingProgramEntries/"+courseCode+"/"+uid);
    userref.set(user).then(function(){
      updateCount(courseCode, courseDetail[i]);
    });

  }).catch(function(error){
    let errorMessage = error.message;
    let errorCode = error.code;
    console.log(errorCode+" : "+errorMessage);
  });
}
function uploadEntry(user, courseCode){
  let uid = user.contact+user.name;
  db_instance.ref("ReadingProgramEntries/"+courseCode+'/'+uid).get().then(function(snapshot){
    if(snapshot.exists()){
      alreadyRegistered();
      loaderOff();
      return;
    }
    // let root = db_instance.ref("root/"+uid+"/"+courseCode);
    newEntry(user, uid, courseCode);

  }).catch(function(error){
    let errorMessage = error.message;
    let errorCode = error.code;
    loaderOff();
    alert("Something wrong, please try again later....");
    console.log(errorCode+" : "+errorMessage);
  })
}
function updateCount(courseCode, link){
  let countref = db_instance.ref("ReadingProgram/"+courseCode+"/count");
  countref.transaction(function(count){
    // let result = 0;
    // console.log("Count Updated");
    if(count === null){
      return 1;
    }
    else{
      return count+1;
    }
  }).then(function(){
    loaderOff();
    let title = "You have successfully registered.";
    let note = "Important Note:- Whatsapp group में जुड़ना आवश्यक हैं | Must join in Whatsapp Group.";
    nextPage(title, note, link);
    // let wlink1 = document.getElementById("wlink1");
    // wlink1.href = link;
    // let wlinktitle = document.getElementById("wlinktitle");
    // wlinktitle.innerHTML = "You have successfully registered.";
    // let wlinknote = document.getElementById("wlinknote");
    // wlinknote.innerHTML = "Important Note:- Whatsapp group में जुड़ना आवश्यक हैं | Must join in Whatsapp Group.";
    // instance.open();   
  }).catch(function(error){
    console.log("error- "+error.errorMessage);
  });
}
function nextPage(title, note, link){
  var x = {
    "title" : title,
    "note" : note,
    "link" : link
  }
  localStorage.setItem("linkdetails",JSON.stringify(x));
  window.location.href = "./thank-you.html";
}