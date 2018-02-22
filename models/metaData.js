const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//En kommentar for kunne kommitte denna åsså

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
const metadataSchema = new Schema({
  "media": {type: String, required: [true, 'Skal enten vaere Video eller Bilde']},
  "duration": Number,
  "container": String,
  "resolution_w": Number,
  "resolution_h": Number,
  "fps": Number,
  "absolute_path": String,
  "filnavn": String,
  "ModifyDate": String,
  "Make": String,
  "Model": String,
  "CreateDate": String,
  "ExifImageHeight": Number,
  "ExifImageWidth": Number,
  "DateTimeOriginal": String,
  //"geometry": GeoSchema
  });

//Vil lage en collection med navn bibinfo
const metadataModel = mongoose.model('mediametadata', metadataSchema);

//Gjør denne tilgjengelig i andre filer.
module.exports = metadataModel;
