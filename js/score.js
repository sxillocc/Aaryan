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
auth_instance.signInAnonymously()
.then(() => {
  var eng = document.getElementById("eng");
  var hin = document.getElementById("hin");
  var tar = document.getElementById("tar");
  db_instance.ref("LBG1Ewlink").get().then(function(snapshot){
    let x = snapshot.val();
    eng.innerHTML = x['count'];
  });
  db_instance.ref("LBG1Hwlink").get().then(function(snapshot){
    let y = snapshot.val();
    hin.innerHTML = y['count']; 
  })
  db_instance.ref("SWSCwlink").get().then(function(snapshot){
    let z = snapshot.val();
    tar.innerHTML = z['count'];
  });
})
.catch((error) => {
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorMessage);
})