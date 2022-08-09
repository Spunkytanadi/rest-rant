const router = require('express').Router()
const db = require('../models')
const places = require('../models/place')

router.get('/', (req, res) => {
  db.Place.find()
    .then((places) => {
      res.render('places/index', {places})
    })
    .catch(err => {
      console.log(err)
      res.render('error404')
   })
})

router.post('/', (req, res) => {
  db.Place.create(req.body)
  .then(() => {
    res.redirect('/places')
  })
  .catch(err => {
    if (err && err.name == 'ValidationError') {
      let message = 'Validation Error:'
      for (var field in err.errors){
        message += `${field} was ${err.errors[field].value}`
        message += `${err.errors[field].message}`
      }
      console.log('Validation error message', message)
      res.render('places/new', {message})
    }
    else {
      res.render('error404')
    }
  })
})

router.get('/new', (req, res) => {
  res.render('places/new')
})

router.get('/:id', (req, res) => {
  db.Place.findById(req.params.id)
  .then(place => {
    res.render('places/show', {place})
  })
  .catch(err => {
    console.log('err', err)
    res.render('error404')
  })
})

router.put('/:id', (req, res) => {
  let id = Number(req.params.id)
  if (isNaN(id)){
    res.render('error404')
  }
  else if(!places[id]){
    res.render('error404')
  }
  else{
    if(!req.body.pic){
      req.body.pic = 'http://placekitten.com/400/400'
    }
    if(!req.body.city){
      req.body.city = 'Anytown'
    }
    if(!req.body.state){
      req.body.state = 'USA'
    }
    places[id] = req.body
    res.redirect(`/places/${id}`)
  }
})

router.delete('/:id', (req, res) => {
  let id = Number(req.params.id)
  if(isNaN(id)) {
    res.render('error404')
  }
  else if (!places[id]){
    res.render('error404')
  }
  else{
    places.splice(id, 1)
    res.redirect('/places')
  }
})

router.get('/:id/edit', (req, res) => {
  let id = Number(req.params.id)
  if(isNaN(id)){
    res.render('error404')
  }
  else if(!places[id]){
    res.render('error404')
  }
  else {
    res.render('places/edit', {places: places[id]})
  }
})

router.post('/:id/rant', (req, res) => {
  res.send('GET /places/:id/rant stub')
})

router.delete('/:id/rant/:rantId', (req, res) => {
    res.send('GET /places/:id/rant/:rantId stub')
})

module.exports = router
