/**
 * Created by Administrator on 2017/8/14.
 */
// 4.尾部
angular.module('app').directive('tabbar',function () {
    return{
        restrict:'EA',
        templateUrl:'../views/tabbar_tpl.html',
        controller:['$scope',function ($scope) {
            $scope.tabChange = function (index) {
                // 发送数据
                $scope.$emit('tab_notifice',{id:index});
            }
        }]
    }
})