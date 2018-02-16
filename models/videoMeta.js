const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Schema¨and Model
const videoMetaSchema = new Schema({
  //Hemter fra IMAGE tag i json videometafil
  "absolute_path": String,
  "filnavn": String,
  "date": Date,
  //Henter fra DURATION.seconds
  "duration": Number,
  "container": String,
  "resolution_w": Number,
  "resolution_h": Number,
  "fps": Number

  });

//Vil lage en collection med navn bibinfo
const videoMeta = mongoose.model('videoMeta', videoMetaSchema);

//Gjør denne tilgjengelig i andre filer.
module.exports = videoMeta;
