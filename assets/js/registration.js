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

// Modal initiation
// const elem = document.getElementById('registered1');
// const instance = M.Modal.init(elem, {dismissible: false});

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

function togglecountry(element){
  let value = element.options[element.selectedIndex].value;
  let locationbox = document.getElementById("locationbox");
  if(value == "91"){
    locationbox.style.display = "block";
    return;
  }
  locationbox.style.display = "none";
}

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
function n(n){
  return n > 9 ? "" + n: "0" + n;
}
function join(batch){
  var fnamefield = document.getElementById("fname");
  var genderfield = document.getElementById("gender");
  var countrycodefield = document.getElementById("countrycode");
  var whatsappfield = document.getElementById("whatsapp");
  var statefield = document.getElementById("state");
  var cityfield = document.getElementById("city");
  var agefield = document.getElementById("age");

  var fname = fnamefield.value;
  var father_name = document.getElementById("father_name").value;
  var mother_name = document.getElementById("mother_name").value;
  var gender = genderfield.value;
  var fromDevoteeHome = document.getElementById("devotee_home").value;
  var countrycode = countrycodefield.value;
  var whatsapp = whatsappfield.value;
  var child_contact = document.getElementById("child_contact").value;
  var state = statefield.value;
  var city = cityfield.value;
  var location = countrycodefield.options[countrycodefield.selectedIndex].text;
  var age = agefield.value;
  if(age>=12 && gender == "Male"){
    batch = "CPrabhu";
  }else if(age>=12 && gender == "Female"){
    batch = "CMataji";
  }else if(age>=8){
    batch = "B";
  }else{
    batch = "A";
  }
  var courseCode = batch;
  var whatsappCode = batch;

  let isValid = checkvalidity(fname, father_name, mother_name, countrycode, whatsapp, state, city, age);
  if(!isValid)
    return;
  if(countrycode != "91"){
    state = "N/A";
    city = "N/A";
  }else{
    location = city +", "+state;
  }
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
    father_name: father_name,
    mother_name: mother_name,
    from_devotee_home: fromDevoteeHome,
    gender: gender,
    countrycode: countrycode,
    parents_contact: whatsapp,
    child_contact: child_contact,
    location: location,
    courseCode: courseCode,
    timestamp: timestamp,
    age: age
  }
  console.log(user);
  loaderOn();
  auth_instance.signInAnonymously()
  .then(() => {
    // console.log("Signed In");
    uploadEntry(user, courseCode, whatsappCode);
  })
  .catch((error) => {
    var errorMessage = error.message;
    // console.log(errorCode);
    console.log(errorMessage);
    loaderOff();
  })
  // TODO LIST--------------------------
  // Push "user" in firebase at location "courseCode"
  // Give them link of whatsapp group (First read link from firebase then give)
  // -------------------------------------------------------------------------- 

  // alert("Entry taken");
}
function checkvalidity(fname, father_name, mother_name, countrycode, whatsapp, state, city, age){
  if(fname == "" || father_name == "" || mother_name == "" || whatsapp == "" || age == ""){
    alert("Please fill all the required fields");
    return false;
  }
  if(countrycode == "91" && (state == "" || city == "")){
    alert("Please fill location");
    return false;
  }
  return true;
}
function alreadyRegistered(courseCode, whatsappCode){
  db_instance.ref("ChildProgram/"+whatsappCode+"wlink").get().then(function(snapshot){
    // console.log("You're already registered, Reading your whatsapp link");
    let courseDetail = snapshot.val();
    let i = parseInt(courseDetail['count']);
    i = (Math.floor(i / 240)) + 1;
    i = "wlink" + i.toString();
    // console.log("Reading "+ i);
    // console.log("link == " + courseDetail[i]);
    loaderOff();
    let title="You have already Registered";
    let note="Incase you have not yet joined the Whatsapp group then please join..."
    let link=courseDetail[i];
    nextPage(title, note, link);
    // let wlink1 = document.getElementById("wlink1");
    // wlink1.href = courseDetail[i];
    // let wlinknote = document.getElementById("wlinknote");
    // wlinknote.innerHTML = "You have already Registered, Incase you have not yet joined the Whatsapp group then please join.";
    // instance.open();
  }).catch(function(error){
    let errorMessage = error.message;
    let errorCode = error.code;
    loaderOff();
    alert("Something wrong, please try again later...");
    console.log(errorCode+" : "+errorMessage);
  })
}
function newEntry(root, user, uid, courseCode, whatsappCode){
  db_instance.ref("ChildProgram/"+whatsappCode+"wlink").get().then(function(snapshot){
    // console.log("Registering new user");
    let courseDetail = snapshot.val();
    let i = parseInt(courseDetail['count']);
    i = (Math.floor(i / 240)) + 1;
    i = "wlink" + i.toString();
    // console.log("Reading "+ i);
    // console.log("link == " + courseDetail[i]);
    root.set(i).then(function(){
      let userref = db_instance.ref(courseCode+"/"+uid);
      userref.set(user).then(function(){
        // console.log("Registered");
        updateCount(whatsappCode, courseDetail[i]);
      });
    });
  }).catch(function(error){
    let errorMessage = error.message;
    let errorCode = error.code;
    console.log(errorCode+" : "+errorMessage);
  });
}
function uploadEntry(user, courseCode, whatsappCode){
  let uid = user.parents_contact+user.name;
  db_instance.ref("root/"+uid).get().then(function(snapshot){
    if(snapshot.exists()){
      let reglist = snapshot.val();
      // console.log(courseCode+" : -- : "+ reglist[courseCode]);
      if(reglist[courseCode] !== undefined){
        alreadyRegistered(courseCode, whatsappCode);
        return;
      }
    }
    let root = db_instance.ref("root/"+uid+"/"+courseCode);
    newEntry(root, user, uid, courseCode, whatsappCode);

  }).catch(function(error){
    let errorMessage = error.message;
    let errorCode = error.code;
    loaderOff();
    alert("Something wrong, please try again later....");
    console.log(errorCode+" : "+errorMessage);
  })
}
function updateCount(whatsappCode, link){
  let countref = db_instance.ref("ChildProgram/"+whatsappCode+"wlink/count");
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
  window.location.href = "./thankyou.html";
}