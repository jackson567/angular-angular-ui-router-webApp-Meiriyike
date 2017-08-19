/**
 * Created by Administrator on 2017/8/14.
 */
// 7.详情控制器

angular.module('app').
controller('DetailController',['$scope','$stateParams','$sce',function ($scope,$stateParams,$sce) {
    // console.log($stateParams.item);

    // 设置信任 授权
    $scope.html = $sce.trustAsHtml($stateParams.item);
}]);