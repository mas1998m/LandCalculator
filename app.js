const {calculate} = require('./calculator.js');
var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
const passport = require ('passport');
const localStrategy = require('passport-local').Strategy;
const methodOverride = require("method-override");
const PORT = process.env.PORT||'5000';
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
//const socket = require("socket.io-client")("http://localhost:5000/campgrounds/calculator");

io.on('connection', (socket) => {
    console.log('a user connected');
});


server.listen(5000, () => console.log("App listening at localhost:" + 4000));

app.set("view engine","ejs"); //set ejs as the default view engine
app.use(express.static('public')); //use "public" directory as the assets directory
app.use(bodyParser.urlencoded({extended:true})); // use body-parser package to parse the post data
app.use(methodOverride('_method'));
//seeds();
app.use(require('express-session')({
    secret:"this is my first Web App",
    resave:false,
    saveUninitialized: false
}));


//================================
//======Terms & Privacy Routing=======
//================================
app.get("/terms",function (req,res) {
    res.render("terms");
});

app.get("/privacy",function (req,res) {
    res.render("privacy");
});


//================================
//======Campgrounds Routing=======
//================================

app.get("/",function (req,res) {
    res.render("campgrounds/calculator");
});


app.get("/contact",function (req,res) {
    res.render("campgrounds/contact");
});

app.post("/feedback",function(req,res){

    var link = "https://script.google.com/macros/s/AKfycbz0rycsE1MnAg82Bi6KDKeG7K0lLK0bGaetoEEngQACd2_XP2RpnEzzNONLVF3vt5Ew/exec?gid=0"
    var name = req.body.name;
    var comment = req.body.comment;
    var email = req.body.comment;


    link = link+ "&name="
});


app.post("/calculator",function (req,res) {
    //extract the form data and push it into the db
    var data ={
        country:req.body.country,
        type:req.body.type,
        area:req.body.area,
        unit:req.body.unit
    }
    String.prototype.toIndiaDigits= function(){
        var id= ['۰','۱','۲','۳','٤','٥','٦','٧','۸','۹'];
        return this.replace(/[0-9]/g, function(w){
         return id[+w]
        });
    }
    var price = calculate(data.country,data.type,data.area,data.unit);
    res.render("campgrounds/calculator",{info:data,result:price.toString().toIndiaDigits()});
});

app.listen(PORT,'localhost',function () {
    //test if the server is working
    console.log("Listening Now on Port "+ PORT);
    console.log(process.env);
});