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
  var employeeList = database.ref('/employee');
  
  var name = "";
  var destination = "";
  var frequency = "";
  var firstTrain = "";
  
  employeeList.on('child_added', function(snap){
    
    var nextArrival = 0;
    var minutesAway = 0;
    var firstTrain = snap.val().firstTrain;
    var frequency = snap.val().frequency;
    var currentTime = moment().format('HH:MM');
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:MM"));

    $('tbody').append(`
    <tr>
    <td>${snap.val().name}</td>
    <td>${snap.val().destination}</td>
    <td>${snap.val().frequency}</td>
    <td>${nextTrain}</td>
    <td>${tMinutesTillTrain}</td>
    </tr>
    `)
  })
  
  $("#submitButton").on("click", function() {
    event.preventDefault();

      var newRow = $("<div>");
      newRow.addClass("doesThisWork");
      newRow.append("<div class='row'>");
    
      name = $("#trainName").val().trim();
      destination = $("#destination").val().trim();
      frequency = $("#frequency").val().trim();
      firstTrain = $("#firstTrain").val().trim();

      database.ref("/employee").push({
        name: name,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain

      })
    });