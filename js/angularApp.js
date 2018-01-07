var myApp = angular.module("myApp", ["ngRoute", "ngAnimate"]);

myApp.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when("/", {
		templateUrl : "/templates/home.html"
	})
	.when("/Login", {
		templateUrl : "/templates/login.html",
		controller: "loginCtlr"
	})
	.when("/Logout", {
		templateUrl : "/templates/login.html",
		controller: "logoutCtlr"
	})
	.when("/About", {
		templateUrl : "/templates/about.html"
	})
	.when("/Donate", {
		templateUrl : "/templates/donate.html"
	})
	.when("/VerifyDonation", {
		templateUrl : "/templates/verifyDonation.html"
	})
	.when("/ZakathCalc", {
		templateUrl : "/templates/zakathCalc.html"
	})
	.when("/Gallery", {
		templateUrl : "/templates/gallery.html"
	})
	.when("/secure/Dashboard", {
		templateUrl : "/secureTemplates/dashboard.html",
	})
	.when("/secure/Contributors", {
		templateUrl : "/secureTemplates/Contributors.html",
		controller: "contributorCtlr"
	})
	.when("/secure/ContributorPayments/:id", {
		templateUrl : "/secureTemplates/ContributorPayments.html",
		controller: "contributorPaymentsCtlr"
	})
	.when("/secure/UnderDevlopment", {
		template : "<b class=\"text-center\">Under Development</b>",
	})
	.when("/:url_to_redirect", {
		controller: "redirectCtlr"
	})
	.otherwise({
		template : "<h1>Oops! Page Not Found</h1>"
	});

	$locationProvider.html5Mode(true);
});


//*****************************Home************************************
myApp.controller("redirectCtlr", function($location, $scope) {
	$scope.url = url_to_redirect;
	$location.path("/#!/"+url);
});
myApp.controller("homeCtlr", function($scope, $location, $anchorScroll) {

	$scope.scrollTo = function(scrollLocation) {
		$location.hash(scrollLocation);
		$anchorScroll();
	};

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
myApp.controller("logoutCtlr", function($http) {
	$http.get("/auth-logout");
});

//*****************************Login************************************
myApp.controller("loginCtlr", function($scope, $http, $location, $log) {

	/*var successCallBack = function(response)
	{
		$scope.status = response.status;
		$scope.headers = response.headers;
		$scope.xhrStatus = response.xhrStatus;
		$scope.statusText = response.statusText;
		console.log(response.data);
		$location.path('/secure/Contributors');
	}
	var errorCallBack = function(response)
	{

	}
	$scope.submit = function() {
		$http({
			url: "/auth-login",
			params: {
				email: $scope.email,
				password: $scope.password
			},
			method: "post"
		})
		.then(successCallBack, errorCallBack);
	};*/

});

//*****************************Contributor************************************
myApp.controller("contributorCtlr", function($scope, $http, $log){
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

		$scope.zakatable = tcash + balance + fd + shares + bond + lic_pli + pf + gold + silver + money_owed + business  + cash + prop + ocredit - debts - odebts;
		$scope.payable = 0.025 * $scope.zakatable;
	}
});
