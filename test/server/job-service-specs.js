var express = require("express");
var app = express();
var expect= require("chai").expect;
var request = require("supertest");
var Promise = require("bluebird");
var  dataSavedJob;
var db = {
   saveJob : function(job){
      dataSavedJob = job;
   },
   findJobs : function(){
      return new Promise(function(resolve,reject){
         resolve(["Love you natasha"]);
      });
   }
};

var jobService = require("../../job-service")(db,app)


describe("get jobs",function() {
   it("should give me a json list of jobs",function(done){
      request(app).get('/api/jobs')
      .expect('Content-Type',/json/)
      .end(function(req, res){
         expect(res.body).to.be.a('Array');
         done();
      })
   }); 
});


describe("save jobs",function(){
   
   it("should validate title is greater than 4 characters");
   it("should validate title is not more than 40 characters");
   it("should validate description is greater than 4 characters");
   it("should validate description is not more than 250 characters");
   
   
   var newJob = {title : "Sales Person",description : 'you will fight dragons'};
   
   it("should pass the job to database save",function(done){
      request(app).post('/api/jobs').send(newJob).end(function(error, response){
         expect(dataSavedJob).to.deep.equal(newJob);   
      })
      done();
   });
   
   
   it("should return a status of 200 if save is successfull");
   it("should retrun a job with id");
   it("should return error if the database failed") ;
});