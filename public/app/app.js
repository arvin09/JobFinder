var app = angular.module('app',['ngResource']);
app.controller('testCtrl',function($resource){
    var vm = this;
    vm.jobs = $resource('/api/jobs').query();
})