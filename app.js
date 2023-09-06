const {calculate} = require('./calculator.js');
var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
const methodOverride = require("method-override");
const PORT = process.env.PORT||'5000';

var currency = {
    "egypt": "جنيه مصرى",
    "jordan": "دينار أردنى",
    "uae": "درهم إماراتى",
    "bahrain": "دينار بحرينى",
    "kuwait": "دينار كويتى",
    "morocco": "درهم مغربى",
    "ksa": "ريال سعودى",
    "turkey": "دولار أمريكى",
    "oman": "ريال عمانى",
    "qatar": "ريال قطرى",
    "lebanon": "دولار أمريكى"
}

app.set("view engine","ejs"); //set ejs as the default view engine
app.use(express.static('public')); //use "public" directory as the assets directory
app.use(bodyParser.urlencoded({extended:true})); // use body-parser package to parse the post data
app.use(methodOverride('_method'));


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

app.post("/contact",function(req,res){

    var link = "https://script.google.com/macros/s/AKfycbz0rycsE1MnAg82Bi6KDKeG7K0lLK0bGaetoEEngQACd2_XP2RpnEzzNONLVF3vt5Ew/exec?gid=0"
    var name = req.body.name;
    var comment = req.body.comment;
    var email = req.body.comment;


    link = link+ "&name="
    res.render("campgrounds/contact");
});


app.post("/calculator",function (req,res) {
    //extract the form data and push it into the db
    var data ={
        country:req.body.country,
        type:req.body.type,
        area:req.body.area,
        unit:req.body.unit,
        curr: currency[req.body.country]
    }
    String.prototype.toIndiaDigits= function(){
        var id= ['۰','۱','۲','۳','٤','٥','٦','٧','۸','۹'];
        return this.replace(/[0-9]/g, function(w){
         return id[+w]
        });
    }

    String.prototype.toArabicDigits= function(){
        const numberMap = {
            '۰': '0',
            '۱': '1',
            '۲': '2',
            '۳': '3',
            '٤': '4',
            '٥': '5',
            '٦': '6',
            '٧': '7',
            '۸': '8',
            '۹': '9',
        }
        const inputArray = this.split('');
        const replacedArray = inputArray.map(char => {
            if (char in numberMap) {
                return numberMap[char];
            } else {
                return char;
            }
        });
        const replacedString = replacedArray.join('');
        return replacedString;
    }
    data.area= data.area.toString().toArabicDigits();

    var price = calculate(data.country,data.type,data.area,data.unit);
    res.render("campgrounds/calculator",{info:data,result:price.toString().toIndiaDigits()});
});

app.listen(PORT,function () {
    //test if the server is working
    console.log("Listening Now on Port "+ PORT);
});