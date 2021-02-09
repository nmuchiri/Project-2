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
const methodOverride= require('method-override')
const path= require('path')
// const character = require('./models/character.js')
// const user = require('./models/user.js')

////////MIDDLEWARE////////////////////
// setup ejs and ejs layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.static(__dirname + '/public'))
app.use(methodOverride('_method'))

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
app.use('/characters',isLoggedIn, require('./controllers/characters'))
app.use('/notes', isLoggedIn, require('./controllers/notes'))


///////////////////MIDDLE WARE////////////////////

app.get ('/', (req, res)=>{
    
res.render('home')

})

app.get('/profile', isLoggedIn, (req,res)=>{
    res.render('profile')
})


app.listen(process.env.PORT || 8000, ()=>{
    console.log("Unaskiza spooky sounds za port 8000")
})