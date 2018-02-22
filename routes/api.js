const express = require('express');
const router = express.Router();
const Media = require('../models/metaData');


router.get('/', function(req, res, next) {
    var myParam = "Dette er en tekstlinje";
    res.render('pages/index', {myParam});
});

// bilder page
router.get('/bilder', function(req, res, next) {
      Media.find({ 'media': 'Video' }).then(function(bilder){
        res.render('pages/bilder', {bilder} );
        //res.send(resultat);
      });
    });

// about page
router.get('/about', function(req, res, next) {
    res.render('pages/about', {title: 'Dette er about Tittelen'});
});

//Hent liste av media fra databasen
router.get('/media', function(req, res, next){
  Media.find().then(function(resultat){
    res.send(resultat);
  });
});

//Legge til media
router.post('/media', function(req, res, next){
  console.log("Er i POST ");
//lager en instans av mediaMeta via require mediaMeta.js
// denne instansen er tom og klar for å fylles med data fra brukeres(req.body)
//det er en forutsetning at data inn (req.body) er formatert som JSON
// så lagres denne instansen (/med data) til databasen med save()
  Media.create(req.body).then(function(media){
    res.send(media);
  }).catch(next); //Jump to next midleware in index.js
  //Metoden over vil lage en ny instans av Media, populere med data (req.body)
  // så lagres den til mongoose databasen
  //Den vil lage et PROMISE, som vi må håndtere i then(function(media)) media
  //er det som ble lagret i databse. Dette sender vi tilbake til brukes (response)

});//POST

// Oppdaterer et media -- :id brukes som en variabel senere
router.put('/media/:id', function(req, res, next){
  console.log("Er i PUT");
  Media.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    //Finner den nye oppdaterte mediaMeta

    Media.findOne({_id: req.params.id}).then(function(media){
    res.send(media);

    });
  });
});


// Slette et media fra basen
router.delete('/media/:id', function(req, res, next){
  console.log("Er i DELETE");
  Media.findByIdAndRemove({_id: req.params.id}).then(function(media){
    res.send(media);
    console.log("Just DELETED --> " + req.params.id);
  });
});

module.exports = router;
