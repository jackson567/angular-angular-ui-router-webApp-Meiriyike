/**
 * Created by Administrator on 2017/8/14.
 */
// 3.自定义指令 导航
angular.module('app').directive('navs',function () {
    return {
        restrict:'EA',
        templateUrl:'../views/nav_tpl.html',
        controller:['$scope',function ($scope) {
            // $scope.$on('app_notifce',function (e, regs) {
            //     console.log(regs.title);
            //     $scope.title = regs.title;
            // })
        }]
    }
});