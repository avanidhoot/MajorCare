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

  const email = document.getElementById('email')
  const password = document.getElementById('pwd')
  const fname = document.getElementById('fname')
  const lname = document.getElementById('lname')
  const auth = firebase.auth()
  const signup_btn = document.getElementById('signup_btn')
  var database = firebase.database()
  userref = database.ref('Users')

  signup_btn.addEventListener('click',e=>{
     const promise = auth. createUserWithEmailAndPassword(email.value,password.value);
     promise.catch(e=>alert(e.message));
  });

  auth.onAuthStateChanged(firebaseUser=>{
        if(firebaseUser)                                                                  //Login state
        {
            currentuser = userref.child(auth.currentUser.uid)
            auth.currentUser.sendEmailVerification().then(function(){
            currentuser.child("firstName").set(fname.value)
            currentuser.child("lastName").set(lname.value)
            currentuser.child("charityRaised").set("0")
            currentuser.child("email").set(email.value)
            currentuser.child("phoneNumber").set("Not Set")
            currentuser.child("dateOfBirth").set("Not Set")
            currentuser.child("username").set("")
            currentuser.child("password").set("")
            window.location.href="E:/project/major-project/MajorCare/index.html";
            auth.signOut();
            alert("Verification Email Sent");
        },function(error){
            alert(error.message);
        });

        }
    });

}())
