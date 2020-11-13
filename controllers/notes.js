let express = require('express')
let db = require('../models')
let router = express.Router()


router.post('/', (req, res) => {
    // console.log(req.body)
    db.note.create({
        content: req.body.content,
      characterId: req.body.characterId 
    })
    .then((createdNote) => {
    //   console.log('@@@@@@@@@@@@@@@@@@@@',createdNote)
      res.render('notes/index', {createdNote: createdNote.dataValues})
    //   res.send("A page with notes about characters")
    })
    .catch((error) => {
        console.log(error)
    })
  })


// router.post('/',(req, res)=>{
    
//       db.note.findOrCreate({
//             where:{
//               content: req.body.content,
//               characterId: req.body.characterId
//             }  
//         })
//         .then(([foundOrCreatedNote, created])=>{
//           req.character.addNote(foundOrCreatedNote)
//           .then(newAssociation=>{
//             console.log(newAssociation)
//             res.render('notes/index')  
//           }) 
//           .catch((error) => {
//             console.log(error)
//           })   
//         })
//     });
    



router.get('/:id', (req, res) => {
  db.note.findOne({
    where:{id: req.params.id},
    include: [db.character]
  })
  .then((notes) => {
      console.log('@@@@@@@@@@@@@@@', notes)
    res.render('notes/show', { notes: notes.dataValues })
  })
  
  .catch((error) => {
    console.log(error)
  })
})


  module.exports = router