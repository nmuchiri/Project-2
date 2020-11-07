module.exports= (req,res, next)=>{
    if(!req.user){ // if no one is logged on
        req.flash('error', 'You must be logged in to access that page!')
        res.redirect('/auth/login')
    }else{ // someonelse is logged in currently 
        next()
    }
}