angular.module('app.products', [])
	.controller('productsCtrl', ProductsCtrl)
	.directive('productsShowcase', ProductsShowcaseDirective);

function ProductsCtrl()
{
	var vm = this;
	vm.maxVisible = 25;
	vm.products = [];
	vm.categories = [];
	vm.indexofCategory = indexofCategory;
	
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
	}
}


