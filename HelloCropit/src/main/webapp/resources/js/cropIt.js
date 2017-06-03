/** The global name space reduces the chance of name conflicts in the application.**/
var cropIt = cropIt || {};

// Empty String.
cropIt.EMPTY_STRING = "";

// The EXIF attributes.
cropIt.make = cropIt.EMPTY_STRING;
cropIt.model = cropIt.EMPTY_STRING;

// Initial Picture Orientation and Rotation.
cropIt.initialPictureRotation = 0;
cropIt.initialPictureOrientation = 0;

// Picture Orientation and Rotation.
cropIt.pictureRotation = 0;
cropIt.pictureOrientation = 0;

// The origin property returns the protocol, host name and port number of a URL.
cropIt.locationOrigin = window.location.origin;

// Error Message.
cropIt.errorMessage;

// Loaded file.
cropIt.loadedFile;

// Loaded file status.
cropIt.loadedFileStatus = false;

// 1 Mega Byte.
var MB = 1048576;

// Initialize.
cropIt.setUp = function(array) {
	
	// Verify that the browser supports the FileReader API.
	if(!window.FileReader) {
	    document.write("<p><b>" + array[5] +  "</b></p>");
	    return;
	}
	
	// Load FileAPI.js
	$.getScript("/HelloCropit/resources/js/FileAPI.js", function() {
		// Do nothing.
	});
	
	// Load exif.js
	$.getScript("/HelloCropit/resources/js/ExifReader.js", function() {
		// Do nothing.
	});

    $('.image-editor').cropit();
    
    $('.image-editor').cropit('setMessages', array);
    
    // Load the profile picture.
    cropIt.loadProfilePicture();

    // Cropping Events handling. 
    cropIt.eventsHandler(array);
    
    // Error messages.
    cropIt.setMessage(array);

};

// Load the profile picture.
cropIt.loadProfilePicture = function() {
	
	var $inputImage = $("#inputImage");
	var URL = window.URL || window.webkitURL;
    var bloburl;
    
    if(URL) {
    	$inputImage.change(function(event) {

    		var files = this.files;
    		
    		 if(files && files.length) {
 	        	cropIt.loadedFile = files[0];
 	        	
 	        	// Clear the logs - Development only.
 	        	$("#cropitTracker").empty();
 	       	
 	        	// Get EXIF data.
 	        	cropIt.getEXIFData(event);
 	        	
 	        	// Get the file name.
 	        	var fileName = cropIt.loadedFile.name;
 	        	
 	        	// Get the file size.
	         	var fileSize = cropIt.loadedFile.size;
	         	
	         	if((fileSize <= (5*(MB))) && (/^image\/\w+$/.test(cropIt.loadedFile.type))) {	         	
	         		cropIt.loadedFileStatus = true;
	         		$("#cropitTracker").append("<br>File Name: " + fileName);
	         		$("#cropitTracker").append("<br>File Size: " + fileSize);
	         	}
    		 }
    	});
    }
};

// Cropping Events handling. 
cropIt.eventsHandler = function(array) {
	
	$('.rotate-cw').click(function() {
		$('.image-editor').cropit('rotateCW');
    });
      
	$('.rotate-ccw').click(function() {
		$('.image-editor').cropit('rotateCCW');
	});
	
	// Cancel - Go back to profile page.
	$("#cropit-cancel-btn").on("click", function() {
		$.ajax({type:"GET", url:"/HelloCropit"
		}).done(function(data) {
			window.location.href = cropIt.locationOrigin + "/HelloCropit/";
		}).fail(function() {
			cropIt.errorMessage = array[6];
			cropIt.showAlertMessage(cropIt.errorMessage);
		}).always(function() {
			// Do nothing.
		});
	});

    $('.export').click(function() {
    	var imageData = $('.image-editor').cropit('export');

    	if(imageData === undefined) {
    		// File can not be null.
    		$("#cropit-alert-msg").html(array[0]);
    		$("#cropit-alert").show();
    	}
    	else {
    		// Save the picture.
    		cropIt.savePicture(imageData);
    	}   		
    });	
    
    // Close alert message.
	$("#cropit-alert").on("close.bs.alert", function () {
		$("#cropit-alert").hide();
		return false;
	});
};

// Get the EXIF data from the loaded picture.
cropIt.getEXIFData = function(event) {
	var files, reader;
    files = event.target.files;
    reader = new FileReader();
    reader.onload = function(event) {
    	var exif, tags;
	    try {
	        exif = new ExifReader();
	        exif.load(event.target.result);
	        // The MakerNote tag is very large, it is removed to lower memory consumption & CPU processing time.
	        exif.deleteTag('MakerNote');
	        
	        // Get all EXIF properties
	        tags = exif.getAllTags();
	        
	        // Find the "Make", "Model" and "Initial Orientation"
	        for(attribute in tags) {
	        	if(tags.hasOwnProperty(attribute ) && attribute == "Make") {
	        		cropIt.make = tags[attribute].description;
	            }
	        	if(tags.hasOwnProperty(attribute) && attribute == "Model") {
	        		cropIt.model = tags[attribute].description;
		        }
	        	if(tags.hasOwnProperty(attribute) && attribute == "Orientation") {
	        		cropIt.initialPictureOrientation = tags[attribute].description;
		        }
	        }
	        
	        if(typeof cropIt.initialPictureOrientation === 'undefined' || cropIt.initialPictureOrientation < 1) {
	        	cropIt.initialPictureOrientation = 1;
	        }

	        // Set the picture rotation.
	        switch(cropIt.initialPictureOrientation) {
            	case 1:
            		cropIt.initialPictureRotation = 0;
                	break;
                case 3:
                	cropIt.initialPictureRotation = 180;
                	break;
                case 6:
                	cropIt.initialPictureRotation = 90;
                	break;
                case 8:
                	cropIt.initialPictureRotation = 270;
                	break;
                default:
                	cropIt.initialPictureRotation = 0;
			}
	        
	    } 
	    catch(error) {
	    	if(error.message == "Invalid image format") {
	    		cropIt.initialPictureOrientation = 1;
	    		cropIt.initialPictureRotation = 0;
	    	}
	    	if(error.message == "No Exif data") {
	    		cropIt.initialPictureOrientation = 1;
	    		cropIt.initialPictureRotation = 0;
	    	}
	    	else {
	    		cropIt.initialPictureOrientation = 1;
	    		cropIt.initialPictureRotation = 0;
	    	}
	    }
	    finally {
	    	// EXIF Data -  Development only.
			$("#cropitTracker").append("<h3>EXIF Data:</h3>");
			$("#cropitTracker").append("<b>Initial Picture Orientation: </b>" + cropIt.initialPictureOrientation + "<br>");
		  	$("#cropitTracker").append("<b>Initial Picture Rotation: </b>" + cropIt.initialPictureRotation + "<br>");
	    }
	    
	    // Corrected rotation.
        switch(cropIt.initialPictureRotation) {     	
        	case 90:
        		cropIt.pictureRotation = 90;
            	break;
            case 180:
            	cropIt.pictureRotation = 180;
            	break;
            case 270:
            	cropIt.pictureRotation = 270;
            	break;
            default:
            	cropIt.pictureRotation = 0;
		}
    };
    // Get only the EXIF information.
    reader.readAsArrayBuffer(files[0].slice(0, 128*1024));
};

// Initialize the error messages.
cropIt.setMessage = function(closeAlertMsg, alertMsg, array) {
	$('.image-editor').cropit('setMessages', array);
};

// Save the picture.
cropIt.savePicture = function(imgData) {
	$("#cropit-modal").modal('show');
	if(cropIt.iOSDevice()) {
		var rotation = cropIt.pictureRotation;
		
		FileAPI.Image(imgData).rotate(rotation).get(function(error, rotatedCanvas) {
			var imageData = cropIt.convertCanvasToImage(rotatedCanvas);
			//$("#cropitimage").attr("src", imageData.src);
			// Convert the htmlElement to a blob url.
			var croppedBlob = cropIt.dataURItoBlob(imageData.src);
			// Convert the blob to a file.
			var inputFile = cropIt.loadedFile;
			var inputFileName = inputFile.name;
			var croppedFile = cropIt.blobToFile(croppedBlob, inputFileName);
			// Get the name attribute.
			var name = "file";
			// Send the picture.
			cropIt.sendPicture(name, croppedFile, inputFileName);
		});	
	}
	else {
		$("#cropitimage").attr("src", imgData);
		// Convert the htmlElement to a blob url.
		var croppedBlob = cropIt.dataURItoBlob(imgData);
		// Convert the blob to a file.
		var inputFile = cropIt.loadedFile;
		var inputFileName = inputFile.name;
		var croppedFile = cropIt.blobToFile(croppedBlob, inputFileName);
		// Get the name attribute.
		var name = "file";
		// Send the picture.
		cropIt.sendPicture(name, croppedFile, inputFileName);
	}	
};

// Convert a dataURL to a blob object.
cropIt.dataURItoBlob = function(dataURI) {
	try {
	    var mimestring, byteString;

	    if(dataURI.split(',')[0].indexOf('base64') !== -1) {
	        byteString = atob(dataURI.split(',')[1]);
	    } 
	    else {
	        byteString = decodeURI(dataURI.split(',')[1]);
	    }

	    mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0];

	    var content = new Array();
	    
	    for(var i = 0; i < byteString.length; i++) {
	        content[i] = byteString.charCodeAt(i);
	    }
	    
	    var blob = new Blob([new Uint8Array(content)], {type: mimestring});

	    return blob;
    }
	catch(error) {
		return false;
	}
};

// Convert a blob to a file.
cropIt.blobToFile = function(someBlob, fileName) {
	try {
		someBlob.lastModifiedDate = new Date();
		someBlob.name = fileName;
	    return someBlob;
	}
	catch(error) {
		return false;
	}
};

// Send the picture.
cropIt.sendPicture = function(someName, someFile, someFileName) {
	try {
		var postStatus = "STATUS-OK";
		var postMessage = "POST-OK";
		// Post results.
		var errorStatus = false;
		var successStatus = false;
		
		// Instantiate a form  data.
		var formData = new FormData();
		formData.append(someName, someFile, someFileName);

		// Post Request.
		$.ajax({async:true,
				cache:false, 	      /* Prevent page caching by the browser */
				contentType:false,    /* Set to false because jQuery defaults to application/x-www-form-urlencoded and doesn't send the file. 
		  						         Setting it to multipart/form-data doesn't seem to work either.*/
				data:formData,
			    dataType:"html",
			    error:function(jqXHR, textStatus, errorThrown) {
			       errorStatus = true;
			       postStatus = textStatus;
			       postMessage = errorThrown;
				},
				mimeType:"image/*",
				processData:false,    /* Set to false because jQuery will convert the files arrays into strings and the server can't pick it up.*/
				success:function(data, textStatus, jqXHR) {
				   successStatus = true;
				   postStatus = textStatus;
			    },
				timeout:10000,
				type:"POST",
			    url:"/HelloCropit/loadProfilePicture"
			 }).done(function() {
				window.setTimeout(function() {
					$("#cropit-modal").modal('hide');
					window.location.href = cropIt.locationOrigin + "/HelloCropit/";
				}, 5000);
		 	 }).fail(function() {
				cropIt.errorMessage = "Your profile picture failed to be updated!";
				cropIt.showAlertMessage(cropIt.errorMessage);
		 	 });
	}
	catch(error) {
		$("#cropit-modal").modal('hide');
		cropIt.errorMessage = "An internal error prevented your profile picture from being updated!";
		cropIt.showAlertMessage(cropIt.errorMessage);
	}
};

// Verify if the page is being viewed from an iOS device.
cropIt.iOSDevice = function() {
	try {
		var windowNavigatorPlatform = window.navigator.platform;
		if((/iP(hone|od|ad)/).test(windowNavigatorPlatform)) {
	    	return true;
	    }
		else {
			return false;
		}
	}
	catch(error) {
		cropIt.errorMessage = "Your device platform could not be determined";
		cropIt.showAlertMessage(cropIt.errorMessage);		
		return false;
	}
};

// Show alert message.
cropIt.showAlertMessage = function(msg) {
	$("#cropit-alert-msg").html(msg);
	$("#cropit-alert").show();
};

// Converts image to canvas and rotate it.
cropIt.convertImageToCanvas = function(image) {
	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	var context = canvas.getContext("2d");
	context.drawImage(image, 0, 0);
	return canvas;
};

// Converts canvas to an image
cropIt.convertCanvasToImage = function(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/jpeg", 1.0);
	return image;
};

//Set reload once
cropIt.setReloadOnce = function() {
	localStorage.setItem("reloadOnce", "true");
};