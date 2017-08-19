/**
 * Created by Administrator on 2017/8/14.
 */
// 2.创建控制器
angular.module('app').controller('AppController',['$scope','$window','$location',function ($scope,$window,$location) {
    $scope.appTitle = '每日一刻';
    $scope.titleArr = ['首页','作者','栏目','我'];
    // 1.当前标题
    $scope.title = '首页';
    // 记录当前选中的索引
    $scope.index = 0;

    // 2.父级接收数据
    $scope.$on('tab_notifice',function (e, regs) {
        var index = regs.id;

        // $scope.$broadcast('app_notifce',{title:$scope.titleArr[index]});
        $scope.index = index;

        $scope.title = $scope.titleArr[index];
    });

    // 3.返回按钮事件
    $scope.back = function () {
        // 记录了上一个界面
        // 代表返回上一个界面
        $window.history.back();
    };
    // 4.监听url的变化
    $scope.location = $location;
    // console.log($location.url());
    // 显示
    $scope.isShow = true;

    $scope.$watch('location.url()',function (newV,oldV) {
        var index = newV.toString().indexOf('list');
        if (index != -1){
            // 当前是list
            $scope.isShow = true;
        }else {
            // 不是列表
            $scope.isShow = false;
        }

    })
}]);