const express= require('express')
const router= express.Router()
const db=require('../models')
const passport= require ('../config/ppConfig.js')


router.get('/login', (req, res)=>{
    res.render('auth/login')
})


router.post('/login', passport.authenticate('local',{
    // console.log("Trying to log in with this unput:", req.body)
    failureRedirect:'/auth/login',
    successRedirect: '/',
    failureFlash: 'invalid email or password!',
    successFlash: 'You are now logged in'
    
    //redirect to home page

    // res.redirect('/')
}))


 router.get('/logout',(req,res)=>{
     req.logout()
     req.flash('success', 'Success! You\'re now logged out!')
     res.redirect('/')
 })



router.post('/signup', (req, res)=>{
    console.log('Sign-up form user input:',req.body)
   
    // check if the user already exists
    //if it does, throw and error message
    //otherwise create a new user and store them in the db
     db.user.findOrCreate({
         where:{ email: req.body.email}, // check if email is already in db
         defaults: {
             name: req.body.name,
             password: req.body.password
         }
     })
     .then (([createdUser, wasCreated])=>{

        if(wasCreated){
            console.log(`just created the following user:`, createdUser)

            //log in new user
            passport.authenticate('local', {
                successRedirect: '/',
                successFlash:'Account created and logged in!'

            })(req, res) // IIFE- immediately invocked function
        }else{
            req.flash('error', 'email already exists, try loggin in!')
            // console.log("an account associated with that email address already exists! Try loggin in!")
            res.redirect('/auth/login')
        }
    
   
     })
    .catch (err =>{
        req.flash('error', err.message)

    })
})



router.get('/signup', (req, res)=>{
    res.render('auth/signup')
})


module.exports=router