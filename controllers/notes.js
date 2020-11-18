let express = require('express')
let db = require('../models')
let router = express.Router()
// const isLoggedIn= require('./middleware/isLoggedIn')



router.get('/', (req, res) => {
    db.user.findOne({
      where:{id: req.user.id},
      include: [db.note]
    })
    .then((user) => {
        console.log('@@@@@@@@@@@@@@@', user)
      res.render('notes/show', { user: user })
    })
    
    .catch((error) => {
      console.log(error)
    })
  })



// router.get('/:id', (req, res) => {
//     console.log('/////////////', req.note.id)
//     db.note.findOne({
//       where: { id: req.note.id}, include: [db.character]
//     })
//     .then((foundNote) => {
//       console.log(foundNote.character)
//       res.render('notes/show', {foundNote:foundNote.character })
//     })
//     .catch((error) => {
//       console.log(error)
//     })
//   })



router.post('/', (req, res) => {
    // console.log(req.body)
    db.note.create({
        content: req.body.content,
        characterId: req.body.characterId,
    })
    .then((createdNote) => {
      console.log(createdNote)
      res.render('notes/index', {createdNote: createdNote.dataValues})
    })
    .catch((error) => {
        console.log(error)
    })
  })


//   router.delete('/:id', (req, res)=>{
//     db.note.destroy ({
//       where: {id:req.params.id}
//     })
//     .then(numRowsDeleted=>{
//       console.log(numRowsDeleted)
//       res.redirect('/characters/faves')  
//     })
//     .catch(err=>{
//       res.send(err)
//     })
//   })
  
router.put('/:id',(req, res) => {
  console.log('@@@@@@@@@@@@@@@', req.body.note)
  console.log('@@@@@@@@@@@@@@@', req.params.id)
    db.note.update(
         {note: req.body.note},
         {where: {id: req.params.id}}
      )
      .then((newNote) => {
        console.log("This is my comment", newNote)
        // newComment.
        res.redirect(`/notes`)
      })
      .catch((err) => {
        res.send(err)
      })
  })


  module.exports = router