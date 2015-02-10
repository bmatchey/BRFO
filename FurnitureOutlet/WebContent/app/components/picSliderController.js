angular.module('app.picslider', ['ngAnimate'])
	.controller('SliderCtrl', SliderCtrl);

function SliderCtrl(logger, $timeout, $animate)
{
	var vm = this;
	vm.sliderNext = sliderNext;
	vm.sliderIndex = 0;
	vm.interval = 2000;

	vm.brfoImages = [
	{
		src : 'Black-River-Furniture-Outlet-Store-Front-3.png',
		title : 'Black River Furniture Outlet',
		index: 0
	},
	{
		src : 'Sleep-Center-Home-1.png',
		title : 'Sleep Center',
		index: 1
	},
	{
		src : 'Dressers-to-the-Sealing-1.png',
		title : 'Bedroom',
		index: 2
	},
	{
		src : 'BRF-Upholstery-Gallery-1.png',
		title : 'Upholstery Gallery',
		index: 3
	},
	{
		src : 'Black-River-Furniture-Tables.png',
		title : 'Dining',
		index: 4
	},
	{
		src : 'Black-River-Cabin-Furniture-Outside-1.png',
		title : 'Cabin',
		index: 5
	},
	{
		src : 'Black-River-Falls-Wisconsin-Rugs-1.png',
		title : 'Rugs',
		index: 6
	} ];

	function sliderNext()
	{
		vm.sliderIndex = (vm.sliderIndex == vm.brfoImages.length - 1) ? 0 : vm.sliderIndex + 1;
//		logger.info('Pic shown - ' + JSON.stringify(vm.brfoImages[vm.sliderIndex]));
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
