( function(){
  // Initialize Firebase

  var config = {
    apiKey: "AIzaSyBNFYsVk-JwYK8gJlHCFO5ZyYpBxqRXNJo",
    authDomain: "care-5571b.firebaseapp.com",
    databaseURL: "https://care-5571b.firebaseio.com",
    projectId: "care-5571b",
    storageBucket: "care-5571b.appspot.com",
    messagingSenderId: "81353950576"
  };
  firebase.initializeApp(config);

  const fname = document.getElementById('fname')
  const lname = document.getElementById('lname')
  const auth = firebase.auth()

  var database = firebase.database();
  userref = database.ref('Users');
  currentuser = userref.child(auth.currentUser.uid);
  console.log(auth.currentUser.uid);


firebase.database().ref('/Users/' + auth.currentUser.uid).once('value').then(function(snapshot) {
  var username = snapshot.val().firstName;
    fname.value = username;
  // ...
});
    }())
