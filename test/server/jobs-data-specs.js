var expect= require("chai").expect;
var mongoose= require("mongoose");
var jobModel = require('../../models/Jobs');
var Promise= require("bluebird");
var jobUtils = require("../../job-utils.js");


function resetJobs(){
    return new Promise(function(resolve, reject){
        mongoose.connection.collections['jobs'].drop(resolve,reject);
    })
}

describe("get jobs",function(){
    var jobs
    before(function(done){
        jobUtils.connectDB('mongodb://localhost/jobfinder')
        .then(resetJobs)
        .then(jobUtils.seedJobs)
        .then(jobUtils.findJobs)
        .then(function(collections){
            jobs = collections;
            done();
        });
    });
    
    after(function(){
       mongoose.connection.close(); 
    });
    
    it("should never be empty since jobs are seeded",function(){
        expect(jobs.length).to.be.at.least(1);
    }); 
    
    it("should have a job with title",function(){
       expect(jobs[0].title).to.not.be.empty;
    });
    
    it("should have a job with desciption",function(){
       expect(jobs[0].description).to.not.be.empty;
    });
});

describe("db save jobs",function(){
   var job = { title : "Cook", description : "You must be able to cook"};
   var jobs;
   
   function saveTestJob(){
       return jobUtils.saveJob(job);
   }
   
   
    before(function(done){
        jobUtils.connectDB('mongodb://localhost/jobfinder')
        .then(resetJobs)
        .then(function (){ return jobUtils.saveJob(job)})
        .then(jobUtils.findJobs)
        .then(function setJobs(collections){
            jobs = collections;
            done();
        });
    });
   
    after(function(){
       mongoose.connection.close(); 
    });
    
    it("should have one job after saving one job",function(){
       expect(jobs).to.have.length(1); 
    });
   
});