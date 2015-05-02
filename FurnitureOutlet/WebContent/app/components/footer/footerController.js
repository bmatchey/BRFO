angular.module('app.footer', [])
	.controller('footerCtrl', FooterCtrl)
	.directive('footer', FooterDirective);

function FooterCtrl($rootScope, $scope, $parse, logger)
{
	var vm = this;
	vm.domain = "";
	//vm.faceBookAddress = $rootScope.faceBookAddress;
}

function FooterDirective($parse, logger)
{
	var directive = 
	{
		restrict: 'AE',
		replace: true,
		transclude: false,
		scope: {},  // Add this line to create an isolated scope
        templateUrl: "app/components/footer/footer.tpl.html",
        controller: FooterCtrl,
        controllerAs: 'footerCtrl',
        link: linkFunc
	};
	
	return directive;
	
	function linkFunc(scope, element, attrs, footerCtrl)
	{
		footerCtrl.domain = element.attr('domain');
	}
}

