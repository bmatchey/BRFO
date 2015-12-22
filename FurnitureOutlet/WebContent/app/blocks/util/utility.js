(function() {
    'use strict';

    angular.module('blocks.utility', []).constant('utility', (function() {
    	
    	function getParameterByName(name) 
    	{
    	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    	        results = regex.exec(location.search);
    	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    	}
    	
    	
    	function scrollMainWindowAnimated(offset)
    	{
    		$({myScrollTop:window.pageYOffset}).animate({myScrollTop:offset}, {
    			  duration: 600,
    			  easing: 'swing',
    			  step: function(val) {
    			    window.scrollTo(0, val);
    			  }
    			});
    	}
    	

        return {
        	getParameterByName: getParameterByName,
        	scrollMainWindowAnimated: scrollMainWindowAnimated
        };

    })());

})();    
