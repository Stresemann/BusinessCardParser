var cp = require("./lib/card-parser")
var express = require('express');
var app = express();

app.set('view engine', 'hbs');
app.get('/', function (req, res) {
    res.render("index");
})
app.post('/', function (req, res) {
    let data = '';
    let businessText = "";
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', () => {
        let params = new URLSearchParams(data);
        businessText = params.get("business-text");
        let cardParser = new cp.BusinessCardParser();
        cardParser.getContactInfo(businessText);
        res.render(
            "index", { card: cardParser.parsedText, text: businessText });
    });

})

const server = app.listen(8080, function () {
    const host = server.address().address
    const port = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})