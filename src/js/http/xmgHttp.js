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