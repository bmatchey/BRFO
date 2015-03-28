angular.module('app.header', [])
	.controller('HeaderCtrl', HeaderCtrl)
	.directive('header', HeaderDirective);

function HeaderCtrl($rootScope, $scope, $location, logger)
{
	var vm = this;
	vm.title = (siteName == "BRFO") ? "Black River Furniture Outlet" : "Black River Surplus Outlet";
	vm.titleClickTarget = "index.html";
	vm.activeIndex = 0;
	vm.indexOfCaption = indexOfCaption;
	vm.menuItemClicked = menuItemClicked;
	vm.addStaticMenuItems = addStaticMenuItems;
	vm.getParameterByName = getParameterByName;
	
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
		}
	}
	
	$scope.$on('menuPagesChanged', handlePagesChanged);
	function handlePagesChanged(event, args)
	{
		vm.menuItems = [];
		for (var i = 0; i < args.length; i++)
		{
			if (args[i].Active == 'Yes')
			{
				vm.menuItems.push({caption: args[i].Page});
			}
		}
		addStaticMenuItems();

		var startPage = getParameterByName('page');
		if (startPage.length > 0)
		{
			var pageIdx = indexOfCaption(startPage);
			if (pageIdx > -1)
			{
				vm.activeIndex = pageIdx; 
				$rootScope.activeMenuItem = startPage;
			}
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
	
	function getParameterByName(name) 
	{
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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
	}
	
}
