var app = angular.module('app',[]);
app.controller('testCtrl',function(){
    var vm = this;
    vm.jobs = [
        {
        title : "Sales Person",
        description : 'you will fight dragons'
        },
        {
        title : "Accountant",
        description : 'you will use keyboard'
        }
    ]

})