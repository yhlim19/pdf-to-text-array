var path = require('path')
var filePath = path.join(__dirname, './${paperName}.pdf')
var extract = require('pdf-text-extract')
extract(filePath, { splitPages: false }, function (err, data) {
  if (err) {
    console.dir(err)
    return
  }
 // console.dir(data)
  
//extract string from Json Formatted array
  finalString = '';
  for (i=0; i<data.length; i++){
    finalString += data[i];
  }
 // console.log(finalString);

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
  //console.log (filteredArray);

// Filter repeated values in array
  uniqueArray = filteredArray.reduce(function(a,b){
    if (a.indexOf(b)<0 ) a.push(b);
    return a;
  },[]);
  console.log(uniqueArray);

})