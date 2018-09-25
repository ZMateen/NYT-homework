var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//Require schema
var History = require("./models/history.js");

//Express instance
var app = express();
var PORT = process.env.PORT || 3000;

//Mongodb config
var db = mongoose.connection;

db.on("error", function(err) {
    console.log("Mongoose Error: ", err);
});

db.on("error", function(err) {
    console.log("Mongoose connection succsessful.");
});

//routes
app.get("/", function(req, res) {
    res,sendFile("./public/index.html");
});

app.get("/api/saved", function(req, res) {
    History.find({}).sort([["date", "decending"]]).limit(5)
    .exec(function(err, doc) {
        if(err) {
            console.log(err);
        } else {
            res.send(doc);
        }
    })
});

app.post("/api/saved", function(req, res) {
    var newHistory = new History({
        title: req.body.title,
        date: req.body.date,
        url: req.body.url
    });

    History.create({"location": req.body.location, "date": Date.now()}, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.send("Saved Search");
        }
    })
});

app.delete("api/saved/:id", function(req, res) {
    History.find({"_id": req.params.id}).remove()
    .exec(function(err, doc) {
        res.send(doc);
    });
})

app.delete("/api/saved/:id", function(req, res) {
    History.find({"_id": req.params.id}). remove()
    .exec(function(err, doc) {
        re.send(doc);
    });
})

//listener
app.listen(PORT, function() {
    console.log("App listenint on PORT: " + PORT);
});