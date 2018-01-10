//Basic required imports for NodeJS
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

//Get call to return JSON that formats natural and unix date
app.get('/dateValues/:dateVal',function(req,res,next){
    //get requets data
    var dateVal = req.params.dateVal;
    //option for formating date
    var dateFormattingOptions = {
        year:'numeric',
        month:'long',
        day:'numeric'
    }

    if(isNaN(dateVal)){
        var naturalDate = new Date(dateVal);
        naturalDate = naturalDate.toLocaleDateString("en-us",dateFormattingOptions);
        var unixDate = new Date(dateVal).getTime()/1000;
    }else{
        var unixDate = dateVal;
        var naturalDate = new Date(dateVal *1000);
        naturalDate = naturalDate.toLocaleDateString("en-us",dateFormattingOptions);
        
    }

    res.json({unix: unixDate, natural: naturalDate});
});

app.listen(3000, function(){
    console.log("Working");
});
