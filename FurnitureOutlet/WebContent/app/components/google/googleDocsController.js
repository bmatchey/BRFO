angular.module('app.googleDocs', ['ngSanitize'])
	.controller('googleDocsCtrl', GoogleDocsCtrl);


function GoogleDocsCtrl($timeout, $rootScope)
{
	var vm = this;
	vm.public_spreadsheet_url = "https://docs.google.com/spreadsheets/d/1eat5WwAwWoPhohkM_bBg-UFCyz3fE_Kt__3To5beSPg/pubhtml";	
	vm.storeCreated = storeCreated; 
	vm.pagesCreated = pagesCreated; 
	vm.adsCreated = adsCreated;
	vm.items = [];
	vm.pages = [{Page: 'Home', PageText: 'Loading content.  Please wait...  <img src="assets/spinner_small.gif" />' }];
	vm.ads = [];

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

	Tabletop.init({
		key : vm.public_spreadsheet_url,
		callback : vm.adsCreated,
		wanted : [ 'Ads' ],
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
          $rootScope.$broadcast('menuPagesChanged', vm.pages);
        });
    }
	
    function adsCreated (data,tabletop) {
        $timeout(function() {
          vm.ads = data;
          $rootScope.$broadcast('adsChanged', vm.ads);
        });
    }
    
}
