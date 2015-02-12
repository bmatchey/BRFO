angular.module('app.brands', [])
	.controller('BrandsCtrl', BrandsCtrl)
	.directive('brands', BrandsDirective);

function BrandsCtrl($parse)
{
	var vm = this;

	vm.brandItems = [
	                 {
	                	 src: 'Restonic-logo-for-Black-River-Furniture.png'	                	 
	                 },
	                 {
	                	 src: 'logo_symbol_mattress-for-Black-River-Furniture.png'	                	 
	                 },
	                 {
	                	 src: 'ENGLANDER_LOGO-for-Black-River-Furniture.png'	                	 
	                 },
	                 {
	                	 src: 'corsicana_logo_old-for-Black-River-Furniture.png'	                	 
	                 },
	                 {
	                	 src: 'Catnapper_for-Black-River-Furniture.png'	                	 
	                 },
	                 {
	                	 src: 'BestCraft.png'	                	 
	                 },
	                 {
	                	 src: 'best_home_furnishings_for-Black-River-Furniture.png'	                	 
	                 },
	                 {
	                	 src: 'ashley_furniture_logo-for-Black-River-Furniture.png'
	                 }
	             	];
}

function BrandsDirective($parse, logger)
{
	var directive = 
	{
		restrict: 'AE',
		replace: true,
		transclude: false,
        templateUrl: "app/components/brands/brands.tpl.html",
        controller: BrandsCtrl,
        controllerAs: 'brandsCtrl'
	};
	
	return directive;
}
