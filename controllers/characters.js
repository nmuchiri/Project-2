let express = require ('express')
let db= require ('../models')
const character = require('../models/character')
let router = express.Router()

router.post('/', (req, res) => {
    db.character.create({
      name: req.body.name
    })
    .then(character => {
       
      db.character.findOrCreate({
        where: {
          name: req.body.character
        }
        
      })
      .then(([character, created])=>{
        user.addCharacter(character)
        .then(relationInfo=>{
          console.log(`${character.name} added to ${user.name}`)
        })
      })
    })
    .then (character=>{
      res.redirect('/faves')
    })
    .catch((error) => {
      console.log(error)
    })
  })


  //////RENDER FAVES PAGE

  // Take one to YOUR FAVE CHARACTERS page
  router.get('/faves', function(req, res) {
    // TODO: Get all records from the DB and render to view
    db.character.findAll()
    .then(favorites =>{
      console.log(favorites)
        res.render('characters/faves', {favorites: favorites})

      res.render('faves')
      // res.send('Render a page of favorites here');
    })
    .catch((error) => {
      console.log(error)
    }) 
  })