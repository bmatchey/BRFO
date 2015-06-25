angular.module('app.youtube', [])
	.controller('youtubeCtrl', YouTubeCtrl)
	.directive('youtube', YouTubeDirective)
	.service('youtubeService', YouTubeService)
	.constant('YT_event',
		{
			STOP : 0,
			PLAY : 1,
			PAUSE : 2
		});

// TODO: Finish reading: http://blog.oxrud.com/posts/creating-youtube-directive/
// Reference: https://github.com/bulkismaslom/angular-youtube-player

function YouTubeCtrl(logger, youtubeService, YT_event, $scope)
{
	var vm = this;
	vm.player = null;
	vm.element = null;
	vm.cueVideo = cueVideo;
	vm.getPlayer = getPlayer;
	vm.autoStart = false;

	//initial settings
	vm.yt =
	{
		width : 600,
		height : 480,
		videoid : ""
	};

		
	function init()
	{
		youtubeService.youTubeIframeAPIReady().then(function()
		{
			vm.cueVideo();
		}, function()
		{
			logger.error('Failed to initialize YouTube API.');
		});
	};
	
	init();
	
	function cueVideo()
	{
		if (vm.player == null)
		{
			vm.getPlayer();
		}
	}
	
	function getPlayer()
	{
		if (!vm.player)
		{
			var autoStart = (vm.autoStart) ? 1 : 0;
			
			vm.player = new YT.Player(vm.element.children()[0],
					{
						playerVars :
						{
							autoplay : autoStart,
							html5 : 1,
							theme : "light",
							modesbranding : 0,
							color : "white",
							iv_load_policy : 3,
							showinfo : 1,
							controls : 1
						},

						height : vm.yt.height || '390',
						width : vm.yt.width || '640',
						videoId : vm.yt.videoid
					});
		}
	}
	
	$scope.$on('StopAllVideos', handleStopAllVideos);
	function handleStopAllVideos(event, args)
	{
		if (vm.player)
		{
			vm.player.stopVideo();
		}
	}
	
}

function YouTubeService($q, $window, $timeout, logger)
{
	var vm = this;
	var iframeAPILoadingDeferred = null;
	vm.youTubeIframeAPIReady = youTubeIframeAPIReady;

	// The service is a singleton, so we can use it to only inject the script tags one time.
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	    
	// Asynchronous loading of youtube iframe API.  Optional timeout - default is 15 seconds.
	function youTubeIframeAPIReady(timeout)
	{
		if(!iframeAPILoadingDeferred)
		{
	        iframeAPILoadingDeferred = $q.defer();
	        
	        var resolved = false;
	        $window.onYouTubeIframeAPIReady = function() {
	            resolved = true;
	            iframeAPILoadingDeferred.resolve();
	        };
	        $timeout(function(){
	            if(!resolved){
	                iframeAPILoadingDeferred.reject('Could not load youtube iframe API');
	                iframeAPILoadingDeferred = null;
	                tag.parentNode.removeChild(tag);
	            }
	        }, timeout || 15000);
	    }
	    return iframeAPILoadingDeferred.promise;	
	}
	
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
			videoid: "@",
			autostart: "@"
			},
		controller : YouTubeCtrl,
		controllerAs : 'youtubeCtrl',
		link : linkFunc
	};

	return directive;

	function linkFunc(scope, element, attrs, youtubeCtrl)
	{
		youtubeCtrl.yt.height = scope.height;
		youtubeCtrl.yt.width = scope.width;
		youtubeCtrl.yt.videoid = scope.videoid;
		youtubeCtrl.element = element;
		logger.info('Video autostart = ' + attrs.autostart);
		if (attrs.autostart == 'true')
		{
			youtubeCtrl.autoStart = true;
		}
	}
}
