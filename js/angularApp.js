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
function addLoadingIcon(id) {
  $('#'+id).attr('disabled','disabled');
  var _temp=$('#'+id).text();
  $('#'+id).html(_temp+' <img src="/img/loading2_circlefill.svg" height="20" id="l_ico" class="m-0"/>');
}

function removeLoadingIcon(id) {
  $('#'+id).removeAttr('disabled');
  $('#l_ico').remove();
}

var onlyLoggedIn = function($location, $q, $rootScope) {
  var deferred = $q.defer();
  $rootScope.isloggedIn = false;//set to false
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
      title: "Alimdaad Society - Serving The Needy Round The Clock",
      templateUrl: "/templates/home.html",
      controller: "homeCtlr"
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
      title: "About - AlimdaadSociety.org",
      templateUrl: "/templates/about.html"
    })
    .when("/Donate", {
      title: "Donate - AlimdaadSociety.org",
      templateUrl: "/templates/donate.html"
    })
    .when("/VerifyDonation", {
      templateUrl: "/templates/verifyDonation.html"
    })
    .when("/ZakathCalculator", {
      title: "Zakath Calculator - AlimdaadSociety.org",
      templateUrl: "/templates/zakathCalc.html"
    })
    .when("/Gallery", {
      title: "Gallery - AlimdaadSociety.org",
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
      template: "<div class=\"d-flex text-center align-items-center display-4\">Application under Development</div>",
      resolve: {
        loggedIn: onlyLoggedIn
      },
    })
    .otherwise({
      template: "<h1>Oops! Page Not Found</h1>"
    });

  $locationProvider.html5Mode(true);
});
myApp.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);

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

});
myApp.controller("registerCtlr", function($http) {

});

//*****************************Login************************************
myApp.controller("loginCtlr", function($scope, $http, $location, $log, $rootScope) {
  var successCallBack = function(response) {
    $rootScope.isloggedIn = true;
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
