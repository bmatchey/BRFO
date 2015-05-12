angular.module('app.products', [])
	.controller('productsCtrl', ProductsCtrl)
	.directive('productsShowcase', ProductsShowcaseDirective);

function ProductsCtrl()
{
	var vm = this;
	vm.maxVisible = 25;
	vm.products = [];
	vm.categories = [];
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
		
		for (var i=0; i < productsCtrl.products.length; i++)
		{
			if (productsCtrl.products[i].Active.toUpperCase() != 'YES')
				continue;
			
			var idx = -1;
			for (var j = 0; j < productsCtrl.categories.length; j++)
			{
				if (productsCtrl.categories[j] == productsCtrl.products[i].Pages)
				{
					idx = j;
					break;
				}
			}
			
			if (idx == -1)
			{
				productsCtrl.categories.push(productsCtrl.products[i].Pages);
			}
		}
	}
}


