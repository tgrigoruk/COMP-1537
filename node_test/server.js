const express = require('express');
const app = express();

app.listen(5001, function (err) {
    if (err) console.log(err);
})

app.get('/', function (req, res) {
    res.send('GET request');
    // res.send('this <a href="">link</a> is here');
})

// localhost:5001/?q=Toronto&appid=12345

// app.get('/', function (req, res) {
//     res.write(`Weather of ${req.query['q']} is something`);
// })


// app.get('/', function (req, res) {
//     res.json({

//     })
// })

