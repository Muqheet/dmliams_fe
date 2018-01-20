var myApp = angular.module("myApp", ["ngRoute", "ngResource", "ngAnimate"]);

/*Global variables*/
var isloggedIn = '';
var domainName = 'http://localhost:8090'; //url of backend domain for rest api
var JwtHeader = '';
function getJwtHeader() {
  return JwtHeader;
}
function setJwtHeader(JwtHeader) {
  this.JwtHeader = JwtHeader;
}

var onlyLoggedIn = function($location, $q, $rootScope) {
  var deferred = $q.defer();
  $rootScope.isloggedIn = false;//set it false
  if ($rootScope.isloggedIn) {
    deferred.resolve();
  } else {
    deferred.reject();
    $location.url('/Login');
    $rootScope.loginResultClass = 'alert alert-danger';
    $rootScope.loginResultMessage = 'Your session has been expired, Please login again.';
  }
  return deferred.promise;
};

myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "/templates/home.html"
    })
    .when("/Login", {
      templateUrl: "/templates/login.html",
      controller: "loginCtlr"
    })
    .when("/Register", {
      templateUrl: "/templates/register.html",
      controller: "registerCtlr"
    })
    .when("/Logout", {
      templateUrl: "/templates/login.html",
      controller: "logoutCtlr",
      resolve: {
        loggedIn: onlyLoggedIn
      }
    })
    .when("/About", {
      templateUrl: "/templates/about.html"
    })
    .when("/Donate", {
      templateUrl: "/templates/donate.html"
    })
    .when("/VerifyDonation", {
      templateUrl: "/templates/verifyDonation.html"
    })
    .when("/ZakathCalc", {
      templateUrl: "/templates/zakathCalc.html"
    })
    .when("/Gallery", {
      templateUrl: "/templates/gallery.html"
    })
    .when("/secure/Dashboard", {
      templateUrl: "/secureTemplates/dashboard.html",
      resolve: {
        loggedIn: onlyLoggedIn
      }
    })
    .when("/secure/Contributors", {
      templateUrl: "/secureTemplates/Contributors.html",
      controller: "contributorCtlr",
      resolve: {
        loggedIn: onlyLoggedIn
      }
    })
    .when("/secure/ContributorPayments/:id", {
      templateUrl: "/secureTemplates/ContributorPayments.html",
      controller: "contributorPaymentsCtlr",
      resolve: {
        loggedIn: onlyLoggedIn
      }
    })
    .when("/secure/UnderDevlopment", {
      template: "<div class=\"d-flex text-center  display-4\">Application under Development</div>",
      resolve: {
        loggedIn: onlyLoggedIn
      },
    })
    .otherwise({
      template: "<h1>Oops! Page Not Found</h1>"
    });

  $locationProvider.html5Mode(true);
});


//*****************************Home************************************
myApp.controller("homeCtlr", function($scope, $location, $anchorScroll) {

  $scope.scrollTo = function(scrollLocation) {
    $location.hash(scrollLocation);
    $anchorScroll();
  };

  // To hilight navigation bar menu
  $scope.getTabClass = function(path) {
    // console.log($location.url());
    return ($location.url() === path) ? 'active tab-highliter' : '';
  }

  $scope.header = "/views/headerView.html";
  $scope.footer = "/views/footerView.html";
  $scope.home = "/views/homeView.html";
  $scope.about = "/views/aboutView.html";
  $scope.contact = "/views/contactView.html";
  $scope.galleryCarousel = "/views/galleryCarouselView.html";
  $scope.founderPortfolio = "/views/founderView.html";
  $scope.loginTab = "/views/loginTabView.html";
  $scope.registerTab = "/views/registerTabView.html";
  $scope.DeleteModal = "/secureViews/DeleteModal.html";

});


//*****************************Logout************************************
myApp.controller("logoutCtlr", function($rootScope) {

  setJwtHeader('');
  $rootScope.isloggedIn=false;
  $rootScope.loginResultClass='alert alert-success';
  $rootScope.loginResultMessage='You have been successfully logged out. Please close this window /  page for security reasons.';

  // $http.get("/logout");
});
myApp.controller("registerCtlr", function($http) {

});

//*****************************Login************************************
myApp.controller("loginCtlr", function($scope, $http, $location, $log, $rootScope) {
  var successCallBack = function(response) {
    $rootScope.isloggedIn = true;

    // $scope.status = response.status;
    // $scope.headers = response.headers;
    // $scope.xhrStatus = response.xhrStatus;
    // $scope.statusText = response.statusText;
    console.log(response.status);
    JwtHeader = response.headers('Authorization');
    setJwtHeader(JwtHeader);
    $location.path('/secure/Dashboard');
  }
  var errorCallBack = function(response) {
    $rootScope.isloggedIn = false;
    $scope.email = $scope.password = "";
    console.log(response.status);

    $scope.loginResultClass = 'alert alert-danger';
    if (response.status === 401) {
      $scope.loginResultMessage = 'Invalid credentials, Please try with valid one.';
    } else {
      $scope.loginResultMessage = 'Oops, Something went wrong, Please try later.';
    }
  }


  $scope.formSubmit = function() {
    var d = {
      email: $scope.email,
      password: $scope.password
    };
    $http({
        url: domainName + "/login",
        data: JSON.stringify(d),
        method: "post",
      })
      .then(successCallBack, errorCallBack);
  };

});

//*****************************Contributor************************************
myApp.controller("contributorCtlr", function($scope, $http, $log) {
  $scope.ContributorModal = "/secureViews/ContributorModal.html";
});

//**********************Contributor Details******************************
myApp.controller("contributorPaymentsCtlr", function($scope, $http, $log, $routeParams) {

  $scope.ContributorPaymentsModal = "/secureViews/ContributorPaymentsModal.html";
  //var contributorId = $routeParams.id;

  // var successCallBack = function(response) {
  // 	$scope.contributor = response.data;
  // };
  //
  // var errorCallBack = function(reason) {
  // 	$scope.error = reason.data;
  // };
  //
  // $http.get("/api/Contributor/" + $routeParams.id)
  // .then(successCallBack, errorCallBack);

});
myApp.controller("zakathCtlr", function($scope) {
  $scope.resetVal = function() {
    $scope.zakatable = 0;
    $scope.payable = 0;
  }

  $scope.calcZakath = function() {
    var tcash = Number($scope.tcash || 0);
    var balance = Number($scope.balance || 0);
    var fd = Number($scope.fd || 0);
    var shares = Number($scope.shares || 0);
    var bond = Number($scope.bond || 0);
    var lic_pli = Number($scope.lic_pli || 0);
    var pf = Number($scope.pf || 0);
    var gold = Number($scope.gold || 0);
    var silver = Number($scope.silver || 0);
    var money_owed = Number($scope.money_owed || 0);
    var business = Number($scope.business || 0);
    var cash = Number($scope.cash || 0);
    var prop = Number($scope.prop || 0);
    var ocredit = Number($scope.ocredit || 0);
    var debts = Number($scope.debts || 0);
    var odebts = Number($scope.odebts || 0);

    $scope.zakatable = tcash + balance + fd + shares + bond + lic_pli + pf + gold + silver + money_owed + business + cash + prop + ocredit - debts - odebts;
    $scope.payable = 0.025 * $scope.zakatable;
  }
});




// var roles = {
//   superUser: 0,
//   admin: 1,
//   user: 2
// };
// var routeForUnauthorizedAccess = '/Login';
//
// myApp.factory('authorizationService', function($resource, $q, $rootScope, $location) {
//   return {
//     // We would cache the permission for the session,
//     //to avoid roundtrip to server
//     //for subsequent requests
//
//     permissionModel: {
//       permission: {},
//       isPermissionLoaded: false
//     },
//
//     permissionCheck: function(roleCollection) {
//
//       // we will return a promise .
//       var deferred = $q.defer();
//
//       //this is just to keep a pointer to parent scope from within promise scope.
//       var parentPointer = this;
//
//       //Checking if permission object(list of roles for logged in user)
//       //is already filled from service
//       if (this.permissionModel.isPermissionLoaded) {
//         //Check if the current user has required role to access the route
//         this.getPermission(this.permissionModel, roleCollection, deferred);
//       } else {
//         //if permission is not obtained yet, we will get it from  server.
//         // 'api/permissionService' is the path of server web service , used for this example.
//
//         $resource('/api/permissionService').get().$promise.then(function(response) {
//           //when server service responds then we will fill the permission object
//           parentPointer.permissionModel.permission = response;
//
//           //Indicator is set to true that permission object is filled and
//           //can be re-used for subsequent route request for the session of the user
//           parentPointer.permissionModel.isPermissionLoaded = true;
//
//           //Check if the current user has required role to access the route
//           parentPointer.getPermission(parentPointer.permissionModel, roleCollection, deferred);
//         });
//       }
//       return deferred.promise;
//     },
//
//     //Method to check if the current user has required role to access the route
//     //'permissionModel' has permission information obtained from server for current user
//     //'roleCollection' is the list of roles which are authorized to access route
//     //'deferred' is the object through which we shall resolve promise
//     getPermission: function(permissionModel, roleCollection, deferred) {
//       var ifPermissionPassed = false;
//
//       angular.forEach(roleCollection, function(role) {
//         switch (role) {
//           case roles.superUser:
//             if (permissionModel.permission.isSuperUser) {
//               ifPermissionPassed = true;
//             }
//             break;
//           case roles.admin:
//             if (permissionModel.permission.isAdministrator) {
//               ifPermissionPassed = true;
//             }
//             break;
//           case roles.user:
//             if (permissionModel.permission.isUser) {
//               ifPermissionPassed = true;
//             }
//             break;
//           default:
//             ifPermissionPassed = false;
//         }
//       });
//       if (!ifPermissionPassed) {
//         //If user does not have required access,
//         //we will route the user to unauthorized access page
//         $location.path(routeForUnauthorizedAccess);
//         //As there could be some delay when location change event happens,
//         //we will keep a watch on $locationChangeSuccess event
//         // and would resolve promise when this event occurs.
//         $rootScope.$on('$locationChangeSuccess', function(next, current) {
//           deferred.resolve();
//         });
//       } else {
//         deferred.resolve();
//       }
//     }
//   };
// });
