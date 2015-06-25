angular.module('app.googleDocs', ['ngSanitize'])
	.controller('googleDocsCtrl', GoogleDocsCtrl);

function GoogleDocsCtrl($timeout, $rootScope, $scope, settings, adService, logger)
{
	var vm = this;
	vm.public_spreadsheet_url = "https://docs.google.com/spreadsheets/d/1eat5WwAwWoPhohkM_bBg-UFCyz3fE_Kt__3To5beSPg/pubhtml";	
	vm.storeCreated = storeCreated; 
	vm.sliderCreated = sliderCreated;
	vm.adsCreated = adsCreated;
	vm.settingsCreated = settingsCreated;
	vm.isloaded = false;
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
	
    function sliderCreated (data,tabletop) {
        $timeout(function(){
        	$rootScope.$broadcast('sliderChanged', data);
        });
    }
	
    function adsCreated (data,tabletop) {
        $timeout(function() {
          adService.handleAdsChanged(null, data);
          $rootScope.$broadcast('adsChanged', vm.ads);
        });
    }
	
    function settingsCreated (data,tabletop) {
        $timeout(function() {
          vm.settings = data;
          vm.isloaded = true;  // Flag done on the last sheet requested.
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
	
}
