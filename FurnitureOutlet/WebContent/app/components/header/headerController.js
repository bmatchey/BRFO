angular.module('app.header', [])
	.controller('HeaderCtrl', HeaderCtrl)
	.directive('header', HeaderDirective)
	.directive('menulist', MenuListDirective);

function HeaderCtrl($rootScope, $scope, $location, utility, logger)
{
	var vm = this;
	vm.title = (siteName == "BRFO") ? "Black River Furniture Outlet" : "Black River Surplus Outlet";
	vm.titleClickTarget = "index.html";
	vm.activeIndex = 0;
	vm.indexOfCaption = indexOfCaption;
	vm.menuItemClicked = menuItemClicked;
	vm.addStaticMenuItems = addStaticMenuItems;
	vm.handleChangeMenuActive = handleChangeMenuActive;
	vm.handleProductsChanged = handleProductsChanged;
	
//	menu items.  if target is specified, the menu will route to there.  Otherwise, it only sets rootScope.activeMenuItem.  
	vm.menuItems = [];
	vm.staticMenuItems = [];

	
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
			$rootScope.$broadcast('menuActiveChanged', item);
		}
	}
	
	function handleChangeMenuActive(event, pageName)
	{
		var pageIdx = indexOfCaption(pageName);
		if (pageIdx > -1)
		{
			vm.activeIndex = pageIdx; 
			$rootScope.activeMenuItem = pageName;
		}
	}
	
	function addStaticMenuItems()
	{
		for (var i = 0; i < vm.staticMenuItems.length; i++)
		{
			if (indexOfCaption(vm.staticMenuItems[i].caption) == -1)
			{
				vm.menuItems.push(vm.staticMenuItems[i]);
			}
		}
	}
	
	function handleProductsChanged(event, args)
	{
		vm.menuItems = [];
		for (var i = 0; i < args.length; i++)
		{
			if (args[i].Active.toUpperCase() == 'YES')
			{
				vm.menuItems.push({caption: args[i].Page});
			}
		}
		addStaticMenuItems();
	}
		
}

function HeaderDirective($rootScope, $parse, logger)
{
	var directive = 
	{
		restrict: 'E',
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
		if (headerCtrl.activeIndex == -1)
		{
			headerCtrl.activeIndex = 0;
		}
		$rootScope.activeMenuItem = element.attr('activeItem');
		if (element.attr('menuItems') != null)
		{
			headerCtrl.menuItems = scope.$eval(element.attr('menuItems'));
		}
		if (element.attr('staticMenuItems') != null)
		{
			headerCtrl.staticMenuItems = scope.$eval(element.attr('staticMenuItems'));
			headerCtrl.addStaticMenuItems();
		}

		scope.$on('productsChanged', headerCtrl.handleProductsChanged);
		scope.$on('changeMenuActive', headerCtrl.handleChangeMenuActive);
	}
}

function MenuListDirective($rootScope, $parse, logger)
{
	var directive = 
	{
		restrict: 'AE',
		replace: true,
        controller: HeaderCtrl,
        controllerAs: 'menuCtrl',
        link: linkFunc
	};

	return directive;
	
	function linkFunc(scope, element, attrs, menuCtrl)
	{
		menuCtrl.activeIndex = menuCtrl.indexOfCaption(element.attr('activeItem'));
		if (menuCtrl.activeIndex == -1)
		{
			menuCtrl.activeIndex = 0;
		}
		$rootScope.activeMenuItem = element.attr('activeItem');
		if (element.attr('menuItems') != null)
		{
			menuCtrl.menuItems = scope.$eval(element.attr('menuItems'));
		}
		if (element.attr('staticMenuItems') != null)
		{
			menuCtrl.staticMenuItems = scope.$eval(element.attr('staticMenuItems'));
			menuCtrl.addStaticMenuItems();
		}
		
		scope.$on('changeMenuActive', menuCtrl.handleChangeMenuActive);
	}
}
