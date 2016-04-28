angular.module('starter.services', [])

//localSub original

// .factory('localSub',function($rootScope){
//     var local = {}
//     local.sub=[]
//     local.add=function(a){
//         local.sub.push(a)
//         $rootScope.subs.push(a)
//         localStorage.setItem('sub', JSON.stringify(local.sub))
//     }
//     local.get=function(){
//         $rootScope.subs=[]
//         st = localStorage.getItem('sub');
//         if(st){
//         $rootScope.subs=JSON.parse(st)
//         local.sub = JSON.parse(st)
//         }
//     }
//     return local;
// })


//localSub experiment

.factory('localSub',function($rootScope){
    var local = {}
    local.sub={}
    local.add=function(a){
        local.sub[a]=[]
        local.sub[a]=[a,0,0]
        if(local.sub[a][1] == 0){
            local.sub[a].push(parseFloat(0).toFixed(2))
        }
        else{
            local.sub[a].push(parseFloat(local.sub[a][2]*100/local.sub[a][1]).toFixed(2))
        }
        $rootScope.subs=local.sub
        localStorage.setItem('sub', JSON.stringify(local.sub))
        local.get()
    }
    local.get=function(a){
        $rootScope.subs=[]
        st = localStorage.getItem('sub');
        if(st){
        $rootScope.subs=JSON.parse(st)
        local.sub = JSON.parse(st)
        }
        if(a){
            $rootScope.total=$rootScope.subs[a][1]
            $rootScope.presen=$rootScope.subs[a][2]

            // local.set(a)
        }

    }
    local.set=function(a){
        local.sub[a][1]=$rootScope.total
        local.sub[a][2]=$rootScope.presen
        local.sub[a][3]=parseFloat(local.sub[a][2]*100/local.sub[a][1]).toFixed(2)
        localStorage.setItem('sub', JSON.stringify(local.sub))
    }
    local.remove=function(a){
        delete $rootScope.subs[a]
        delete local.sub[a]
        localStorage.setItem('sub', JSON.stringify(local.sub))
        localStorage.removeItem(a);
    }
    return local;
})
.factory('cached', function($timeout,$rootScope) {

        var redd = {}
        redd.red = {}
        redd.setred = function(id) {
            redd.red[id] = {}
        }
        redd.reset=function(){
            redd.red={}

        }
        redd.setattr = function(id, iidd) {
            redd.red[id][iidd] = []
        }
        redd.addattr = function(id, iidd, colr, note, as) {
            if (!redd.red[id][iidd]) {
                redd.red[id][iidd].push(colr)
                redd.red[id][iidd].push(note)
            } else {
                redd.red[id][iidd][0] = colr
                redd.red[id][iidd][1] = note
            }
            localStorage.setItem(as, JSON.stringify(redd.red))
        }
        redd.read = function(a,bas) {
            st = localStorage.getItem(a);
            if(st){
            redd.red = JSON.parse(st)
            console.log(st)
            var da=moment()
            var das=da.format('MM')+da.format('YY')
            if(bas){
                das=bas;
            }
            console.log(das)
            $timeout(function() {
                var x = redd.red[das]
                angular.forEach(x, function(a, b) {
                    var y = b + das
                    console.log(a, b, y, b[0])
                    $rootScope.dataa.color = a[0]
                    var z = document.getElementById(y)
                    z.style.backgroundColor = a[0]
                })
            }, 100)
        }
}
        return redd;
    })
