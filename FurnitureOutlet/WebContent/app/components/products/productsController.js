angular.module('app.products', [])
	.controller('productsCtrl', ProductsCtrl)
	.directive('productsShowcase', ProductsShowcaseDirective)
	.directive('productDetail', ProductDetailDirective);

function ProductsCtrl($rootScope, utility, logger)
{
	var vm = this;
	vm.maxVisible = 25;
	vm.products = [];
	vm.categories = [];
	vm.indexofCategory = indexofCategory;
	vm.showDetail = showDetail;
	vm.handleShowItemDetail = handleShowItemDetail;
	vm.returnToCaller = returnToCaller;
	vm.detailItem = null;
	vm.callingPage = null;
	vm.lastOffset = 0;
	vm.socialShareText = '';
	vm.socialShareUrl = '';
	//vm.facebookAppId = '1764896063733620';
	
	function indexofCategory(categories, category)
	{
		for(var idx = 0; idx < categories.length; idx++)
		{
			if (categories[idx] == category)
			{
				return idx;
			}
		}
		
		return -1;
	}
	
	function showDetail(item)
	{
		vm.callingPage = $rootScope.activeMenuItem;
		$rootScope.detailItem = item;
		$rootScope.activeMenuItem = 'ItemDetail';
			
		vm.lastOffset = $(window.pageYOffset);
		var topOfMainMenu = 125; // TODO: get actual.
		utility.scrollMainWindowAnimated(topOfMainMenu);
	}
	
	function handleShowItemDetail(event, args)
	{
		logger.info('ShowItemDetail ' + args.productName);
		
		for(var idx = 0; idx < vm.products.length; idx++)
		{
			if (vm.products[idx].Product == args.productName)
			{
				if (args.productModel == null || args.productModel == vm.products[idx].ModelNbr)
				{
					showDetail(vm.products[idx]);
				}
			}
		}
	}
	
	function returnToCaller()
	{
		$rootScope.$broadcast('changeMenuActive', 'Showcase');
		// utility.scrollMainWindowAnimated(vm.lastOffset); // TODO: lastOffset is set in the wrong scope.
	}
}

function ProductsShowcaseDirective(logger)
{
	var directive =
	{
		restrict : 'E',
		templateUrl: "app/components/products/productsContainer.tpl.html",
		controller : ProductsCtrl,
		controllerAs : 'productsCtrl',
		link : linkFunc
	};

	return directive;

	function linkFunc(scope, element, attrs, productsCtrl)
	{
		productsCtrl.products = scope.$eval(attrs.products);
		productsCtrl.maxVisible = attrs.maxvisible;
		
		for (var productIdx = 0; productIdx < productsCtrl.products.length; productIdx++)
		{
			if (productsCtrl.products[productIdx].Active.toUpperCase() != 'YES')
				continue;
			
			if (productsCtrl.products[productIdx].Image.toLowerCase().indexOf('youtu.be') > 0)
			{
				productsCtrl.products[productIdx].isVideo = "Yes";
				productsCtrl.products[productIdx].YouTubeID = productsCtrl.products[productIdx].Image.substring('https://youtu.be/'.length);
				logger.info('YouTubeID = ' + productsCtrl.products[productIdx].YouTubeID);
			}
			else
			{
				productsCtrl.products[productIdx].isVideo = "No";
			}
			
			var productCategories = productsCtrl.products[productIdx].Categories.split(',');
			for(var productCategorIdx = 0; productCategorIdx < productCategories.length; productCategorIdx++)
			{
				var idx = productsCtrl.indexofCategory(productsCtrl.categories, productCategories[productCategorIdx]);
				if (idx == -1)
				{
					productsCtrl.categories.push(productCategories[productCategorIdx]);
				}
			}
		}

		scope.$on('showItemDetail', productsCtrl.handleShowItemDetail);
	}
}

function ProductDetailDirective($rootScope, $location, base64, logger)
{
	var directive =
	{
		restrict : 'E',
		//scope: {},  // Add this line to create an isolated scope
	    replace: true, // Replace with the template.
	    transclude: true, // we want to insert custom content inside the directive
		templateUrl: "app/components/products/productDetail.tpl.html",
		controller : ProductsCtrl,
		controllerAs : 'prodCtrl',
		link : linkFunc
	};

	return directive;

	function linkFunc(scope, element, attrs, prodCtrl)
	{
		prodCtrl.detailItem = $rootScope.detailItem;

		var itemId = base64.encode(prodCtrl.detailItem.Product + ':' + prodCtrl.detailItem.ModelNbr);
		var itemDescription = prodCtrl.detailItem.Product;
		if (siteName == 'BRFO')
		{
			itemDescription += ' in the ' + prodCtrl.detailItem.Categories + ' section at Black River Furniture Outlet.';
			prodCtrl.socialShareUrl = 'http://blackriverfurnitureoutlet.com?item=' + itemId;
		}
		else
		{
			itemDescription += ' in the ' + prodCtrl.detailItem.Categories + ' section at Black River Surplus Outlet.';
			prodCtrl.socialShareUrl = 'http://www.blackriversurplus.com?item=' + itemId;
		}

		prodCtrl.socialShareText = 'Check out the awesome ' + itemDescription;
		//prodCtrl.socialShareUrl = $location.url('/') + '?item=' + itemId;
	}
}


