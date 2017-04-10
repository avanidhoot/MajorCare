( function(){
  // Initialize Firebase
/*
  var config = {
    apiKey: "AIzaSyBNFYsVk-JwYK8gJlHCFO5ZyYpBxqRXNJo",
    authDomain: "care-5571b.firebaseapp.com",
    databaseURL: "https://care-5571b.firebaseio.com",
    projectId: "care-5571b",
    storageBucket: "care-5571b.appspot.com",
    messagingSenderId: "81353950576"
  };
  firebase.initializeApp(config);
*/
  const email = document.getElementById('email')
  const password = document.getElementById('pwd')
  const auth = firebase.auth()


    
    const logout_btn = document.getElementById('logout_btn');
    logout_btn.addEventListener('click',e=>{
      alert("Click Kara");
    const promise = auth.signOut();
    promise.catch(e=>alert(e.message));
  });
    

    auth.onAuthStateChanged(firebaseUser=>{ 
        if(firebaseUser==null) //Loggout state
        {
        window.location.href="E:/project/major-project/MajorCare/index.html";   
        }
    });
}())