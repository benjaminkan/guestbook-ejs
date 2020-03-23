var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.locals.pretty = true;

app.use(express.static('guestbook/'));

// Home page
app.get('/', function (req, res) {
    res.render('pages/index');
});

// Message page
app.get('/message', function (req, res) {

    res.render('pages/message', {
        jsondata: require("./json_guestbook_data.json")
    });
});

// New message page
app.get('/newmessage', function (req, res) {
    res.render('pages/newmessage');
});

app.post('/newmessage', function (req, res) {
    var data = require("./json_guestbook_data.json");

    data.push({
        "username": req.body.username,
        "country": req.body.country,
        "message": req.body.message,
        "date": new Date()
    });

    var jsonStr = JSON.stringify(data);

    fs.writeFile("./json_guestbook_data.json", jsonStr, err => {
        if (err) throw err;
        console.log("Message sent!");
    });
    res.render('pages/messagesent');
});

app.get('*', function (req, res) {
    res.render('pages/404');
});

const port = process.env.PORT || 8081;
app.listen(port);
console.log("Guestbook app listening on port 8081!");