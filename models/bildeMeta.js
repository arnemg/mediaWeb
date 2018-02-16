const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const GeoSchema = new Schema({
  type:{
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});

//Create Schema and Model
const bildeMetaSchema = new Schema({
  //Hemter fra IMAGE tag i json bildemetafil
  "absolute_path": String,
  "filnavn": String,
  "ModifyDate": String,
  //Henter fra EXIF
  "Make": {type: String, required: [true, 'Make er et required field']},
  "Model": String,
  "CreateDate": String,
  "ExifImageHeight": Number,
  "ExifImageWidth": Number,
  "DateTimeOriginal": String,
  "geometry": GeoSchema
  //Henter fra GPS
  //"GPSLongitude":[String, String, String],
  //"GPSLatitude": [String, String, String]
  });

//Vil lage en collection med navn bibinfo
const bildeMetaModel = mongoose.model('bildeMeta', bildeMetaSchema);

//Gjør denne tilgjengelig i andre filer.
module.exports = bildeMetaModel;
