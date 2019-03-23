  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCMNNNJBDv0G3_13kDsf6Xfwwd2FbT59eE",
    authDomain: "jc-sc-predictions.firebaseapp.com",
    databaseURL: "https://jc-sc-predictions.firebaseio.com",
    projectId: "jc-sc-predictions",
    storageBucket: "jc-sc-predictions.appspot.com",
    messagingSenderId: "843324630045"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  var guesserList = database.ref('/guesser');
  
  var name = "";
  var propDate = "MM/DD/YY";
  var marryDate = "MM/DD/YY";
  var betting = true;
  var nameValue = $("#inlineFormCustomSelect").val();
  var brother = $("#inlineFormCustomSelect").val();
  var todayDate = new Date();

  // ("0" + (this.getMonth() + 1)).slice(-2)
  var today = ("0" + (todayDate.getMonth() + 1)).slice(-2) + "/" + ("0" + (todayDate.getDay())).slice(-2) + "/" + (todayDate.getFullYear().toString().slice(2));
  guesserList.on('child_added', function(snap){

    $(`#${snap.val().brother.toLowerCase()}Table`).append(`
    <tr>
    <td>${snap.val().name}</td>
    <td>${snap.val().today}</td>
    <td>${snap.val().propDate}</td>
    <td>${snap.val().marryDate}</td>
    <td>${snap.val().betting}</td>
    </tr>
    `)
    
  })
  
  function sendToServer() {
    var newRow = $("<div>");
      newRow.addClass("doesThisWork");
      newRow.append("<div class='row'>");

      brother = $("#inlineFormCustomSelect").val();
      name = $("#yourName").val().trim();
      propDate = $("#propDate").val().trim();
      marryDate = $("#marryDate").val().trim();
      betting = $("#betting").is(":checked");
      console.log(betting);

      database.ref("/guesser").push({
        today: today,
        brother: brother,
        name: name,
        propDate: propDate,
        marryDate: marryDate,
        betting: betting ? "Yes" : "No"
      })
  }

  $("#submitButton").on("click", function() {
    event.preventDefault();
    
    nameValue = $("#inlineFormCustomSelect").val();
    console.log(nameValue);

    if (nameValue === "Jacob") {
      sendToServer();
    } else if (nameValue === "Sam") {
      sendToServer();
    } else {
      alert("wrong");
    };
    });