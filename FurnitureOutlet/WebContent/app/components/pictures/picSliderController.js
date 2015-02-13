angular.module('app.picslider', ['ngAnimate'])
	.controller('SliderCtrl', SliderCtrl)
	.directive('fadeInSlider', FadeInSliderDirective);

function SliderCtrl(logger, $timeout, $animate)
{
	var vm = this;
	vm.sliderNext = sliderNext;
	vm.sliderIndex = 0;
	vm.interval = 5000;
	vm.sliderImages = [];
	vm.srcFolder = 'assets';
	vm.target = "#";


	function sliderNext()
	{
		vm.sliderIndex = (vm.sliderIndex == vm.sliderImages.length - 1) ? 0 : vm.sliderIndex + 1;
		//logger.info('Pic shown - ' + JSON.stringify(vm.brfoImages[vm.sliderIndex]));
	}

	var timer;
	var sliderFunc = function()
	{
		timer = $timeout(function()
		{
			vm.sliderNext();
			timer = $timeout(sliderFunc, vm.interval);
		}, vm.interval);
	};

	// Turn on the slider.
	sliderFunc();
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
