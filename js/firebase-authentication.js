
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
  const login_btn = document.getElementById('login_btn')
  const signup_btn = document.getElementById('signup_btn')
  const auth = firebase.auth()
  var database = firebase.database()

  login_btn.addEventListener('click',e=>{
    const promise = auth.signInWithEmailAndPassword(email.value,password.value);
    promise.catch(e=>alert(e.message));
  });


    auth.onAuthStateChanged(firebaseUser=>{
       if(firebaseUser){
           var flag=false
           if(firebaseUser.emailVerified){
                  window.location.href="userprofile.html";

         }
           else{
               alert("Email not verified");
           }
       }

    });
}())
