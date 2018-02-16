const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Set up express app - setter opp mye i bakgrunnen
const app = express();

//connect to mongo.
mongoose.connect('mongodb://localhost/MediaMetaData');
mongoose.Promise = global.Promise;


/* MIDLEWARE 0 - Handling static files html css images */
app.use(express.static('public'));


/* MIDLEWARE 1 - Håndtere informasjon fra bruker*/
//Kopler vi opp body-parser som inneholder body og kopler til request
// formaterer som JSON
app.use(bodyParser.json());


/* MIDLEWARE 2 - Inkluderer routing file*/
//Kjører api.js som inneholder alle http methods handling
app.use('/api', require('./routes/api'));

/* MIDLEWARE 3 - ERROR handling */
// Midleware funksjoner kan ta 4 parametere err, req, res og next
app.use(function(err, req, res, next){
  //console.log(err);
  res.status(422).send({error: err.message});
});

//listen for request (sette opp webserveren)
app.listen(process.env.port || 4000, function(){
  //process.env.port -- port ligger i environment. Hvis nødvendig
  console.log("Lytter nå på port 4000");
});
