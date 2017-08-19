/**
 * Created by Administrator on 2017/8/14.
 */
// 6.首页控制器
// http://localhost/API/home.php?callback=fn
// http://localhost:9999/#!/home
angular.module('app').controller("HomeController",['$scope','xmgHttp',function ($scope,xmgHttp) {
    $scope.homeTitle = '首页1';

    /*$http({
        url:'http://localhost/API/home.php',
        method:'jsonp'
    }).then(function (regs) {
        console.log(regs);

        // 要想在界面上显示必须绑定到 $scope 身上
        $scope.dataList = regs.data;

    }).catch(function (err) {
        console.log(err);
    })*/
    var url = 'http://localhost/API/home.php';
    xmgHttp.jsonp(url,null,function (regs) {
        console.log(regs);
        $scope.dataList = regs.data;
    },function (err) {
        console.log(err);
    })
}]);
