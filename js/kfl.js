
var app = angular.module("kfl", ["ng","ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/start",{
        templateUrl:"tpl/start.html"
    }).when("/main",{
        templateUrl:"tpl/main.html",
        controller:"mainCtrl"
    }).when("/detail/:did",{
        templateUrl:"tpl/detail.html",
        controller:"detailCtrl"
    }).when("/order/:did",{
        templateUrl:"tpl/order.html",
        controller:"orderCtrl"
    }).when("/myorder",{
        templateUrl:"tpl/myorder.html",
        controller:"myorderCtrl"
    }).otherwise({
        redirectTo:"/start"
    })
});

app.controller("bodyCtrl",["$scope","$location",function ($scope,$location) {
    $scope.message="加载更多";
    $scope.jump=function (desPath) {
        $location.path(desPath);
    };
    $scope.isBtn=false;
    $scope.btn=function () {
        $scope.isBtn=true;
    };
}]);
app.controller("mainCtrl",["$scope","$http",function ($scope,$http) {
    $http.get("data/dish_getbypage.php?start=1")
        .success(function (data) {
            $scope.dishList=data;
        });
    $scope.loadMore=function () {
        $http.get("data/dish_getbypage.php?start="+parseInt($scope.dishList.length+1))
            .success(function (data) {
                for(var i=0;i<data.length;i++){
                    $scope.dishList.push(data[i]);
                }
                if(data.length<5){
                    $scope.isClick=true;
                }
            });
    };
    $scope.myKw="";
    $scope.$watch("myKw",function (newValue, oldValue) {
        if($scope.myKw.length>0){
            $http.get("data/dish_getbykw.php?kw="+$scope.myKw)
                .success(function (data) {
                    // console.log(data);
                    if(data.length>0){
                        $scope.dishList=data;
                    }
                });
            $scope.isClick=true;
        }else{
            $http.get("data/dish_getbypage.php?start=1")
                .success(function (data) {
                    $scope.dishList=data;
                });
            $scope.isClick=false;
        }
    })
}]);

app.controller("detailCtrl",["$scope","$routeParams","$http",function ($scope, $routeParams,$http) {
    $http.get("data/dish_getbyid.php?did="+$routeParams.did)
        .success(function (data) {
            $scope.dish=data[0];
            console.log($scope.dish);
        })
}]);

app.controller("orderCtrl",["$scope","$routeParams","$http","$httpParamSerializerJQLike",function ($scope,$routeParams,$http,$httpParamSerializerJQLike) {
    $scope.orderMes="";
    $scope.did=$routeParams.did;
    $scope.order={userDid:$scope.did};
    $scope.btnOrder=function () {
        $http.get("data/order_add.php?"+$httpParamSerializerJQLike($scope.order))
            .success(function (data) {
                if(data.msg==="success"){
                    $scope.orderMes="订单成功，订单编号为："+data.oid;
                }else{
                    $scope.orderMes="订单失败";
                }
            });
        sessionStorage.setItem("phone",$scope.order.userPhone);
    }
}]);

app.controller("myorderCtrl",["$scope","$http",function($scope,$http){
    var phone=sessionStorage.getItem("phone");
    $scope.myList=[];
    $http.get("data/order_getbyphone.php?phone="+phone)
        .success(function (data) {
            for(var i=data.length-1;i>=0;i--){
                $scope.myList.push(data[i]);
            }
        })
}]);














