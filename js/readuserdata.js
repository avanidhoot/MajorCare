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

  const password = document.getElementById('password')
  const logout_btn = document.getElementById('logout_btn');
  const fname = document.getElementById('fname')
  const lname = document.getElementById('lname')
  const email = document.getElementById('email')
  const phoneNumber = document.getElementById('phoneNumber')
  const update_btn = document.getElementById('update_btn')
  var	 userName = document.getElementById('usernameInPoster')
  var fullname = document.getElementById('nameInPoster')
  const auth = firebase.auth()

  logout_btn.addEventListener('click',e=>{
    const promise = auth.signOut();
    promise.catch(e=>alert(e.message));
  });

  update_btn.addEventListener('click',e=>{
    	var database = firebase.database();
        userref = database.ref('Users');
        currentuser = userref.child(auth.currentUser.uid);
	currentuser.child("firstName").set(fname.value);
	currentuser.child("lastName").set(lname.value);
	currentuser.child("email").set(email.value);
	currentuser.child("password").set(password.value);
	currentuser.child("phoneNumber").set(phoneNumber.value);
  });

  auth.onAuthStateChanged(firebaseUser=>{
        if(firebaseUser==null)
        {
           window.location.href="index.html";
        }
      else{
           var database = firebase.database();
           userref = database.ref('Users');
           currentuser = userref.child(auth.currentUser.uid);

           currentuser.on('value',function(snapshot){
                 fname.value = snapshot.val().firstName;
	               lname.value = snapshot.val().lastName;
                 email.value = snapshot.val().email;
		             phoneNumber.value = snapshot.val().phoneNumber;
		             password.value = snapshot.val().password;
		             fullname.innerHTML = fname.value+" "+lname.value;
   		           userName.innerHTML = email.value;
           });
        }
  });

}())
