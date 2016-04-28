angular.module('starter.controllers', [])

.controller("calendarDemo", function($scope, cached, $timeout, $ionicModal,$stateParams, $rootScope, localSub) {
    localSub.get($stateParams.name)
    $scope.day = moment();
    $rootScope.per=0
    console.log($scope.day.format('MM')+$scope.day.format('YY'))
    console.log('in contr')

    $scope.change = function(toId) {
        cached.read($stateParams.name,toId)
    }

    $rootScope.dataa = {
        color: 'white',
        note: '',
    }

    $scope.select = function(day) {
        $scope.selected = day.date
        var Id = $scope.selected.format('MM') + $scope.selected.format('YY')
        if (!cached.red[Id]) {
            cached.setred(Id)
        }
        var ID = $scope.selected.format('D') + Id
        console.log(cached.red)
        x = document.getElementById(ID)
        var hain=cached.red[Id][$scope.selected.format('D')]
        $rootScope.dataa.color = 'white';
        if(hain){
            $rootScope.dataa.color = hain[0]
            $rootScope.dataa.note= hain[1]
        }
        $rootScope.modal.show()
        $rootScope.changeTo = function(val) {
            console.log(val)
            if (!hain) {
                cached.setattr(Id, $scope.selected.format('D'));
                cached.addattr(Id, $scope.selected.format('D'), val, $rootScope.dataa.note,$stateParams.name)
            }
            if(hain){
            if(hain[0]=='red'){
                if(val=='green'){
                    $rootScope.total--
                }
            }
            if(hain[0]=='green'){
                $rootScope.presen--
                if(val=='red'){
                    $rootScope.total--
                }
            }
            }
            if(val=='green'){
                $rootScope.presen++
                $rootScope.total++
            }
            else if(val=='white'){
                $rootScope.total--
            }
            else{
                $rootScope.total++
            }
            x.style.backgroundColor = val
            localSub.set($stateParams.name)
            $rootScope.per=parseFloat($rootScope.presen*100/$rootScope.total).toFixed(2)
            cached.addattr(Id, $scope.selected.format('D'), val, $rootScope.dataa.note,$stateParams.name)
            $rootScope.modal.hide();
        }
        $rootScope.changed = function() {
            $rootScope.dataa.color = 'white';
            $rootScope.modal.hide();
        }
    }

    $rootScope.data = [{
        value: 'green',
        option: 'present'
    }, {
        value: 'red',
        option: 'absent'
    }, {
        value: 'white',
        option: 'holiday'
    }, ]
    $ionicModal.fromTemplateUrl('templates/options.html', {
        scope: $rootScope,
    }).then(function(modal) {
        $rootScope.modal = modal;
    });

$rootScope.per=parseFloat($rootScope.presen*100/$rootScope.total).toFixed(2)
})


.controller("subcontroller", function($scope, cached, $state, $ionicModal, localSub, $rootScope) {
    $ionicModal.fromTemplateUrl('templates/add.html', {
        scope: $scope,
    }).then(function(modal) {
        $scope.modall = modal;
    });
    $scope.a={
        aa:'',
    }
    localSub.get()
    $scope.add=function(a){
        localSub.add(a);
        $scope.a.aa=null;
    }
    $scope.click=function(a){

        cached.reset()
        cached.read(a[0])
        $state.go('calendar',{'name':a[0]})
    }

    $scope.showDelete=false
    $scope.showDel=function(){
        $scope.showDelete= !$scope.showDelete
    }
    $scope.delete=function(a){
        localSub.remove(a)
    }
})
