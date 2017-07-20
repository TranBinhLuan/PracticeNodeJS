const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const CustomerAge = require('./getAge')

const port = 7515      // set our port

app.post('/calculate-age', function (req, res) {
  let birthday = req.body.birthday
    console.log(birthday)
  if (birthday == 'fail') {
    res.send({success: false, message: 'format birthday yyyy/m/d'})
  } else {
    if (birthday.length == 0) {
     res.send({success: false, message: 'birthday is empty'})
    } else {
     let data = CustomerAge.getAge(birthday)
     res.send({success: true, age: JSON.stringify(data)})
    } 
  }
  
})

process.argv.slice(2).map(function (y, i) {
  birthDay = y.split('=')
  if (birthDay[0] === '--birthday') {
    let age = CustomerAge.getAge(birthDay[1])
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
