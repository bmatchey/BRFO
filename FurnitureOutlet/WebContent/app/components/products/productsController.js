angular.module('app.products', [])
	.controller('productsCtrl', ProductsCtrl)
	.directive('productsShowcase', ProductsShowcaseDirective)
	.directive('productDetail', ProductDetailDirective);

function ProductsCtrl($rootScope, logger)
{
	var vm = this;
	vm.maxVisible = 25;
	vm.products = [];
	vm.categories = [];
	vm.indexofCategory = indexofCategory;
	vm.showDetail = showDetail;
	vm.handleShowItemDetail = handleShowItemDetail;
	vm.detailItem = null;
	
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
		$rootScope.detailItem = item;
		$rootScope.activeMenuItem = 'ItemDetail';
	}
	
	function handleShowItemDetail(event, args)
	{
		for(var idx = 0; idx < vm.products.length; idx++)
		{
			if (vm.products[idx].Product == args.productName)
			{
				if (args.productModel == null ||args.productModel == vm.products[idx].ModelNbr)
				{
					showDetail(vm.products[idx]);
				}
			}
		}
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

function ProductDetailDirective($rootScope, logger)
{
	var directive =
	{
		restrict : 'E',
		templateUrl: "app/components/products/productDetail.tpl.html",
		controller : ProductsCtrl,
		controllerAs : 'productsCtrl',
		link : linkFunc
	};

	return directive;

	function linkFunc(scope, element, attrs, productsCtrl)
	{
		productsCtrl.detailItem = $rootScope.detailItem;
	}
}


