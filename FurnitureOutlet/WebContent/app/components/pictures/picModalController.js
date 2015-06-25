angular.module('app.picModal', [])
	.controller('picModalCtrl', PicModalCtrl)
	.controller('videoModalCtrl', VideoModalCtrl)
	.directive('modalDialog', modalDialog)
	.directive('modalVideo', modalVideo);

function PicModalCtrl(logger)
{
	var vm = this;
	vm.modalShown = false;
	vm.toggleModal = toggleModal;
	
	function toggleModal()
	{
		vm.modalShown = !vm.modalShown;
	}
}

function VideoModalCtrl($rootScope, $scope, $compile, logger, settings)
{
	var vm = this;
	vm.modalShown = false;
	vm.toggleModal = toggleModal;
	vm.stopAllVideos = stopAllVideos;
	
	function toggleModal()
	{
		vm.modalShown = !vm.modalShown;
		
		if (vm.modalShown)
		{
			var newElement = $compile( "<youtube autostart='true' videoid='" + settings.videoTourYouTubeID + "'></youtube>" )( $scope );
			angular.element(document.getElementById('videoContainer')).append(newElement);
		}
		else
		{
			logger.info('close.');
		}
	}
	
	function stopAllVideos()
	{
		$rootScope.$broadcast('StopAllVideos', 'VideoModalCtrl');
	}
}

function modalDialog()
{
	var directive = {
	    restrict: 'E',
	    scope: {
	      show: '='
	    },
	    replace: true, // Replace with the template below
	    transclude: true, // we want to insert custom content inside the directive
        controller: PicModalCtrl,
        controllerAs: 'picCtrl',
        link: linkFunc,
        templateUrl: "app/components/pictures/picModalDialog.tpl.html"
	    };
    //template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='picCtrl.hideModal()'></div><div class='ng-modal-dialog' ng-style='picCtrl.dialogStyle'><div class='ng-modal-close' ng-click='picCtrl.hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
	
	return directive;
	  
	function linkFunc(scope, element, attrs, picCtrl)
	{
		picCtrl.dialogStyle = {};
	      if (attrs.width)
	    	  picCtrl.dialogStyle.width = attrs.width;
	      if (attrs.height)
	    	  picCtrl.dialogStyle.height = attrs.height;
	      picCtrl.hideModal = function() 
	      {
	    	  scope.show = false;
	      };
	}
}

function modalVideo($rootScope)
{
	var directive = {
		    restrict: 'E',
		    scope: {
		      show: '='
		    },
		    replace: true, // Replace with the template below
		    transclude: true, // we want to insert custom content inside the directive
	        controller: VideoModalCtrl,
	        controllerAs: 'vidCtrl',
	        link: linkFunc,
	        templateUrl: "app/components/pictures/picModalVideo.tpl.html"
		    };
		
		return directive;
		  
		function linkFunc(scope, element, attrs, vidCtrl)
		{
			vidCtrl.element = element;
			vidCtrl.dialogStyle = {};
		      if (attrs.width)
		    	  vidCtrl.dialogStyle.width = attrs.width;
		      if (attrs.height)
		    	  vidCtrl.dialogStyle.height = attrs.height;
		      vidCtrl.hideModal = function($rootScope)
				{
					scope.show = false;
					vidCtrl.stopAllVideos();
					var vidNode = document.getElementById('videoContainer');
					while (vidNode && vidNode.firstChild)
					{
						vidNode.removeChild(vidNode.firstChild);
					}
				};
		}
}
