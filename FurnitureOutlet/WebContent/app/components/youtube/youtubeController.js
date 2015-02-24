angular.module('app.youtube', [])
	.controller('youtubeCtrl', YouTubeCtrl)
	.directive('youtube', YouTubeDirective)
	.constant('YT_event',
		{
			STOP : 0,
			PLAY : 1,
			PAUSE : 2
		});

// TODO: Finish reading: http://blog.oxrud.com/posts/creating-youtube-directive/

function YouTubeCtrl(logger, YT_event)
{
	var vm = this;

	//initial settings
	vm.yt =
	{
		width : 600,
		height : 480,
		videoid : ""
	};
}

function YouTubeDirective($window, YT_event, logger)
{
	var directive =
	{
		restrict : 'E',
		template : "<div></div>",
		scope: 
			{
			height: "@",
			width: "@",
			videoid: "@"
			},
		controller : YouTubeCtrl,
		controllerAs : 'youtubeCtrl',
		link : linkFunc
	};

	return directive;

	function linkFunc(scope, element, attrs, youtubeCtrl)
	{
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		var player;

		$window.onYouTubeIframeAPIReady = function()
		{
			player = new YT.Player(element.children()[0],
			{
				playerVars :
				{
					autoplay : 0,
					html5 : 1,
					theme : "light",
					modesbranding : 0,
					color : "white",
					iv_load_policy : 3,
					showinfo : 1,
					controls : 1
				},

				height : scope.height,
				width : scope.width,
				videoId : scope.videoid
			});
		}
	}
}
