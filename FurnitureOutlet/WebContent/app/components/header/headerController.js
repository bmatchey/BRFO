angular.module('app.header', [])
	.controller('HeaderCtrl', HeaderCtrl)
	.directive('header', HeaderDirective);

function HeaderCtrl($parse)
{
	var vm = this;
	vm.title = "Black River Furniture Outlet";
	vm.titleClickTarget = "index.html";
	vm.activeIndex = 0;
	vm.indexOfCaption = indexOfCaption;
	
	vm.menuItems = [
	                {
	                	caption: 'Home',
	             		target : 'index.html',	             		
	             		index: 0
	             	},
	                {
	                	caption: 'Sleep Center',
	             		target : 'sleepCenter.html',
	             		index: 1
	             	},
	                {
	                	caption: 'Bedroom',
	             		target : 'index.html?Bedroom',
	             		index: 2
	             	},
	                {
	                	caption: 'Upholstery Gallery',
	             		target : 'index.html?Upholstery Gallery',
	             		index: 3
	             	},
	                {
	                	caption: 'Dining',
	             		target : 'index.html?Dining',
	             		index: 4
	             	},
	                {
	                	caption: 'Cabin',
	             		target : 'index.html?Cabin',
	             		index: 5
	             	},
	                {
	                	caption: 'Rugs',
	             		target : 'index.html?Rugs',
	             		index: 6
	             	},
	                {
	                	caption: 'Surplus Outlet',
	             		target : 'http://www.blackriversurplus.com/',
	             		index: 7
	             	}
	             	];
	             	
	function indexOfCaption(caption)
	{
		for(var i=0; i<vm.menuItems.length; i++)
		{
			if (vm.menuItems[i].caption == caption)
			{
				return i; 
			}
		}
		
		return -1;
	}
}

function HeaderDirective($parse, logger)
{
	var directive = 
	{
		restrict: 'AE',
		replace: true,
		transclude: true,
        templateUrl: "app/components/header/header.tpl.html",
        controller: HeaderCtrl,
        controllerAs: 'headerCtrl',
        link: linkFunc
	};
	
	return directive;
	
	function linkFunc(scope, element, attrs, headerCtrl)
	{
		headerCtrl.activeIndex = headerCtrl.indexOfCaption(element.attr('activeItem'));
	}
	
}
