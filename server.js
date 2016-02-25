var express = require('express');
var jobModel = require('./models/Jobs');
var app = express();
var jobUtils = require("./job-utils.js");

app.set('views',__dirname);

app.set('view engine','jade');

app.use(express.static(__dirname + '/public'));

app.get('/api/jobs',function(req,res){
    jobUtils.findJobs().then(function(collection){
        res.send(collection);
    })
});

app.get('*', function(req,res){
    res.render('index');
});

//mongoose.connect('mongodb://localhost/jobfinder');
jobUtils.connectDB('mongodb://admin:admin@ds043982.mongolab.com:43982/jobfinder')
.then(function(){
    console.log("Connected to mongodb successfully");
   jobUtils.seedJobs();
});

app.listen(process.env.PORT, process.env.IP);