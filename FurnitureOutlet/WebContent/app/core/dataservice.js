

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    

    function dataservice($http, $location, $q, exception, logger) {
        var isPrimed = false;
        var primePromise;

        var service = {
        	getStores: getStores,
        	getCategories: getCategories,
        	getPictureInfo: getPictureInfo,
        	uploadFile: uploadFile,
            ready: ready
        };

        return service;

        function getStores() {
        	logger.info('getStores fired.');
        	
            return $http.get('stores')
                .then(getStoresComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getStores')(message);
                    $location.url('/');
                });

            function getStoresComplete(response, status, headers, config) {
            	logger.info('getStores complete - ' + response.data);
                return response.data; // data.data[0].data.results;
            }
        }

        function getCategories() {
        	logger.info('getCategories fired.');
        	
            return $http.get('categories')
                .then(getCategoriesComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getCategories')(message);
                    $location.url('/');
                });

            function getCategoriesComplete(response, status, headers, config) {
            	logger.info('getCategories complete - ' + response.data);
                return response.data;
            }
        }

        function getPictureInfo(maxPics) 
        {
        	logger.info('dataservice.getPictureInfo fired.');
        	
            return $http.get('pictures?maxPics=' + maxPics)
                .then(getPictureInfoComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getPictureInfo')(message);
                    $location.url('/');  
                });

            function getPictureInfoComplete(response, status, headers, config) 
            {
            	logger.info('getPictureInfo complete - ' + response.data);
                return response.data;
            }
        }

        // TODO: Convert this to .  See XMLHttpRequest – Minimal: http://html5doctor.com/drag-and-drop-to-server/
        function uploadFile(file)
        {
        	var formattedDate = dateFormat(file.lastModifiedDate, "default");
        	var uploadUrl = 'pictures' + "?filename=" + file.name + "&lastModifiedDate=" + formattedDate + "&type=" + file.type;
        	
        	logger.info('uploadFile fired.  uploadUrl = ' + uploadUrl);
//            
//        	var reader = new FileReader();
//        	reader.onload = function (e) {
//        		 
//                //Create a canvas and draw image on Client Side to get the byte[] equivalent
//                var canvas = document.createElement("canvas");
//                var imageElement = document.createElement("img");
//     
//                imageElement.setAttribute('src', e.target.result);
//                canvas.width = imageElement.width;
//                canvas.height = imageElement.height;
//                var context = canvas.getContext("2d");
//                context.drawImage(imageElement, 0, 0);
//                var base64Image = canvas.toDataURL(file.type);
//            	logger.info('uploadUrl = ' + uploadUrl);
//
//              $http.post(uploadUrl, base64Image, {
//              transformRequest: angular.identity,
//              headers: {'Content-Type': undefined}
//	          })
//	          .catch(function(message) {
//	                  exception.catcher('XHR Failed for getCategories')(message);
//	                  $location.url('/');
//	              });
//        	}
//        	
//        	reader.readAsDataURL(file);
//                    
//            //Renders Image on Page
//            reader.readAsDataURL(file);
        	
        	var fd = new FormData();
            fd.append('file', file);
            
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .catch(function(message) {
                    exception.catcher('XHR Failed for uploadFile')(message);
                    $location.url('/');
                })
        }

        
//        function uploadFile() 
//        {
//        	var fd = new FormData();
//        	fd.append("fileToUpload", document.getElementById('fileToUpload').files[0]);
//        	var xhr = new XMLHttpRequest();
//        	xhr.upload.addEventListener("progress", uploadProgress, false);
//        	xhr.addEventListener("load", uploadComplete, false);
//        	xhr.addEventListener("error", uploadFailed, false);
//        	xhr.addEventListener("abort", uploadCanceled, false);
//        	xhr.open("POST", "UploadMinimal.aspx");
//        	xhr.send(fd);
//        }        

        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
                logger.info('Primed data');
            }
        }

        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(exception.catcher('"ready" function failed'));
        }        
    }
    
