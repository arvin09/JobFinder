var mongoose= require("mongoose");
var Promise= require("bluebird");

var Job = mongoose.model('Job');

var jobs = [
        {title : "Sales Person",description : 'you will fight dragons'},
        {title : "Accountant",description : 'you will use keyboard'},
        {title : "Software",description : 'you will code in Angularjs'},
        {title : "IT Manager",description : 'you will manage people'}
    ]

var findJobs = function(query){
    return Promise.cast(Job.find(query).exec());
}

exports.findJobs = findJobs;

exports.connectDB = Promise.promisify(mongoose.connect,{context : mongoose});

var createJob = Promise.promisify(Job.create,{context : Job});

exports.seedJobs = function(){
    return findJobs({}).then(function(collection){
        if(collection.length === 0){
            return Promise.map(jobs,function(job){
                return createJob(job);
            })
        }
    })
}