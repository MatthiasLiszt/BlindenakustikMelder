//requirements
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const config = require('./config/database')
const express = require('express')
const exphbs = require('express-handlebars')
const expressValidator = require('express-validator')
const app = express()
const port = 3000

var db = mongoose.connection;

const dtrash=[]

//copied from Srdjan's code ; altered to be used with var db
mongoose.connect(config.database);

db.on('connected', () => {
  console.log('Connected to database '+config.database);
  //console.log('db = '+db)
});

db.on('error', (err) => {
  console.log('Database error '+err);
});



app.listen(port, (err) => {

if (err) {
return console.log('something bad happened', err)
}
console.log(`server is listening on ${port}`)
})
 
//defining schema and model and tryping to access
// unfortunately currently not working 

var Schema = mongoose.Schema

var getCrossingById = new Schema ({
   qrossing : String
  
})

var getCrossingByIdModel = mongoose.model('getCrossingByIdModel', getCrossingById)

getCrossingByIdModel.find( {"id" : "AKUSTISCHEAMPELOGD.431"},function(err,ckrossing){
  if (err) return handleError(err);
  console.log("data from db "+ckrossing)
})

//handlebar code

app.engine('.hbs', exphbs({
defaultLayout: 'main',
extname: '.hbs',
layoutsDir: path.join(__dirname, 'hbs')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'hbs'))



//my own mustard

app.get('/crossing', (req, res) => {
dtrash.push(req.param('encrypted'))
res.render('crossing', {
 crossing: 'Johnstrasse'
 })
})

app.get('/', (req, res) => {

res.render('login') 
})

app.get('/error',(req,res) => {
//dtrash.push(req.param) adds real trash
dtrash.push(req.param('crossing'))
res.render('error')
})

app.get('/danke',(req,res) => {
dtrash.push(req.param('button'))
console.log(req.param('button'))
res.render('danke', { datatrash: dtrash })
})

