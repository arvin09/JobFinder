var app = angular.module('app',['ngResource']);
app.controller('jobsCtrl',function($resource, jobs){
    var vm = this;
    vm.jobs = $resource('/api/jobs').query();
    vm.submit = function(){
        var job  = {title : vm.title, description : vm.description};
        console.log(job)
        jobs.save(job);
        vm.jobs.push(job);
    }
    
    
})