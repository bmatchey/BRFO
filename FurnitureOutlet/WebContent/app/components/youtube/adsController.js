angular.module('app.ads', [])
	.controller('adCtrl', AdContainerCtrl)
	.service('adService', AdService)
	.directive('adsContainer', AdContainerDirective);

function AdContainerCtrl(adService)
{
	var vm = this;
	vm.element = null;
	vm.ads = adService.ads;
	vm.Title = '';
}

function AdService(logger)
{
	var vm = this;
	vm.ads = [];
	vm.handleAdsChanged = handleAdsChanged;
	
	function handleAdsChanged(event, args)
	{
		vm.ads = [];
		for (var i = 0; i < args.length; i++)
		{
			if (args[i].Active.toUpperCase() == 'TEST' && (args[i].Site.indexOf(siteName) > -1))
			{
				vm.ads.push(args[i]);
			}
		}
	}
}

function AdContainerDirective()
{
	var directive =
	{
		restrict : 'E',
		scope:
			{
				title: "@"
			},
		templateUrl: "app/components/youtube/adsContainer.tpl.html",
		controller : AdContainerCtrl,
		controllerAs : 'adCtrl',
		link : linkFunc
	};

	return directive;

	function linkFunc(scope, element, attrs, adCtrl)
	{
		adCtrl.element = element;
		adCtrl.Title = attrs.title;
	}
}


