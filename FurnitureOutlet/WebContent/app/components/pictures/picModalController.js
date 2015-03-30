angular.module('app.picModal', [])
	.controller('picModalCtrl', PicModalCtrl)
	.directive('modalDialog', modalDialog);

function PicModalCtrl(logger)
{
	var vm = this;
	vm.modalShown = false;
	vm.toggleModal = toggleModal;
	
	function toggleModal()
	{
		vm.modalShown = !vm.modalShown;
		logger.info('toggleModal clicked - shown = ' + vm.modalShown);
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
        template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='picCtrl.hideModal()'></div><div class='ng-modal-dialog' ng-style='picCtrl.dialogStyle'><div class='ng-modal-close' ng-click='picCtrl.hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
	    };
	
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
