angular.module('starter.directives', [])

.directive("calendar", function( cached) {
    return {
        controller: "calendarDemo",
        restrict: "E",
        templateUrl: "templates/calendar.html",
        scope: {
            selected: "="
        },
        link: function(scope, elem) {

            // scope.selected = _removeTime(scope.selected || moment());
            scope.month = scope.selected.clone();
            var start = scope.selected.clone();
            start.date(1)
            scope.red = {}
            _removeTime(start.day(0));
            _buildMonth(scope, start, scope.month);

            // scope.select = function(day) {
            //     scope.selected = day.date
            //     var Id = scope.selected.format('MM') + scope.selected.format('YY')
            //     if (!cached.red[Id]) {
            //         cached.setred(Id)
            //     }
            //     // scope.red[Id].push(scope.selected.format('D'))
            //     // for(var i=0;i<cached.red.length;i++){
            //     //     var IDD=cached.red[i]
            //     //     console.log(IDD)
            //         // x = document.getElementById(IDD)
            //         // x.style.backgroundColor = 'red'
            //         // x.setAttribute("name", "red");
            //     // }
            //     var ID = scope.selected.format('D') + Id
            //     cached.addred(Id, scope.selected.format('D'))
            //     x = document.getElementById(ID)
            //     x.style.backgroundColor = 'red'
            // }


            scope.next = function() {
                console.log(scope.month.month() + 1)
                var next = scope.month.clone();
                _removeTime(next.month(next.month() + 1).date(1));
                scope.month.month(scope.month.month() + 1);
                _buildMonth(scope, next, scope.month);
                var toId = scope.month.format('MM') + scope.month.format('YY')
                // scope.change(toId)

            }

            scope.previous = function() {
                var previous = scope.month.clone();
                _removeTime(previous.month(previous.month() - 1).date(1));
                scope.month.month(scope.month.month() - 1);
                _buildMonth(scope, previous, scope.month)
            }
        }
    }


    function _removeTime(date) {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

    function _buildMonth(scope, start, month, a) {
        scope.weeks = [];
        var done = false,
            date = start.clone(),
            monthIndex = date.month(),
            count = 0;
        while (!done) {
            scope.weeks.push({
                days: _buildWeek(date.clone(), month)
            });
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }

    function _buildWeek(date, month) {
        var days = [];
        for (var i = 0; i < 7; i++) {
            days.push({
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            });
            date = date.clone();
            date.add(1, "d");
        }
        return days;
    }
});
