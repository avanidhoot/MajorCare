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

  const profilepic = document.getElementById('profilepic')
  const profilepicselector = document.getElementById('profilepicinput')
  const profilepicimg = document.getElementById('profilepicimage');
  const change_pass_btn = document.getElementById('change_pass_btn');
  const currentpass = document.getElementById('current_pass')
  const newpass = document.getElementById('pass')
  const conpass = document.getElementById('con_pass')
  const logout_btn = document.getElementById('logout_btn');
  const name = document.getElementById('name')
  const email = document.getElementById('email')
  const location = document.getElementById('location')
  const update_btn = document.getElementById('update_btn')
  var	 userName = document.getElementById('usernameInPoster')
  var fullname = document.getElementById('nameInPoster')
  const auth = firebase.auth()

  logout_btn.addEventListener('click',e=>{
    const promise = auth.signOut();
    promise.catch(e=>alert(e.message));
  });

change_pass_btn.addEventListener('click',e=>{
  var user = firebase.auth().currentUser;

  user.updatePassword(newpass.value).then(function() {
      window.location.reload
  }, function(error) {
    // An error happened.
  });
});
  profilepicselector.addEventListener('change', e=>{
    console.log("this is the most stupid thing i have ever seen");
    profilepicimg.src = profilepicselector.value;
  });

  update_btn.addEventListener('click',e=>{
    	var database = firebase.database();
        console.log(auth.currentUser.uid);
        userref = database.ref('Organisations');
        currentuser = userref.child(auth.currentUser.uid);
	currentuser.child("organisationName").set(name.value);
	currentuser.child("organisationLocation").set(password.value);
  currentuser.child("organisationUsername").set(password.value);

  });

  // if (fullPath) {
  //     var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
  //     var filename = fullPath.substring(startIndex);
  //     profilepic.src = filename;
  //     if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
  //         filename = filename.substring(1);
  //     }
  //     alert(filename);
  // }
  auth.onAuthStateChanged(firebaseUser=>{
        if(firebaseUser==null)
        {
           window.location.href="index.html";
        }
      else{
           var database = firebase.database();
           userref = database.ref('Organisations');
           currentuser = userref.child(auth.currentUser.uid);

           currentuser.on('value',function(snapshot){
                 name.value = snapshot.val().organisationName;
	               email.value = auth.currentUser.email;
		             location.value = snapshot.val().organisationLocation;

		             fullname.innerHTML = snapshot.val().organisationName;
   		           userName.innerHTML = auth.currentUser.email;
                 //profilepic.innerHTML ='<img class="avatar border-gray" src="'+firebase.auth().currentUser.photoURL+'"/>';
           });
        }
  });

}())
