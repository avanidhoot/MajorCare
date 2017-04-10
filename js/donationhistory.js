(function(){
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

  const logout_btn = document.getElementById('logout_btn');
  const auth = firebase.auth()

  logout_btn.addEventListener('click',e=>{
    const promise = auth.signOut();
    promise.catch(e=>alert(e.message));
  });
  var i =0;
  var tbody = document.getElementsByTagName('tbody')[0]
  var row = new Array();
  auth.onAuthStateChanged(firebaseUser=>{
        if(firebaseUser==null) //Loggout state
        {
           window.location.href="index.html";
        }
        else{
           var database = firebase.database();
           userref = database.ref('Donations');
           currentuser = userref.child(auth.currentUser.uid);
           currentuser.once('value',function(snapshot){
                snapshot.forEach(function(childSnapshot){
                    row.push(new Array(i,"28/3/17",childSnapshot.val().donationAmount,childSnapshot.val().organisationName,childSnapshot.val().donationStatus))
                    var tr = document.createElement('tr')
                    var j=0
                    while(j<row[i].length){
                      var td = document.createElement('td')
                      td.appendChild(document.createTextNode(row[i][j]))
                      tr.appendChild(td)
                      j=j+1
                    }
                    i=i+1
                    tbody.appendChild(tr)
                });
          });
          }

  });

}())
