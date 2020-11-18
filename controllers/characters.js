let express = require ('express')
let db= require ('../models')
let router = express.Router()
const axios = require('axios') 
// const isLoggedIn= require('./middleware/isLoggedIn')

////////PAGE WITH ALL CHARACTERS///////////

// GET / - main index of site
router.get('/', function(req, res) {
    const rickMortyUrl= 'https://rickandmortyapi.com/api/character'
    // Use request to call the API
    axios.get(rickMortyUrl).then( function(apiResponse) {
      const characters = apiResponse.data
      
      res.render('characters/index', {characters: characters});
      // res.send(characters)
    })
    .catch((err)=>{
      console.log(err)
    })
  })

  //////RENDER FAVES PAGE

  // Take one to YOUR FAVE CHARACTERS page
  router.get('/faves',function(req, res) {
    // TODO: Get all records from the DB and render to view
    db.user.findOne({ where: { id: req.user.id}, include: [db.character]})

    .then(user =>{
      console.log(user.characters)
      
        res.render('characters/faves', {favorites: user.characters})

    //   res.render('faves')
      // res.send('Render a page of favorites here');
    })
    .catch((error) => {
      console.log(error)
    }) 
  })

/////////// ADDING CHARACTERS TO DATABASE///////////

router.post('/',(req, res)=>{
let episode= [req.body.episode]
// console.log("@@@@@@@@@@@@@@@@@@@@",arr[0])
  db.character.findOrCreate({
        where:{
          name: req.body.name,
          location: req.body.location,
          image: req.body.image,
          episode: episode
        }  
    })
    .then(([foundOrCreatedChar, created])=>{
      req.user.addCharacter(foundOrCreatedChar)
      .then(newAssociation=>{
        console.log(newAssociation)
        res.redirect('/characters/faves')  
      }) 
      .catch((error) => {
        console.log(error)
      })   
    })
});

///////CHARACTERS SHOW PAGE///////////

router.get('/:id',(req, res) => {
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
router.delete('/:id',(req, res)=>{
  db.character.destroy ({
    where: {id:req.params.id}
  })
  .then(numRowsDeleted=>{
    console.log(numRowsDeleted)
    res.redirect('/characters/faves')  
  })
  .catch(err=>{
    res.send(err)
  })
})



  module.exports = router
