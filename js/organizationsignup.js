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
  const name = document.getElementById('name')
  const email = document.getElementById('email')
  const password = document.getElementById('pwd')
  const category = document.getElementById("category");
  var selectedCategory = category.options[category.selectedIndex].value;
  const location = document.getElementById('location')
  const auth = firebase.auth()
  const signup_btn = document.getElementById('signup_btn')
  var database = firebase.database()
  userref = database.ref('Organisations')

  signup_btn.addEventListener('click',e=>{
     const promise = auth. createUserWithEmailAndPassword(email.value,password.value);
     promise.catch(e=>alert(e.message));
  });

  auth.onAuthStateChanged(firebaseUser=>{
        if(firebaseUser) //Login state
        {
          const uid = auth.currentUser.uid
          currentuser = userref.child(auth.currentUser.uid)
          auth.currentUser.sendEmailVerification().then(function(){
            currentuser.child("organisationName").set(name.value)
            currentuser.child("reviewId").set(uid)
            currentuser.child("eventId").set(uid)
            currentuser.child("organisationCategory").set(selectedCategory)
            currentuser.child("organisationLocation").set(location.value)
            currentuser.child("organisationRating").set("Not Rated Yet")
            currentuser.child("defaultState").set("false")
            currentuser.child("organisationUsername").set(email.value)
            currentuser.child("about").set("")
            currentuser.child("password").set("")
            window.location.href="index.html";
            auth.signOut();
            alert("Verification Email Sent");

        },function(error){
            alert(error.message);
        });

        }
    });
}())
