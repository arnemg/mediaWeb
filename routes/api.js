const express = require('express');
const router = express.Router();
const Bilde = require('../models/bildeMeta');

//Hent liste av media fra databasen
router.get('/media', function(req, res, next){
  Bilde.aggregate().near({
        near: { type: "Point", coordinates: [parseFloat(req.query.lng) , parseFloat(req.query.lat)] },
                    distanceField: "dist.calculated",
                    maxDistance: 100000,
                    spherical: true
        }).then(function(bilder){
            res.send(bilder);
        }).catch(next);
    });


//Legge til media
router.post('/media', function(req, res, next){
//lager en instans av bildeMeta via require bildeMeta.js
// denne instansen er tom og klar for å fylles med data fra brukeres(req.body)
//det er en forutsetning at data inn (req.body) er formatert som JSON
// så lagres denne instansen (/med data) til databasen med save()
  Bilde.create(req.body).then(function(bilde){
    res.send(bilde);
  }).catch(next); //Jump to next midleware in index.js
  //Metoden over vil lage en ny instans av Bilde, populere med data (req.body)
  // så lagres den til mongoose databasen
  //Den vil lage et PROMISE, som vi må håndtere i then(function(bilde)) bilde
  //er det som ble lagret i databse. Dette sender vi tilbake til brukes (response)

});//POST

// Oppdaterer et media -- :id brukes som en variabel senere
router.put('/media/:id', function(req, res, next){
  Bilde.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    //Finner den nye oppdaterte bildeMeta
    Bilde.findOne({_id: req.params.id}).then(function(bilde){
    res.send(bilde);
    });
  });
});


// Slette et media fra basen
router.delete('/media/:id', function(req, res, next){
  Bilde.findByIdAndRemove({_id: req.params.id}).then(function(bilde){
    res.send(bilde);
  });
});

module.exports = router;
