/**
 * Created by Administrator on 2017/8/14.
 */
;(function (angular) {
    // 1.创建模块
    var app = angular.module('app',['ui.router']);
})(angular);
/**
 * Created by Administrator on 2017/8/14.
 */
// 5.配置路由
angular.module('app').config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    angular.module('app').config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
        $stateProvider.state('home',{
            url:'/home',
            views:{
                home:{
                    templateUrl:'../views/home_tpl.html',
                    controller:'HomeController'
                },
                author:{
                    template:'<h1>authorauthorauthorauthorauthorauthorauthorauthorauthorauthorauthorauthorauthorauthorauthorauthorauthorauthorauthor</h1>'
                },
                content:{
                    template:'<h1>contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent</h1>'
                },
                my:{
                    template:'<h1>mymymymymymymymymymymymymymymymymymymymymymymymymymymymymymymymymymymy</h1>'
                }
            }
        }).state('home.list',{
        url:'/list',
        templateUrl:'../views/list_tpl.html',
    }).state('home.detail',{
        url:'/detail/:item',
        template:"<div ng-bind-html='html' class='detail_content'></div>",
        controller:"DetailController"
    });

    // 设置默认
    $urlRouterProvider.otherwise('/home/list');
}]);

// 设置白名单
angular.module('app').config(['$sceDelegateProvider',function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://localhost/API/**'
    ])
}])
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
/**
 * Created by Administrator on 2017/8/14.
 */
angular.module('app').service('xmgHttp',['$http',function ($http) {
    this.jsonp = function (url,params,success,error) {
        $http({
            url:url,
            method:'jsonp',
            params:params
        }).then(function (regs) {
            // console.log(regs);

            // 要想在界面上显示必须绑定到 $scope 身上
            if(success) success(regs);

        }).catch(function (err) {
            // console.log(err);
            if(error) error(err);
        })
    }
}]);