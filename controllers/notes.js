let express = require('express')
let db = require('../models')
let router = express.Router()



// router.get('/', (req, res) => {
//     db.user.findOne({
//       where:{id: req.user.id},
//       include: [db.note]
//     })
//     .then((user) => {
//         console.log('@@@@@@@@@@@@@@@', user)
//       res.render('notes/show', { user: user })
//     })
    
//     .catch((error) => {
//       console.log(error)
//     })
//   })



router.get('/:id', (req, res) => {
    console.log(req.note)
    db.note.findOne({
      where: ({ where: { id: req.note.id}, include: [db.characteruser]})
    })
    .then((note) => {
      console.log(note.dataValues)
      res.render('notes/show', {note:note.dataValues })
    })
    .catch((error) => {
      console.log(error)
    })
  })



router.post('/', (req, res) => {
    // console.log(req.body)
    db.note.create({
        content: req.body.content,
      characterId: req.body.characterId 
    })
    .then((createdNote) => {
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
  
router.put('/:id', (req, res) => {
    console.log("😭😭", req.params);
    console.log("😭😭", req.user.id);
    db.note
      .update(
        { note: req.body.note },
        { where: { userId: req.user.id, noteId: req.params.id } }
      )
      .then((newComment) => {
        console.log("This is my comment", newComment)
        // newComment.
        res.redirect(`/notes/index/ ${req.params.id}`)
      })
      .catch((err) => {
        res.send(err)
      })
  })


  module.exports = router