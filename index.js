const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const GetAge = require('./getAge')

const port = 7515      // set our port

app.post('/calculate-age', function (req, res) {
  let age = req.body.birthday
    console.log(age)
  if (age == 'fail') {
    res.send({success: false, message: 'format birthday yyyy/m/d'})
  } else {
    if (age.length == 0) {
     res.send({success: false, message: 'birthday is empty'})
    } else {
     let data = GetAge.age(age)
     res.send({success: true, age: JSON.stringify(data)})
    } 
  }
  
})

process.argv.slice(2).map(function (y, i) {
  y = y.split('=')
  if (y[0] === '--birthday') {
    let age = GetAge.age(y[1])
    if (age == 'fail') {
      console.log('format birthday yyyy/m/d')
    } else {
      console.log({age: JSON.stringify(age)})
    }
  } else {
    console.log('key is birthday')
  }
})
app.listen(port)
