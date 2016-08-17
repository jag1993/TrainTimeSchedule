

  var config = {
    apiKey: "AIzaSyAlegbPifAnWi46F_8w0Bje2pVyFQlLHGs",
    authDomain: "traintimetable-a8af2.firebaseapp.com",
    databaseURL: "https://traintimetable-a8af2.firebaseio.com",
    storageBucket: "traintimetable-a8af2.appspot.com",
  };
  firebase.initializeApp(config);




  var database = firebase.database();
  



$("#submit").on("click", function(){


var	trainNameInput = $("#trainName").val().trim();
var	destinationInput = $("#destination").val().trim();
var	firstTrainTimeInput = $("#firstTrainTime").val().trim();
var	frequencyInput = parseInt($("#frequency").val().trim());




   
    var firstTrainTimeConverted = moment(firstTrainTimeInput,"hh:mm").subtract(1, "years");
    console.log(firstTrainTimeConverted);

    // Current Time
    var timeNow = moment();
    console.log("CURRENT TIME: " + moment(timeNow).format("hh:mm"));

    // Difference between the times
    var timeGap = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + timeGap);

    // Time apart (remainder)
    var timeApart = timeGap % frequencyInput
    console.log(timeApart);

    // Minute Until Train
    var minsNextTrain = frequencyInput - timeApart;
    console.log("MINUTES TILL TRAIN: " + minsNextTrain);

    // Next Train
    var nextTrainTime = moment().add(minsNextTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrainTime).format("hh:mm"));
    var arrivalTime = moment(nextTrainTime).format("hh:mm");




	database.ref().push({
		trainName: trainNameInput,
		destination: destinationInput,
		firstTrainTime: firstTrainTimeInput,
		frequency: frequencyInput,
    minsNextTrain: minsNextTrain,
    arrivalTime: arrivalTime,
    timestamp: firebase.database.ServerValue.TIMESTAMP
	});


return false;
});

database.ref().on("child_added", function(childSnapshot) {
 	
	var childSnapshot = childSnapshot.val();

   var newRow= $("<tr>");
   var trainNameTD = $("<td>" + childSnapshot.trainName + "</td>" );
   var destinationTD = $("<td>" + childSnapshot.destination + "</td>" );
   var frequencyTD = $("<td>" + childSnapshot.frequency + "</td>" );
   var minutesLeftTD = $("<td>" + childSnapshot.minsNextTrain + "</td>" );
   var arrivalTimeTD = $("<td>" + childSnapshot.arrivalTime + "</td>" );

   var rowData = $(newRow).append(trainNameTD);
                  $(newRow).append(destinationTD);
                  $(newRow).append(frequencyTD);
                  $(newRow).append(minutesLeftTD);
                  $(newRow).append(arrivalTimeTD);
               
   $("#trainTimeTable").append(rowData);

});