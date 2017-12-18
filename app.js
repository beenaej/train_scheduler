// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var config = {
    apiKey: "AIzaSyAowVILBPSJzwI14ahgEaWlBx7iCxuBTxw",
    authDomain: "myfirstproject-96188.firebaseapp.com",
    databaseURL: "https://myfirstproject-96188.firebaseio.com",
    projectId: "myfirstproject-96188",
    storageBucket: "myfirstproject-96188.appspot.com",
    messagingSenderId: "796599631469"
  };


  firebase.initializeApp(config);
// Assign the reference to the database to a variable named 'database'
//var database = ...
var database = firebase.database();

// Initial Values
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;

$("#submit").on("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
  trainName = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  firstTrainTime = $("#firstTrainTime").val().trim();
  frequency = $("#frequency").val().trim();

  

    // Save the new price in Firebase
     database.ref().push({     //using push instead of set so you dont overwrite the values
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });

 database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
     
      // var nextArrival = "";
      // var minutesAway = 0;
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();
    var tFrequency = frequency;
    console.log("First Train time is: "+ firstTrainTime);
    console.log("frequency is: "+ frequency)
   
    var firstTime = firstTrainTime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log("First train time converted: " +firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + nextTrain);//moment(nextTrain).format("hh:mm"));

        // full list of items to the well
      $("#trainTable").append("<tr><td id='tableTrainName'> " + childSnapshot.val().trainName +
        " </td><td id='tableDestination'> " + childSnapshot.val().destination +
        " </td><td id='tableFrequency'> " + childSnapshot.val().frequency +
        " </td><td id='tableNextArrival'> " + nextTrain + 
        " </td><td id='tableMinutesAway'> " + tMinutesTillTrain + " </td></tr>");

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

  