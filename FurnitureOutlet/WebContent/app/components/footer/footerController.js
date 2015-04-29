angular.module('app.footer', [])
	.controller('footerCtrl', FooterCtrl)
	.directive('footer', FooterDirective);

function FooterCtrl($rootScope, $scope, $parse, logger)
{
	var vm = this;
	vm.domain = "";
	vm.faceBookAddress = $rootScope.faceBookAddress;
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
		//footerCtrl.faceBookAddress = attrs.faceBookAddress;
		//footerCtrl.faceBookAddress = element.attr('faceBookAddress');
		logger.info('Facebook: ' + footerCtrl.faceBookAddress);
		// https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2855.261906592165!2d-90.811392!3d44.30456600000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880109046ef38b41%3A0x286f73ee3c0042b3!2sBlack+River+Furniture+Outlet!5e0!3m2!1sen!2sus!4v1423715345429
	}
}

