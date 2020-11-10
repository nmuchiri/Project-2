require('dotenv').config()
const express= require('express')
const app = express()
const ejsLayouts= require('express-ejs-layouts')
const session= require('express-session')
const passport= require('./config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn= require('./middleware/isLoggedIn')
const axios = require('axios') 
let db= require ('./models')
// const character = require('./models/character.js')
// const user = require('./models/user.js')

////////MIDDLEWARE////////////////////
// setup ejs and ejs layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// body parser middleware- allows us to use req.body
app.use(express.urlencoded({extended:false}))

//session middleware
app.use(session({
    secret:process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: true
}))

// passport middleware

app.use(passport.initialize())
app.use(passport.session())


// flash middleware
app.use(flash())


//custom middleware

app.use ((req,res, next)=>{
// before every route, attach the flash messages and current user to res.locals
// this will give us access to these values in all our ejs pages

    res.locals.alerts= req.flash()
    res.locals.currentUser = req.user
    next()// move on to the next piece of middleware
})
// use controllers
app.use('/auth', require('./controllers/auth.js'))
app.use('/characters', require('./controllers/characters'))


///////////////////MIDDLE WARE////////////////////

app.get ('/', (req, res)=>{
    
res.render('home')

})

app.get('/profile', isLoggedIn, (req,res)=>{
    res.render('profile')
})



////////////CHARACTERS API/////////

// // GET / - main index of site
// app.get('/characters', function(req, res) {
//     const rickMortyUrl= ' https://rickandmortyapi.com/api/character'
//     // Use request to call the API
//     axios.get(rickMortyUrl).then( function(apiResponse) {
//       const characters = apiResponse.data.results
//       res.render('characters/index', {characters: characters});
//       // res.send(apiResponse.data.results)
//     })
//     .catch((err)=>{
//       console.log(err)
//     })
//   });


// POST /characters - receive the name of a character and add it to the database
// app.post('/characters', function(req, res) {
//   // TODO: Get form data and add a new record to DB
  
//   db.character.findOrCreate({
//         where:{name: req.body.character
         
          
//         }
        
//     })
//     console.log(req.body.character)
//     .then(([foundOrCreatedUser, created])=>{


//     res.redirect('/characters')        
//     })
// });



  // app.get('/characters/faves', function(req, res) {
  //    // TODO: Get all records from the DB and render to view
  //   db.character.findAll()
  //   .then(favorites =>{
  //     console.log(favorites)
  //       res.render('characters/faves', {favorites: favorites})
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   }) 
  // })

  // app.get('/characters/:id', (req, res) => {
  //   db.character.findOne({
  //     where: { id: req.params.id }
  //   })
  //   .then((character) => {
  //     console.log(character)
  //     res.render('characters/show', {character: character })
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // })



app.listen(process.env.PORT, ()=>{
    console.log("Unaskiza spooky sounds za port 8000")
})