angular.module('app.googleDocs', ['ngSanitize'])
	.controller('googleDocsCtrl', GoogleDocsCtrl);


function GoogleDocsCtrl($timeout, $rootScope, $scope, logger)
{
	var vm = this;
	vm.public_spreadsheet_url = "https://docs.google.com/spreadsheets/d/1eat5WwAwWoPhohkM_bBg-UFCyz3fE_Kt__3To5beSPg/pubhtml";	
	vm.storeCreated = storeCreated; 
	vm.pagesCreated = pagesCreated; 
	vm.sliderCreated = sliderCreated;
	vm.adsCreated = adsCreated;
	vm.settingsCreated = settingsCreated;
	vm.pages = [{Page: 'Home', PageText: 'Loading content.  Please wait...  <img src="assets/spinner_small.gif" />' }];
	vm.isloaded = false;
	vm.ads = [];
	vm.settings = [];
	vm.siteName = siteName;
	vm.backgroundPic = '';
	vm.missionStatement = '';
	vm.maxShowcase = 16;

	Tabletop.init({
		key : vm.public_spreadsheet_url,
		callback : vm.storeCreated,
		wanted : [ siteName ],
		simpleSheet : true
	});

	Tabletop.init({
		key : vm.public_spreadsheet_url,
		callback : vm.sliderCreated,
		wanted : [ 'SliderPics' ],
		simpleSheet : true
	});

	Tabletop.init({
		key : vm.public_spreadsheet_url,
		callback : vm.pagesCreated,
		wanted : [ siteName + 'Pages' ],
		simpleSheet : true
	});

	Tabletop.init({
		key : vm.public_spreadsheet_url,
		callback : vm.adsCreated,
		wanted : [ 'Ads' ],
		simpleSheet : true
	});

	Tabletop.init({
		key : vm.public_spreadsheet_url,
		callback : vm.settingsCreated,
		wanted : [ 'Settings' ],
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
          vm.isloaded = true;
        });
    }
	
    function sliderCreated (data,tabletop) {
        $timeout(function(){
        	$rootScope.$broadcast('sliderChanged', data);
        });
    }
	
    function adsCreated (data,tabletop) {
        $timeout(function() {
          vm.ads = data;
          $rootScope.$broadcast('adsChanged', vm.ads);
        });
    }
	
    function settingsCreated (data,tabletop) {
        $timeout(function() {
          vm.settings = data;
          $rootScope.$broadcast('settingsChanged', vm.settings);
        });
    }
        
	$scope.$on('settingsChanged', handleSettingsChanged);
	function handleSettingsChanged(event, args)
	{
		for (var i = 0; i < args.length; i++)
		{
			if (args[i].Setting == 'BackgroundPic' && args[i].Site == siteName) 
			{
				vm.backgroundPic = args[i].Value;
			}
			else if (args[i].Setting == 'MissionStatement' && args[i].Site == siteName)
			{
				vm.missionStatement = args[i].Value;
			}
			else if (args[i].Setting == 'MaxShowcase' && args[i].Site == siteName)
			{
				vm.maxShowcase = parseInt(args[i].Value);
			}
		}
	}
	
}
