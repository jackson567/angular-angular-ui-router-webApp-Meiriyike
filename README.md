# angular angular-ui-router Meiriyike webApp
使用angular框架,angular-ui-router插件       <每日一刻>web端app
* 注意:
1. 目前只完成了首页的数据展示页面 和 数据详情 页面  
2. 使用了$http的ajax请求,后端使用php进行跨域的桥接,请自行git clone使用wamp模拟服务器开启
## 项目步骤
### 前期
1. 配置node环境
2. 使用bower下载必要的框架和组件
3. 使用gulp管理工具,生成三个版本(src,build,dist);使用less进行css的预编译
### 项目中
/****************基本 配置*****************/

1. 分模块管理
	- appController
	- HomeController
	- DetailController
2. 路由配置ui.router,一级路由(4页面)

/**************home首页设置*******************/

3. 点击 底部tabbar,实现切换 路由views功能,顶部topbar的title进行变换
4. 通过$http获取数据,ng-repeat模板进行数据展示
5. 通过数据属性:   value.display_style ,判断每条数据类型;选择3种样式的其中一种

/**************detail详细页 设置*******************/

6. 点击首页-任意一条数据,进入相应的detail页面
7. 创建二级路由(子路由),通过锚点传参,把内容传到二级路由模板中.
8. 通过$sce验证,显示语义化格式的内容

/**************返回按钮功能*******************/

    $scope.back = function () {
        // 记录了上一个界面
        // 代表返回上一个界面
        $window.history.back();
    };
    
/**************返回按钮功能*******************/ 
见代码

## 展示图gif
![](http://i.imgur.com/62AOfFX.gif)

## 自认为项目中的重要部分
1. 路由配置

***注意:
	- script: 引入ui-router的插件
	- module: 注入'ui.router'
	- state:  state的名称,和state的url
	- 多视图 views: 每个view最好都有各自的controller 和各自的模板template/templateUrl
	- tabbar的点击切换页面: 
		通过$emit和$on,修改appController的$scope.index
		index.html通过index的值,使用ng-show控制是否显示4个views
	- 不需要使用ui-sref
	- 记得在index.html添加4个ui-view	
一级路由
```
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
    })
```

二级路由
```
.state('home.list',{
        url:'/list',
        templateUrl:'../views/list_tpl.html',
    }).state('home.detail',{
        url:'/detail/:item',
        template:"<div ng-bind-html='html' class='detail_content'></div>",
        controller:"DetailController"
    });
```


2. 封装$http请求
- 原因: 日后会更换其他的服务端地址,方便维护和更新
- 方法: 使用 service封装,只需要传递新参数 url即可更换
```
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
```
