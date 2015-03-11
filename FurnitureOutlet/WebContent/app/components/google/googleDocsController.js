angular.module('app.googleDocs', ['ngSanitize'])
	.controller('googleDocsCtrl', GoogleDocsCtrl);


function GoogleDocsCtrl(logger, $timeout)
{
	var vm = this;
	vm.public_spreadsheet_url = "https://docs.google.com/spreadsheets/d/1eat5WwAwWoPhohkM_bBg-UFCyz3fE_Kt__3To5beSPg/pubhtml";	
	vm.storeCreated = storeCreated; 
	vm.pagesCreated = pagesCreated; 
	vm.items = [];
	vm.pages = [];

	Tabletop.init({
		key : vm.public_spreadsheet_url,
		callback : vm.storeCreated,
		wanted : [ 'BRFO' ],
		simpleSheet : true
	});

	Tabletop.init({
		key : vm.public_spreadsheet_url,
		callback : vm.pagesCreated,
		wanted : [ 'BRFOPages' ],
		simpleSheet : true
	});
	
    function storeCreated (data,tabletop) {
        $timeout(function() {
          vm.items = data;
        });
    }
	
    function pagesCreated (data,tabletop) {
        $timeout(function() {
          vm.pages = data;
        });
    }
    
}


//function GoogleDocsDirective($parse, $timeout, logger)
//{
//	var directive = 
//	{
//		restrict: 'E',
//		replace: true,
//		transclude: true,
//		scope: {},  // Add this line to create an isolated scope
//        link: linkFunc
//	};
//	
//	return directive;
//	
//	
//	function linkFunc(scope, element, attrs)
//	{
//		var public_spreadsheet_url = element.attr('spreadsheet');
//		var sheet = element.attr('sheet');
//
//	    Tabletop.init({ key: public_spreadsheet_url,
//	        callback: storeCreated,
//	        wanted: [sheet],
//	        simpleSheet: true
//	        });
//		
//	    function storeCreated (data,tabletop) {
//	        $timeout(function() {
//	        	scope.items = data;
//	        	scope.$apply();
//	            logger.info(JSON.stringify(data));
//	        });
//	    }
//	}
//}
