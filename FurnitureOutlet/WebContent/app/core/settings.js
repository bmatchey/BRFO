angular
    .module('app.core')
	.controller('settingsCtrl', SettingsCtrl)
    .factory('settings', settings);



function SettingsCtrl($scope, settings, logger)
{
	var vm = this;
	vm.storeHours = settings.storeHours;
	vm.faceBookAddress = settings.faceBookAddress;
	vm.emailAddress = settings.emailAddress;
	vm.videoTourYouTubeID = settings.videoTourYouTubeID;
	
	// Add watches on the settings service properties so bindings to the settingsCtrl are notified.
	$scope.$watch(function () { return settings.storeHours; },
            function (value) {
                vm.storeHours = value;
            }
        );

	$scope.$watch(function () { return settings.faceBookAddress; },
            function (value) {
                vm.faceBookAddress = value;
            }
        );

	$scope.$watch(function () { return settings.emailAddress; },
            function (value) {
                vm.emailAddress = value;
            }
        );

	$scope.$watch(function () { return settings.videoTourYouTubeID; },
            function (value) {
                vm.videoTourYouTubeID = value;
            }
        );
}

function settings() 
{
    var service = 
    {
        helloWorld: 'Hello World',
        storeHours: '<br> Mon. - Fri. 10 a.m. - 6 p.m.<br> Sat. 9 a.m. - 6 p.m.<br> Sun. Noon - 5 p.m.',
        faceBookAddress: '',
        emailAddress: 'brsurplus@yahoo.com',
        videoTourYouTubeID: ''
    };
    return service;
    
}
