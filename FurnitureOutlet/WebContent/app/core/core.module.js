(function() {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngAnimate', //'ngRoute', 'ngSanitize',
        /*
         * Our reusable cross app code modules
         */
        'blocks.exception', 'blocks.logger', 'blocks.base64', 'blocks.utility' //, 'ui.bootstrap'
        /*
         * 3rd Party modules
         */
        //'ngplus'
    ]);
})();
