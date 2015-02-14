angular.module('app.header', [])
	.controller('HeaderCtrl', HeaderCtrl)
	.directive('header', HeaderDirective);

function HeaderCtrl($rootScope, $parse, $location)
{
	var vm = this;
	vm.title = "Black River Furniture Outlet";
	vm.titleClickTarget = "index.html";
	vm.activeIndex = 0;
	vm.indexOfCaption = indexOfCaption;
	vm.menuItemClicked = menuItemClicked;
	
//	menu items.  if target is specified, the menu will route to there.  Otherwise, it only sets rootScope.activeMenuItem.  
	vm.menuItems = [
	                {caption: 'Home'},
	                {caption: 'Sleep Center'},
	                {caption: 'Bedroom'},
	                {caption: 'Upholstery Gallery'},
	                {caption: 'Dining'},
	                {caption: 'Cabin'},
	                {caption: 'Rugs'},
	                {caption: 'Surplus Outlet', target : 'http://www.blackriversurplus.com/'}
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
	
	function menuItemClicked(item)
	{
		if (item.target != null)
		{
			window.location = item.target;
		}
		else
		{
			vm.activeIndex = indexOfCaption(item.caption);
			$rootScope.activeMenuItem = item.caption;
		}
	}
}

function HeaderDirective($rootScope, $parse, logger)
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
		$rootScope.activeMenuItem = element.attr('activeItem');
	}
	
}
