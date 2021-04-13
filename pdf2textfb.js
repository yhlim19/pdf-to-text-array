//prompt input
const prompt = require('prompt-sync')();

//input Exam Info
const examNo = prompt('Exam Info:');

//input Exam Title
const examTitle = prompt('Exam Title:');

//input Exam Paper Name:
const paperName = prompt('Exam Paper Name:');

//input exam link
const examLink = prompt('Exam Paper Link:');

//input start time
const timeStart = prompt('Exam Start Time:');

//input end time
const timeEnd = prompt('Exam End Time:');

//input participants
const participants = prompt('Participants ID:');



//firebase end
const admin = require('firebase-admin');

const serviceAccount = require('D:/firebase/tfjsdemo-f5004-firebase-adminsdk-gjlk1-857a2b822a.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


const docRef = db.collection('examsInfo').doc(`${examNo}`);

//Title
var update = async (eT) => {
  await docRef.set({
    title: eT,
  }, {merge:true});
}
var eT=`${examTitle}`;
update(eT);


//examlink
var update = async (link) => {
  await docRef.set({
    examLink: link,
  }, {merge:true});
}
var link=`${examLink}`;
update(link);

//startTime
var update = async (stime) => {
  await docRef.set({
    timeStart: stime,
  }, {merge:true});
}
var stime=`${timeStart}`;
update(stime);

//endTime
var update = async (etime) => {
  await docRef.set({
    timeEnd: etime,
  }, {merge:true});
}
var etime=`${timeEnd}`;
update(etime);


//Participants
var update = async (IDArray) => {
  await docRef.set({
    participants: IDArray,
  }, {merge:true});
}
var ID=`${participants}`;
var IDArray= ID.split(" ");
update(IDArray);
//console.log (IDArray);


//susWords
var update = async (uniqueArray) => {
  await docRef.set({
    suspiciousText: uniqueArray,
  }, {merge:true});
}

var path = require('path')
var filePath = path.join(__dirname, `./${paperName}.pdf`)
var extract = require('pdf-text-extract')
extract(filePath, { splitPages: false }, function (err, data) {
  if (err) {
    console.dir(err)
    return
  }
  //console.dir(data)
  
//extract string from Json Formatted array
  finalString = '';
  for (i=0; i<data.length; i++){
    finalString += data[i];
  }
  //console.log(finalString);

// Replace all regex in the string
  finalString = finalString.replace(/(\r\n|\n|\r)/gm, ""); 
  filteredString = finalString.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
  //console.log(filteredString)

// Convert String back to Array 
  string_to_array = function(str){
    return str.trim().toLowerCase().split(" ");
  };
  suspWordArray = string_to_array(filteredString);
  //console.log(suspWordArray);

// Remove empty elements in array
  filteredArray = suspWordArray.filter(el =>{
    return el != '' && el != null;
  });

// Filter repeated values in array
  uniqueArray = filteredArray.reduce(function(a,b){
    if (a.indexOf(b)<0 ) a.push(b);
    return a;
  },[]);
  //console.log(uniqueArray);

  update(uniqueArray)
})