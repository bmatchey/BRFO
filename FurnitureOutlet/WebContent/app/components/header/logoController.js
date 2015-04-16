angular.module('app.logo', [])
	.controller('logoCtrl', LogoCtrl)
	.directive('logoCircle', LogoCircleDirective);

function LogoCtrl($rootScope, $scope, $parse)
{
	var vm = this;
	vm.title = '';
	vm.element = null;
	
	$scope.$on('settingsChanged', handleSettingsChanged);
	function handleSettingsChanged(event, args)
	{
		for (var i = 0; i < args.length; i++)
		{
			if (args[i].Setting == 'LogoPic' && args[i].Site == siteName)
			{
				vm.element.css({'background-image': 'url(' + args[i].Value +')'});
			}
		}
	}
}

function LogoCircleDirective($parse, logger)
{
	var directive = 
	{
		restrict: 'AE',
		replace: true,
		transclude: false,
        template: "<div id='divLogoContainer'><div class='logoText'>{{logoCtrl.title}}</div></div>",
        controller: LogoCtrl,
        controllerAs: 'logoCtrl',
        link: linkFunc
	};
	
	return directive;
	
	function linkFunc(scope, element, attrs, logoCtrl)
	{
		logoCtrl.title = element.attr('title');
		logoCtrl.element = element;
	}
}

