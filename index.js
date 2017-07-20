const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()

const GetAge = require('./getAge')

const port = process.env.PORT       // set our port

app.post('/calculate-age', jsonParser, function (req, res) {
  let age = req.body.birthday
  if (age.length === 0) {
    res.send({success: false, message: 'birthday is empty'})
  } else {
    let data = GetAge.age(age)
    res.send({success: true, age: JSON.stringify(data)})
  }
})

process.argv.slice(2).map(function (y, i) {
  y = y.split('=')
  if (y[0] === '--birthday') {
    let age = GetAge.age(y[1])
    console.log({age: JSON.stringify(age)})
  } else {
    console.log('key is birthday')
  }
})
app.listen(port)
