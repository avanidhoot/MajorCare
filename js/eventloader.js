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
  const eventname= document.getElementById('ename');
  const eventdate = document.getElementById('edate');
  const eventlocation  = document.getElementById('elocation');
  const crowd = document.getElementById('enumber');
  const create_event_btn = document.getElementById('create_event_btn');

  create_event_btn.addEventListener('click',e=>{
    var database = firebase.database();
    userref = database.ref('Events');

    var length = 8;
    var eventID = generateID(8)
    currentuser = userref.child(auth.currentUser.uid).child(eventID);
    currentuser.child("eventName").set(eventname.value)
    currentuser.child("eventLocation").set(eventlocation.value)
    currentuser.child("eventCrowdNumber").set(crowd.value)
    currentuser.child("eventDate").set(eventdate.value.split('-')[2])
    currentuser.child("eventMonth").set(getMonthName(parseInt(eventdate.value.split('-')[1])))
    currentuser.child("eventYear").set(eventdate.value.split('-')[0])


    window.setTimeout(function(){

          window.location.reload();
    },2000);
    window.setTimeout(function(){

          window.location.reload();
    },500);
  });


  function getMonthName(monthNum){
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return months[monthNum]
  }
  function generateID(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
  }

  logout_btn.addEventListener('click',e=>{
    const promise = auth.signOut();
    promise.catch(e=>alert(e.message));
  });

  var i =0;
  var tbody = document.getElementsByTagName('tbody')[0]

  auth.onAuthStateChanged(firebaseUser=>{
        if(firebaseUser==null) //Loggout state
        {
           window.location.href="index.html";
        }
        else{
           var database = firebase.database();
           userref = database.ref('Events');
           currentuser = userref.child(auth.currentUser.uid);
           currentuser.once('value',function(snapshot){
             var row = new Array();
                snapshot.forEach(function(childSnapshot){

                    row.push(new Array(i+1,childSnapshot.val().eventName,childSnapshot.val().eventLocation,
                        childSnapshot.val().eventCrowdNumber,childSnapshot.val().eventDate+" "+childSnapshot.val().eventMonth))
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
