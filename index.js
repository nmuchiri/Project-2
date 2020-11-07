require('dotenv').config()
const express= require('express')
const app = express()
const ejsLayouts= require('express-ejs-layouts')
const session= require('express-session')
const passport= require('./config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn= require('./middleware/isLoggedIn')
const axios = require('axios'); 

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


///////////////////MIDDLE WARE////////////////////

app.get ('/', (req, res)=>{
    
res.render('home')

})

app.get('/profile', isLoggedIn, (req,res)=>{
    res.render('profile')
})



////////////CHARACTERS API/////////

// GET / - main index of site
app.get('/characters', function(req, res) {
    // const poetryUrl = 'https://www.poemist.com/api/v1/randompoems';
    const rickMortyUrl= ' https://rickandmortyapi.com/api/character'
    // Use request to call the API
    axios.get(rickMortyUrl).then( function(apiResponse) {
      const characters = apiResponse.data.results
      res.render('characters/index', {characters: characters});
      // res.send(apiResponse.data.results)
    })
    .catch((err)=>{
      console.log(err)
    })
  });




app.listen(process.env.PORT, ()=>{
    console.log("Unaskiza spooky sounds za port 8000")
})