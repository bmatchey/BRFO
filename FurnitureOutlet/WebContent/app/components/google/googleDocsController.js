angular.module('app.googleDocs', [])
	.controller('googleDocsCtrl', GoogleDocsCtrl);


function GoogleDocsCtrl(logger, $timeout)
{
	var vm = this;
	vm.public_spreadsheet_url = "https://docs.google.com/spreadsheets/d/1eat5WwAwWoPhohkM_bBg-UFCyz3fE_Kt__3To5beSPg/pubhtml";	
	vm.sheet = "BRFO";
	vm.createStore = createStore; 

    Tabletop.init({ key: vm.public_spreadsheet_url,
        callback: vm.createStore,
      wanted: [vm.sheet],
        simpleSheet: true
  });
	
    function createStore (data,tabletop) {
        $timeout(function() {
          vm.items = data;
        });
    }
    
}
