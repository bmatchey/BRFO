angular.module('app.picslider', ['ngAnimate'])
	.controller('SliderCtrl', SliderCtrl)
	.directive('fadeInSlider', FadeInSliderDirective)
	.factory('changePicsService', ChangePicsService);


function SliderCtrl(logger, $timeout, $animate, $rootScope, $scope)
{
	var vm = this;
	vm.sliderNext = sliderNext;
	vm.sliderPrev = sliderPrev;
	vm.sliderNextClick = sliderNextClick;
	vm.sliderPrevClick = sliderPrevClick;
	vm.toggleTimer = toggleTimer;
	vm.sliderIndex = 0;
	vm.interval = 5000;
	vm.sliderImages = [];
	vm.srcFolder = 'assets';
	vm.target = "#";
	vm.sliderAnimation = 'fadeinout';
	vm.sliderOnOff = 'Slideshow Off';

	function sliderPrevClick()
	{
		sliderPrev();
		if (vm.sliderOnOff == 'Slideshow On')
			resetTimer();
	}
	
	function sliderNextClick()
	{
		sliderNext();
		if (vm.sliderOnOff == 'Slideshow On')
			resetTimer();
	}
	
	function sliderNext()
	{
		if (vm.sliderImages != null && vm.sliderImages.length > 0)
		{
			vm.sliderIndex = (vm.sliderIndex == vm.sliderImages.length - 1) ? 0 : vm.sliderIndex + 1;
		}
	}

	function sliderPrev()
	{
		if (vm.sliderImages != null && vm.sliderImages.length > 0)
		{
			vm.sliderIndex = (vm.sliderIndex == 0) ? vm.sliderImages.length - 1 : vm.sliderIndex - 1;
		}
	}
	
	var timer = null;
	
	var startTimer = function () 
	{
		timer = $timeout(function() {
			vm.sliderNext();
	        startTimer();
	    }, vm.interval);
		vm.sliderOnOff = 'Slideshow On';
	};
	
	var stopTimer = function()
	{
		$timeout.cancel(timer);
		timer = null;
		vm.sliderOnOff = 'Slideshow Off';
	};
	
	var resetTimer = function()
	{
		stopTimer();
		startTimer();
	}
	
	function toggleTimer()
	{
		if (timer == null)
			startTimer();
		else
			stopTimer();
	}
	
	// Turn on the slider first time.
	startTimer();

	
	function adjustImages(args)
	{
		var images = [];
		for (var i = 0; i < args.length; i++)
		{
			if ((args[i].src != null) && (args[i].Active.toUpperCase() == 'YES' || args[i].Active == null) && (args[i].Site == null || args[i].Site.indexOf(siteName) > -1)) 
			{
				var src;
				if (args[i].src.indexOf('http') != 0)
				{
					src  = vm.srcFolder + '/' + args[i].src;					
				}
				else
				{
					src = args[i].src;
				}
				
				images.push({src: src, title: args[i].title, target: args[i].target});
			}
		}
		
		return images;
	}
	
	$scope.$on('handlePicsChanged', handlePicsChanged);
	function handlePicsChanged()
	{
		$scope.sliderImages = changePicsService.images;
	}
	
	$scope.$on('sliderChanged', handleSliderChanged);
	function handleSliderChanged(event, args)
	{
		vm.sliderImages = adjustImages(args);
	}
	
	$scope.$on('settingsChanged', handleSettingsChanged);
	function handleSettingsChanged(event, args)
	{
		for (var i = 0; i < args.length; i++)
		{
			if (args[i].Setting == 'SliderAnimation' && args[i].Site == siteName) 
			{
				vm.sliderAnimation = args[i].Value;
			}
		}
	}

}

function FadeInSliderDirective($parse, logger)
{
	var directive = 
	{
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {},  // Add this line to create an isolated scope
        templateUrl: "app/components/pictures/fadeInSlideShow.tpl.html",
        controller: SliderCtrl,
        controllerAs: 'sliderCtrl',
        link: linkFunc
	};
	
	return directive;
	
	
	function linkFunc(scope, element, attrs, sliderCtrl)
	{
		sliderCtrl.sliderImages = scope.$eval(attrs.images);
		if (element.attr('srcFolder') != null)
			sliderCtrl.srcFolder = element.attr('srcFolder');
		sliderCtrl.interval = element.attr('interval');
		if (sliderCtrl.interval == null)
			sliderCtrl.interval = 2000;
		if (element.attr('target') != null)
			sliderCtrl.target = element.attr('target');
	}
}

function ChangePicsService($rootScope)
{
	var service = {};
	service.images = [];
	service.changePics = ChangePics;
	
	return service;
	
	function ChangePics(images)
	{
		this.images = images;
		$rootScope.$broadcast('handlePicsChanged');
	}
	
}

