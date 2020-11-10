let express = require ('express')
let db= require ('../models')
let router = express.Router()
const axios = require('axios') 
const character = require('../models/character')

////////PAGE WITH ALL CHARACTERS///////////

// GET / - main index of site
router.get('/', function(req, res) {
    const rickMortyUrl= 'https://rickandmortyapi.com/api/character'
    // Use request to call the API
    axios.get(rickMortyUrl).then( function(apiResponse) {
      const characters = apiResponse.data
      
      res.render('characters/index', {characters: characters});
      // res.send(apiResponse.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  })





  //////RENDER FAVES PAGE

  // Take one to YOUR FAVE CHARACTERS page
  router.get('/faves', function(req, res) {
    // TODO: Get all records from the DB and render to view
    db.character.findAll()
    .then(favorites =>{
      // favorites.forEach(favoriteChar=>{
      //    console.log(favoriteChar.image)  
      //      console.log(favoriteChar.name)
      // })
      console.log(favorites)
        res.render('characters/faves', {favorites: favorites})

    //   res.render('faves')
      // res.send('Render a page of favorites here');
    })
    .catch((error) => {
      console.log(error)
    }) 
  })

/////////// ADDING CHARACTERS TO DATABASE///////////

router.post('/',(req, res)=>{
  console.log(req.body.apiId)
  db.character.findOrCreate({
        where:{
          name: req.body.name,
          location: req.body.location,
          image: req.body.image
        }  
    })
    .then(([foundOrCreatedChar, created])=>{
      req.user.addCharacter(foundOrCreatedChar)
      .then(newAssociation=>{
        console.log(newAssociation)
        res.redirect('/')  
      }) 
      .catch((error) => {
        console.log(error)
      })   
    })
});

///////CHARACTERS SHOW PAGE///////////

router.get('/:id', (req, res) => {
    db.character.findOne({
      where: { 
        id: req.params.id
      }
    })
    .then((character) => {
      console.log(character)
      res.render('characters/show', {character: character })
    })
    .catch((error) => {
      console.log(error)
    })
  })

///////////DELETE CHARACTERS////////////
router.delete('/:id' , (req, res)=>{
  console.log(req.params.id)
  db.character.destroy({
    where: {id: req.params.id}
  }).then(()=>{
    res.redirect('/faves')
  })
})



  module.exports = router
