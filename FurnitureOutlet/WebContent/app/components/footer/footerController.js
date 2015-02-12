angular.module('app.footer', [])
	.directive('footer', FooterDirective);


function FooterDirective($parse, logger)
{
	var directive = 
	{
		restrict: 'AE',
		replace: true,
		transclude: false,
        templateUrl: "app/components/footer/footer.tpl.html"
	};
	
	return directive;
}

