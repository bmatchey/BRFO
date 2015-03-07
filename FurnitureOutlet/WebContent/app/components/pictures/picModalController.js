angular.module('app.picModal', [])
	.controller('picModalCtrl', PicModalCtrl)
	.directive('picModalDialog', PicModalDialog);

function PicModalCtrl($scope, $modal)
{
	$scope.openModal = function () {
	    $modal.open({
	      templateUrl: 'yourTemplate.html'
	    });
}
}

function PicModalDialog()
{
	var directive =
	{
		restrict : 'E',
		replace : true,
		transclude : true, // we want to insert custom content inside the directive
		scope :
		{
			show : '='
		},
		link : linkFunc,
		templateUrl : "app/components/pictures/picModalDialog.tpl.html"
	};

	return directive;

	function linkFunc(scope, element, attrs)
	{
		scope.dialogStyle =
		{};
		if (attrs.width)
			scope.dialogStyle.width = attrs.width;
		if (attrs.height)
			scope.dialogStyle.height = attrs.height;
		scope.hideModal = function()
		{
			scope.show = false;
		};
	}
}
