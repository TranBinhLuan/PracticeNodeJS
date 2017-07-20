const express    = require('express')
const app        = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const getAge = require('./getAge')

const port = process.env.PORT       // set our port

app.post('/calculate-age', function (req, res) {
    let age = req.body.birthday
    if (age.length === 0) {
        res.send({success : false, message: "age is empty"})
    } else {
        let data = getAge.age(age)
        res.send({success : true, age: JSON.stringify(data)})
    }
})

//CLI App
process.argv.slice(2).map(function(y, i) {
    y = y.split('=');
    if (y[0] === '--birthday') {
        let age = getAge.age(y[1])
        console.log({age : JSON.stringify(age)})
    } else {
        console.log("key is birthday")
    }
});

app.listen(port);

