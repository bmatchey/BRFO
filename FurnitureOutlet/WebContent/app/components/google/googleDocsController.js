angular.module('app.googleDocs', ['ngSanitize'])
	.controller('googleDocsCtrl', GoogleDocsCtrl);

function GoogleDocsCtrl($timeout, $rootScope, $scope, $http, settings, base64, utility, adService, logger)
{
	var vm = this;
	vm.public_spreadsheet_url = "https://docs.google.com/spreadsheets/d/1eat5WwAwWoPhohkM_bBg-UFCyz3fE_Kt__3To5beSPg/pubhtml";	
	vm.storeCreated = storeCreated; 
	//vm.sliderCreated = sliderCreated;
	vm.adsCreated = adsCreated;
	vm.settingsCreated = settingsCreated;
	vm.loadJSON = loadJSON;
	vm.loadSpreadsheet = loadSpreadsheet;
	vm.isloaded = false;
	vm.settings = [];
	vm.siteName = siteName;
	vm.backgroundPic = '';
	vm.missionStatement = '';
	vm.maxShowcase = 16;
	
	// Load our local JSON copy first, then load the Google spreadsheet for the most recent data.  If Google fails, we are still running.
	loadJSON("app/core/BlackRiverOutlets.json");
	loadSpreadsheet(vm.public_spreadsheet_url);

	function loadJSON(jsonUrl)
	{
		$http.get(jsonUrl)
	       .then(function(workbook){
	    	   vm.settingsCreated(workbook.data.Settings, null);
	    	   vm.storeCreated(workbook.data[siteName], null);
	    	   //vm.sliderCreated(workbook.data.SliderPics, null); 
	    	   vm.adsCreated(workbook.data.Ads, null);
	        });
	}
	
	function loadSpreadsheet(spreadsheeturl)
	{
		Tabletop.init({
			key : spreadsheeturl,
			callback : vm.settingsCreated,
			wanted : [ 'Settings' ],
			simpleSheet : true
		});

		Tabletop.init({
			key : spreadsheeturl,
			callback : vm.storeCreated,
			wanted : [ siteName ],
			simpleSheet : true
		});
	
//		Tabletop.init({
//			key : spreadsheeturl,
//			callback : vm.sliderCreated,
//			wanted : [ 'SliderPics' ],
//			simpleSheet : true
//		});
	
		Tabletop.init({
			key : spreadsheeturl,
			callback : vm.adsCreated,
			wanted : [ 'Ads' ],
			simpleSheet : true
		});

	}
	
    function storeCreated (data,tabletop) {
        $timeout(function() {
          vm.items = data;
          $rootScope.$broadcast('productsChanged', data);
        });
    }
	
//    function sliderCreated (data,tabletop) {
//        $timeout(function(){
//        	$rootScope.$broadcast('sliderChanged', data);
//        });
//    }
	
    function settingsCreated (data,tabletop) {
        $timeout(function() {
          vm.settings = data;
          $rootScope.$broadcast('settingsChanged', vm.settings);
        });
    }
	
    function adsCreated (data,tabletop) {
        $timeout(function() {
          adService.handleAdsChanged(null, data);
          vm.isloaded = true;  // Flag done on the last sheet requested.
          $rootScope.$broadcast('adsChanged', vm.ads);
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
			else if (args[i].Setting == 'FaceBookAddress' && args[i].Site == siteName)
			{
				settings.faceBookAddress = args[i].Value;
			}			
			else if (args[i].Setting == 'StoreHours' && args[i].Site == siteName)
			{
				settings.storeHours = args[i].Value;
			}			
			else if (args[i].Setting == 'EmailAddress' && args[i].Site == siteName)
			{
				settings.emailAddress = args[i].Value;
			}
			else if (args[i].Setting == 'VideoTour' && args[i].Site == siteName)
			{
				settings.videoTourYouTubeID = args[i].Value;
			}
		}
	}
	
	$scope.$on('productsChanged', handleProductsChanged);
	function handleProductsChanged(event, args)
	{
		var startPage = utility.getParameterByName('page');
		if (startPage.length > 0)
		{
			$rootScope.$broadcast('changeMenuActive', startPage);
		}

		var detailItem = utility.getParameterByName('item');
		if (detailItem.length > 0)
		{
			$rootScope.$broadcast('changeMenuActive', 'Showcase');
			
			var itemId = base64.decode(detailItem).split(':');
			var productName = itemId[0];
			var productModel = itemId[1];
			
//			var testProduct = '6 Walnut Stump Table:';
//			logger.info('Base64(' + testProduct + ') = ' + base64.encode(testProduct))
//			logger.info('Product detail: ' + productName + ':' + productModel);
			
			$rootScope.$broadcast('showItemDetail', 
					{ 
						productName: productName,
						productModel: productModel
					});
		}
	}
}
