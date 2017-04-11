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

var CrossingSchema = new Schema ({
   name: String
})

var Crossings = mongoose.model('Crossings', CrossingSchema)

Crossings.find({}, function(err, crossings){
  if (err) return handleError(err);

  if (crossings.length == 0) {
    Crossings.create([{ name: 'Abermanngasse'}, {name: 'Aichholzgasse'}, {name: 'Aichhorngasse'}], function(err) {
      if (err) return handleError(err);
    });
  }
});

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
  Crossings.find({}, function(err, crossings){
    if (err) return handleError(err);

    console.log(crossings);

    res.render('crossing', {
     crossings: crossings
    });
  });
});

app.get('/', (req, res) => {
  res.render('login');
});

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

