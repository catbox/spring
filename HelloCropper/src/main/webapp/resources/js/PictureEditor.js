/** The global name space reduces the chance of name conflicts in the application.
*   Each application's objects are properties of an application-defined global object.
*   The name space definition verifies that there is not an already defined name space either in same file or in another file. 
*   If a same name space is found either in same file or in another file, then the existing global object is used.
*   Otherwise a new global name space is created which will encapsulate variables, functions, and objects.
**/
var pictureEditor = pictureEditor || {};

// Cropper Configuration.
pictureEditor.image;

// Picture Input.
pictureEditor.pictureInput;

// The picture that is displayed on the editing panel.
pictureEditor.pictureInputDisplayed;

// Picture Preview Id.
pictureEditor.picturePreviewId;

// Picture Preview.
pictureEditor.picturePreview;

// Close Alert Message.
pictureEditor.closeAlertMessage;

// Alert Message.
pictureEditor.alertMessage;

// Cancel Button.
pictureEditor.cancelButton;

// Save Button.
pictureEditor.saveButton;

// Modal.
pictureEditor.modal;

// Cropper Options.
pictureEditor.options;

// The origin property returns the protocol, host name and port number of a URL.
pictureEditor.locationOrigin = window.location.origin;

// The picture that is loaded.
pictureEditor.loadedFile;
pictureEditor.fileName;
pictureEditor.fileLoaded;

// Empty String.
pictureEditor.EMPTY_STRING = "";

// The EXIF attributes.
pictureEditor.make = pictureEditor.EMPTY_STRING;
pictureEditor.model = pictureEditor.EMPTY_STRING;

// The Crop Box Data.
pictureEditor.cropBoxData;
pictureEditor.cropBoxWidth = 0; pictureEditor.cropBoxHeight = 0;
pictureEditor.cropBoxLeft = 0; pictureEditor.cropBoxTop = 0; 
pictureEditor.cropBoxRight = 0; pictureEditor.cropBoxBottom = 0;

// The Crop Box Position.
pictureEditor.cropBoxStyle;
pictureEditor.cropBoxLeftPosition = 0;
pictureEditor.cropBoxTopPosition = 0;

// The Picture Size and Position.
pictureEditor.pictureData;
pictureEditor.pictureNaturalWidth = 0; pictureEditor.pictureWidth = 0; 
pictureEditor.pictureNaturalHeight = 0; pictureEditor.pictureHeight = 0;
pictureEditor.pictureLeft = 0; pictureEditor.pictureLeftOverFlow = 0;
pictureEditor.pictureTop = 0; pictureEditor.pictureTopOverFlow = 0;
pictureEditor.pictureRight = 0;
pictureEditor.pictureBottom = 0;
pictureEditor.pictureRotate = 0;

// Maximum Zoom Out is reached.
pictureEditor.maxZoomOut;

// Initial Zoom Factor.
pictureEditor.ZOOM_FACTOR = 2;

// Initial Picture Orientation and Rotation.
pictureEditor.initialPictureRotation = 0;
pictureEditor.initialPictureOrientation = 0;

// Picture Orientation and Rotation.
pictureEditor.pictureRotation = 0;
pictureEditor.pictureOrientation = 0;

// Manual Picture Orientation and Rotation.
pictureEditor.manualPictureOrientation = 0;
pictureEditor.manualDegreeOfRotation = 0;
pictureEditor.manualPictureRotation = false;

// The Canvas Size.
pictureEditor.canvasWidth = 0; pictureEditor.canvasHeight = 0;
pictureEditor.canvasLeft = 0; pictureEditor.canvasTop = 0;

// The Canvas Size Constant.
pictureEditor.CANVAS_SIZE = 200;

// Error Message.
pictureEditor.errorMessage;

/**
 * Load the javascript resources and call the functions that will crop and save the profile picture.
 *  
 * 1) picInput - The picture that is loaded from the input button.
 * 2) picInputDisplayed - The picture that is displayed on the editing panel.
 * 3) picPreviewId - The id of the div that is used as preview.
 * 4) picPreviewClass - The class of the div that is used as preview.
 * 5) closeAlertMsg - Close the dialog button on the top right hand side.
 * 6) alertMsg - The message that is displayed on the dialog panel.
 * 7) cancelBtn - The cancel button.
 * 8) saveBtn - The save button.
 * 9) modal - Dialog panel that is shown with a spinner while the picture is being saved.
 **/
pictureEditor.setUp = function(picInput, picInputDisplayed, picPreviewId, picPreviewClass, closeAlertMsg, alertMsg, cancelBtn, saveBtn, modal) {
    	
	// Verify that the browser supports the FileReader API.
	if(!window.FileReader) {
	    document.write("<p><b>Your browser does not support the required component for file reading!</b></p>");
	    return;
	}
	
	// The picture that is loaded from the input button.
	pictureEditor.pictureInput = picInput;
	
	// The picture that is displayed on the editing panel.
	pictureEditor.pictureInputDisplayed = picInputDisplayed;
	
	// Picture Preview Id.
	pictureEditor.picturePreviewId = picPreviewId;
	
	// Picture Preview Class.
	pictureEditor.picturePreview = picPreviewClass;
	
	// Close Alert Message.
	pictureEditor.closeAlertMessage = closeAlertMsg;
	
	// Alert Message.
	pictureEditor.alertMessage = alertMsg;
	
	// Cancel Button.
	pictureEditor.cancelButton = cancelBtn;
	
	// Save Button.
	pictureEditor.saveButton = saveBtn;
	
	// Modal
	pictureEditor.modal = modal;
	
	// Load FileAPI.js
	$.getScript("/HelloCropper/resources/js/FileAPI.js", function() {
		// Do nothing.
	});

	// Load exif.js
	$.getScript("/HelloCropper/resources/js/ExifReader.js", function() {
		// Do nothing.
	});
	
	// Image setup.
	pictureEditor.image = $(pictureEditor.pictureInputDisplayed);
	
	// Image options.
	pictureEditor.options = {
		aspectRatio:1,
		autoCropArea:0.85,
		dragCrop:false,
		guides:false,
	    highlight:false,
	    movable:false,
	    preview:picPreviewClass,
	    resizable:false,
	    responsive:false
	};
	
	// Build the image.
	pictureEditor.image.on({
	      'build.cropper':function(event) {
	    	  // Do nothing. Event is handled by cropper.
	      },
	      'built.cropper':function(event) {
		  	  // Get the crop box data.
	    	  pictureEditor.cropBoxData = pictureEditor.getCropBoxData();
	    	  pictureEditor.cropBoxLeft = pictureEditor.roundNoPX(pictureEditor.cropBoxData.left, 3); 
	    	  pictureEditor.cropBoxTop = pictureEditor.roundNoPX(pictureEditor.cropBoxData.top, 3);
	    	  pictureEditor.cropBoxRight = pictureEditor.roundNoPX(pictureEditor.cropBoxData.right, 3);
	    	  pictureEditor.cropBoxBottom = pictureEditor.roundNoPX(pictureEditor.cropBoxData.bottom, 3);
	    	  pictureEditor.cropBoxWidth = pictureEditor.roundNoPX(pictureEditor.cropBoxData.width, 3);
	    	  pictureEditor.cropBoxHeight = pictureEditor.roundNoPX(pictureEditor.cropBoxData.height, 3);
	    	  
	    	  /*
		  	  $("#cropperTracker1").append("<h3>Crop Box Data:</h3>");
		  	  $("#cropperTracker1").append("<b>CropBoxWidth: </b>" + pictureEditor.cropBoxWidth + "<br>");
		  	  $("#cropperTracker1").append("<b>CropBoxHeight </b>" + pictureEditor.cropBoxHeight + "<br>");
		  	  $("#cropperTracker1").append("<b>CropBoxLeft: </b>" + pictureEditor.cropBoxLeft + "<br>");
		  	  $("#cropperTracker1").append("<b>CropBoxTop: </b>" + pictureEditor.cropBoxTop + "<br>");
		  	  $("#cropperTracker1").append("<b>CropBoxRight: </b>" + pictureEditor.cropBoxRight + "<br>");
		  	  $("#cropperTracker1").append("<b>CropBoxBottom: </b>" + pictureEditor.cropBoxBottom + "<br>");
		  	  */

	      }
	}).cropper(pictureEditor.options);
	    	
    // Load the profile picture.
	pictureEditor.loadProfilePicture();
    
    // Trigger cropper events.
	pictureEditor.triggerCropperEvents();
    
    // Picture Editor Events handling.
	pictureEditor.eventsHandler();
    
    // Save the picture.
	pictureEditor.saveProfilePicture();
};
    
// Load the profile picture.
pictureEditor.loadProfilePicture = function() {
    	
	var $inputImage = $(pictureEditor.pictureInput);
	var URL = window.URL || window.webkitURL;
    var bloburl;
    
    if(URL) {
    	$inputImage.change(function(event) {

    		pictureEditor.fileLoaded = false;
    		var files = this.files;
    		
	        if(files && files.length) {
	        	pictureEditor.loadedFile = files[0];
	        	
	        	// Clear the logs - Development only.
				$("#cropperTracker1").empty();

	         	// Get the file name.
				pictureEditor.fileName = pictureEditor.loadedFile.name;
	         	$("#cropperTracker1").append("<h3>Loaded File:</h3>");
			  	$("#cropperTracker1").append("<b>Name: </b>" + pictureEditor.fileName + "<br>");
			  	
			  	// Get EXIF data.
			  	pictureEditor.getEXIFData(event);
			  	
	         	// Get the file size.
	         	var fileSize = pictureEditor.loadedFile.size;
	         	
	         	// Maximum size for uploaded file = 5MB.
	         	if(fileSize <= (5*(FileAPI.MB))) {
		            if(/^image\/\w+$/.test(pictureEditor.loadedFile.type)) {
		            	
		                bloburl = URL.createObjectURL(pictureEditor.loadedFile);
		                pictureEditor.fileLoaded = true;
		                
		                pictureEditor.image.one('built.cropper', function () {
		                	URL.revokeObjectURL(bloburl);
		                }).cropper('reset', true).cropper('replace', bloburl);
		                
		                $inputImage.val(pictureEditor.fileName);   
		            } 
		            else {
		            	pictureEditor.errorMessage = "The file that you are uploading as your profile picture must be an image.";
		            	pictureEditor.showAlertMessage(pictureEditor.errorMessage);
		            }    
	         	}
	         	else {
	            	pictureEditor.errorMessage = "Please upload a file that is less than 5MB.";
	            	pictureEditor.showAlertMessage(pictureEditor.errorMessage);
	            }
	         }
    	});
    } 
    else {
    	$inputImage.parent().remove();
    }
};

// Trigger cropper events.
pictureEditor.triggerCropperEvents = function() {
	
	$(document.body).on('click', '[data-method]', function () {
        var data = $(this).data(), $target, result;
        
        $target = null;

        if(data.method) {
          data = $.extend({}, data);

          if(typeof data.target !== 'undefined') {
        	  $target = $(data.target);

              if(typeof data.option === 'undefined') {
            	  try {
            		  data.option = JSON.parse($target.val());
            	  }
            	  catch(error) {
            		  pictureEditor.errorMessage = "An internal error occurred with the cropping configuration!";
    				  pictureEditor.showAlertMessage(pictureEditor.errorMessage);
            	  }
              }
          }

          result = pictureEditor.image.cropper(data.method, data.option);

          if($.isPlainObject(result) && $target) {
        	  try {
            	$target.val(JSON.stringify(result));
        	  } 
        	  catch(error) {
        		  pictureEditor.errorMessage = "An internal error occurred with the cropping manipulation!";
        		  pictureEditor.showAlertMessage(pictureEditor.errorMessage);
        	  }
          }

        }
      }).on('keydown', function(event) {

    	  switch(event.which) {
    	  	// Left arrow.
        	case 37:
            	event.preventDefault();
            	pictureEditor.image.cropper('move', -1, 0);
                break;
            // Up arrow.
        	case 38:
            	event.preventDefault();
            	pictureEditor.image.cropper('move', 0, -1);
                break;
            // Right arrow.
        	case 39:
            	event.preventDefault();
            	pictureEditor.image.cropper('move', 1, 0);
                break;
            // Down arrow.
        	case 40:
            	event.preventDefault();
            	pictureEditor.image.cropper('move', 0, 1);
                break;
          }
     });
};

// Picture Editor Events handling.
pictureEditor.eventsHandler = function() {
	// Close alert message.
	$(pictureEditor.closeAlertMessage).on("close.bs.alert", function () {
		$(pictureEditor.closeAlertMessage).hide();
		return false;
	});

	// Cancel - Go back to profile page.
	$(pictureEditor.cancelButton).on("click", function() {
		$.ajax({type:"GET", url:"/HelloCropper"
		}).done(function(data) {
			window.location.href = pictureEditor.locationOrigin + "/HelloCropper/";
		}).fail(function() {
			errorMessage = "Your profile picture cancellation has failed!";
			pictureEditor.showAlertMessage(pictureEditor.errorMessage);
		}).always(function() {
			// Do nothing.
		});
	});
};

// Set the device orientation.
pictureEditor.setDeviceOrientation = function(orientation) {
	pictureEditor.setOrientation(orientation);
}

// Save the picture in the proper format and size.
pictureEditor.saveProfilePicture = function() {

	$(pictureEditor.saveButton).click(function() {
		
		// Clear the logs - Development only.
		$("#cropperTracker2").empty();
		
		// Picture Overflow
		pictureEditor.pictureLeftOverFlow = 0;
		pictureEditor.pictureTopOverFlow = 0; 
		
		// Maximum Zoom Out is reached.
		pictureEditor.maxZoomOut = false;
		
		// The preview object
		var picPreviewIdStr = pictureEditor.picturePreviewId;
		var picPreviewIdentity = picPreviewIdStr.substr(1);
		var thePreview = document.getElementById(picPreviewIdentity);
		
		// The preview first child object.
		var thePreviewChild = thePreview.firstChild;
		
		if(pictureEditor.isDefined(thePreview) && pictureEditor.isDefined(thePreviewChild)) {  	  	

			// Picture Preview Data (First Child Element).
			var thePreviewChildNaturalWidth = thePreviewChild.naturalWidth;				
			var thePreviewChildNaturalHeight = thePreviewChild.naturalHeight;					
			var thePreviewChildNaturalOffsetLeft = thePreviewChild.offsetLeft;
			var thePreviewChildNaturalOffsetTop = thePreviewChild.offsetTop;
			var thePreviewChildWidth = thePreviewChild.width;
			var thePreviewChildHeight = thePreviewChild.height;
			
			// Picture Source and Style.
			var thePreviewChildAttributes = [];
		  	thePreviewChildAttributes = thePreviewChild.attributes;				  	
		  	var thePreviewChildAttributeSrc = thePreviewChildAttributes.getNamedItem("src");
		  	var thePreviewChildAttributeSrcValue = thePreviewChildAttributeSrc.value;				  	
		  	var thePreviewChildAttributeStyle = thePreviewChildAttributes.getNamedItem("style");
		  	var thePreviewChildAttributeStyleValue = thePreviewChildAttributeStyle.value;			  	
		  	var naturalOffsetLeft = thePreviewChildNaturalOffsetLeft;			    			    	
	    	var naturalOffsetTop = thePreviewChildNaturalOffsetTop;

	    	// Picture Preview Attributes.
			var picturePreviewData = $(pictureEditor.picturePreviewId).contents();
			var picturePreviewAttribute = picturePreviewData.get(0);
			var picturePreviewAttributes = [];
			picturePreviewAttributes = picturePreviewAttribute.attributes;
			var picturePreviewSrc = picturePreviewAttributes.getNamedItem("src");
			var picturePreviewSrcValue = picturePreviewSrc.value;
			var picturePreviewStyle = picturePreviewAttributes.getNamedItem("style");
			var picturePreviewStyleValue = picturePreviewStyle.value;				
			var picturePreviewDisplay = picturePreviewAttribute.style.display;
			var picturePreviewWidth = picturePreviewAttribute.style.width;
			var picturePreviewMinWidth = picturePreviewAttribute.style.minWidth;
			var picturePreviewMaxWidth = picturePreviewAttribute.style.maxWidth;					
			var picturePreviewHeight = picturePreviewAttribute.style.height;					
			var picturePreviewMinHeight = picturePreviewAttribute.style.minHeight;
			var picturePreviewMaxHeight = picturePreviewAttribute.style.maxHeight;					
			var picturePreviewMarginLeft = picturePreviewAttribute.style.marginLeft;
			var picturePreviewMarginTop = picturePreviewAttribute.style.marginTop;
			var picturePreviewTransform = picturePreviewAttribute.style.transform;
			
			// Picture Preview Attributes (Rounded).
		  	var picPreviewWidth = pictureEditor.absRoundNoPX(picturePreviewWidth, 3);				  	
		  	var picPreviewHeight = pictureEditor.absRoundNoPX(picturePreviewHeight, 3);				  	
		  	var picPreviewMarginLeft = pictureEditor.roundNoPX(picturePreviewMarginLeft, 3);
		  	var picPreviewMarginTop = pictureEditor.roundNoPX(picturePreviewMarginTop, 3);
		  	var picPreviewMarginX = pictureEditor.roundNoPX(picturePreviewMarginLeft, 0);				  	  	
		  	var picPreviewMarginY = pictureEditor.roundNoPX(picturePreviewMarginTop, 0);				  	

			// Width Resized Factor.
	    	var widthResizedFactor = 0;
	    	// Height Resized Factor.
	    	var heightResizedFactor = 0;
	    	
	    	// Set the Width Resized Factor and the Height Resized Factor based on the Zoom Factor.
	    	widthResizedFactor = (thePreviewChildWidth/thePreviewChildNaturalWidth);
		    heightResizedFactor = (thePreviewChildHeight/thePreviewChildNaturalHeight);
		    
		    // Cropped Data of the Originally Loaded Image - "getData".
		    // The data is multiplied by a resizing factor to correspond to the resized loaded image.
		  	var croppedDataOfLoadedImage = pictureEditor.getCroppedDataOfLoadedImage();
		  	var croppedPictureX = pictureEditor.roundNoPX((croppedDataOfLoadedImage.x)*widthResizedFactor, 3);
		  	var croppedPictureY = pictureEditor.roundNoPX((croppedDataOfLoadedImage.y)*heightResizedFactor, 3);	
		  	var croppedPictureWidth = pictureEditor.roundNoPX((croppedDataOfLoadedImage.width)*widthResizedFactor, 3);
		  	var croppedPictureHeight = pictureEditor.roundNoPX((croppedDataOfLoadedImage.height)*heightResizedFactor, 3);
		  	var croppedPictureRotate = croppedDataOfLoadedImage.rotate;
		  	/*
		  	$("#cropperTracker2").append("<h3>Cropped Data of the Originally Loaded Picture:</h3>");
		  	$("#cropperTracker2").append("<b>croppedPictureX: </b>" + croppedPictureX + "<br>");
		  	$("#cropperTracker2").append("<b>croppedPictureY: </b>" + croppedPictureY + "<br>");
		  	*/
		  	
	    	// Get the cropped picture data.
	    	var croppedPictureData = pictureEditor.getCroppedPictureData();
	    	var croppedCoordX = pictureEditor.roundNoPX(((croppedPictureData.x)*widthResizedFactor), 3);
	    	var croppedCoordY = pictureEditor.roundNoPX(((croppedPictureData.y)*heightResizedFactor), 3);
	    	var croppedWidth = pictureEditor.roundNoPX(((croppedPictureData.width)*widthResizedFactor), 3);
	    	var croppedHeight = pictureEditor.roundNoPX(((croppedPictureData.height)*heightResizedFactor), 3);
	    	/*
	    	$("#cropperTracker2").append("<h3>Cropped Picture Data:</h3>");				     
		    $("#cropperTracker2").append("<b>croppedCoordX: </b>" + croppedCoordX  + "<br>");
		    $("#cropperTracker2").append("<b>croppedCoordY: </b>" + croppedCoordY  + "<br>");
			*/
	    	
	    	//  Verify if the page is being viewed from an iOS device.
			var iOSDevice = false;
			
			// The width that the loaded picture is being resized.
			var resizedPictureWidth = 0;
			
			// The height that the loaded picture is being resized.
			var resizedPictureHeight = 0;
	    	
			// Platform.
		  	var windowNavigatorPlatform = window.navigator.platform;
		  	/*
		  	$("#cropperTracker2").append("<h3>Platform</h3>");
        	$("#cropperTracker2").append("<b>windowNavigatorPlatform: </b>" + windowNavigatorPlatform + "<br>");
        	*/
		  	
        	// Indicates that the picture fits completely in the cropping area.					
        	var picFitsCroppingArea = false;
        	
        	// Picture Schema and Cropping Coordinates.
        	$("#cropperTracker2").append("<h3>Picture Schema and Cropping Coordinates:</h3>");
        	var croppedCoordinateX = croppedCoordX;
	  		var croppedCoordinateY = croppedCoordY;

	  		// Get the picture orientation.
	  		// An orientation of value 1 implies no rotation.
	  		pictureEditor.manualPictureOrientation = pictureEditor.getPictureOrientation();
	  		
	  		if(pictureEditor.manualPictureOrientation != 1) {			
	  			pictureEditor.pictureOrientation = pictureEditor.manualPictureOrientation;
	  		}
	  		
	  		// Get the degree of manual rotation.
	  		pictureEditor.manualDegreeOfRotation = pictureEditor.getPictureDegreeOfRotation();
	  		
	  		if(pictureEditor.manualDegreeOfRotation != 0) {
	  			pictureEditor.pictureRotation = pictureEditor.manualDegreeOfRotation;
	  			pictureEditor.manualPictureRotation = true;
	  			$("#cropperTracker2").append("<b>Manual Picture Rotation: </b>" + pictureEditor.manualPictureRotation + "</br>");
	  		}

	  		// Find out if the browser is from an iOS Device.
	  		iOSDevice = pictureEditor.iOSDevice();

        	if(iOSDevice) {
        		// iOS Device
        		switch(pictureEditor.pictureOrientation) {

	            	case 1:

	            		if(pictureEditor.manualPictureRotation == false && pictureEditor.initialPictureOrientation == 1 && pictureEditor.initialPictureRotation == 0 && pictureEditor.manualDegreeOfRotation == 0) {
		            		croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>1-0" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");	            			
	            		}
	            		else if(pictureEditor.manualPictureRotation == true) {
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>1-I" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	            		
	            		break;

	                case 3:
	                	
	                	if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 1 && pictureEditor.initialPictureRotation == 0) {
		            		croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>3-0" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");	            			
	            		}
	                	else if(pictureEditor.manualPictureRotation == false && pictureEditor.initialPictureOrientation == 3 && pictureEditor.initialPictureRotation == 180 && pictureEditor.manualDegreeOfRotation == 0) {
		            		croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>3-I" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");	            			
	            		}
	                	else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 3 && pictureEditor.initialPictureRotation == 180 && pictureEditor.manualDegreeOfRotation == -180) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation + 180;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>3-II" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	                	else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 3 && pictureEditor.initialPictureRotation == 180 && pictureEditor.manualDegreeOfRotation == 180) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation + 180;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>3-III" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}	                	
	                	else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 6 && pictureEditor.initialPictureRotation == 90 && pictureEditor.manualDegreeOfRotation == -90) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation + 90;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewHeight;
			        		resizedPictureHeight = picPreviewWidth;
			        		$("#cropperTracker2").append("<b>Schema: </b>3-IV" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	            		else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 6 && pictureEditor.initialPictureRotation == 90 && pictureEditor.manualDegreeOfRotation == 180) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation + 90;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewHeight;
			        		resizedPictureHeight = picPreviewWidth;
			        		$("#cropperTracker2").append("<b>Schema: </b>3-V" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	            		else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 8 && pictureEditor.initialPictureRotation == 270 && pictureEditor.manualDegreeOfRotation == -180) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation - 90;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewHeight;
			        		resizedPictureHeight = picPreviewWidth;
			        		$("#cropperTracker2").append("<b>Schema: </b>3-VI" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	            		else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 8 && pictureEditor.initialPictureRotation == 270 && pictureEditor.manualDegreeOfRotation == 180) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation - 90;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewHeight;
			        		resizedPictureHeight = picPreviewWidth;
			        		$("#cropperTracker2").append("<b>Schema: </b>3-VII" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}           		
	            		else if(pictureEditor.manualPictureRotation == true) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation + 90;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewHeight;
			        		resizedPictureHeight = picPreviewWidth;
			        		$("#cropperTracker2").append("<b>Schema: </b>3-VIII" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
               	
		        		break;
	                
	                case 6:
	                	
	                	if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 1 && pictureEditor.initialPictureRotation == 0 && (pictureEditor.manualDegreeOfRotation == -270 || pictureEditor.manualDegreeOfRotation == 90)) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>6-0" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	                	else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 3 && pictureEditor.initialPictureRotation == 180 && pictureEditor.manualDegreeOfRotation == -270) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation + 180;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>6-I" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	                	else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 3 && pictureEditor.initialPictureRotation == 180 && pictureEditor.manualDegreeOfRotation == -90) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation + 180;
	            			croppedCoordinateX = croppedPictureY;
					  		croppedCoordinateY = croppedPictureX;
					  		resizedPictureWidth = picPreviewHeight;
			        		resizedPictureHeight = picPreviewWidth;
			        		$("#cropperTracker2").append("<b>Schema: </b>6-II" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	                	else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 3 && pictureEditor.initialPictureRotation == 180 && pictureEditor.manualDegreeOfRotation == 90) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation + 180;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>6-III" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	                	else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 6 && pictureEditor.initialPictureRotation == 90 && pictureEditor.manualDegreeOfRotation == -270) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation + 90;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewHeight;
			        		resizedPictureHeight = picPreviewWidth;
			        		$("#cropperTracker2").append("<b>Schema: </b>6-IV" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	                	else if(pictureEditor.manualPictureRotation == false && pictureEditor.initialPictureOrientation == 6 && pictureEditor.initialPictureRotation == 90 && pictureEditor.manualDegreeOfRotation == 0) {
		            		croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewHeight;
			        		resizedPictureHeight = picPreviewWidth;
			        		$("#cropperTracker2").append("<b>Schema: </b>6-V" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");	            			
	            		}       		
	            		else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 6 && pictureEditor.initialPictureRotation == 90 && pictureEditor.manualDegreeOfRotation == 90) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation + 90;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewHeight;
			        		resizedPictureHeight = picPreviewWidth;
			        		$("#cropperTracker2").append("<b>Schema: </b>6-VI" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	            		else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 8 && pictureEditor.initialPictureRotation == 270 && pictureEditor.manualDegreeOfRotation == -270) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation + 270;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewHeight;
			        		resizedPictureHeight = picPreviewWidth;
			        		$("#cropperTracker2").append("<b>Schema: </b>6-VII" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	            		else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 8 && pictureEditor.initialPictureRotation == 270 && pictureEditor.manualDegreeOfRotation == 90) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation + 270;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewHeight;
			        		resizedPictureHeight = picPreviewWidth;
			        		$("#cropperTracker2").append("<b>Schema: </b>6-VIII" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}

	                	break;
	                
	                case 8:
	                	
	                	if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 1 && pictureEditor.initialPictureRotation == 0) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>8-0" + "<br>" +
			        				 					 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
				 					                     "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	                	else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 3 && pictureEditor.initialPictureRotation == 180 && pictureEditor.manualDegreeOfRotation == -90) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation + 180;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>8-I" + "<br>" +
			        				 					 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
				 					                     "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	                	else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 3 && pictureEditor.initialPictureRotation == 180 && pictureEditor.manualDegreeOfRotation == 270) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation + 180;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>8-II" + "<br>" +
									        			 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
										 				 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}	                		                	  		                	
	                	else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 6 && pictureEditor.initialPictureRotation == 90 && pictureEditor.manualDegreeOfRotation == -90) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation + 90;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewHeight;
			        		resizedPictureHeight = picPreviewWidth;
			        		$("#cropperTracker2").append("<b>Schema: </b>8-III" + "<br>" +
									        			 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
										 				 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	            		else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 6 && pictureEditor.initialPictureRotation == 90 && pictureEditor.manualDegreeOfRotation == 270) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation + 90;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewHeight; 
			        		resizedPictureHeight = picPreviewWidth;
			        		$("#cropperTracker2").append("<b>Schema: </b>8-IV" + "<br>" +
			        				 					 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        				 					 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}             	
	            		else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 8 && pictureEditor.initialPictureRotation == 270 && pictureEditor.manualDegreeOfRotation == -90) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation - 90;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewHeight;
			        		resizedPictureHeight = picPreviewWidth;
			        		$("#cropperTracker2").append("<b>Schema: </b>8-V" + "<br>" +
									        			 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
										 				 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	            		else if(pictureEditor.manualPictureRotation == false && pictureEditor.initialPictureOrientation == 8 && pictureEditor.initialPictureRotation == 270 && pictureEditor.manualDegreeOfRotation == 0) {
		            		croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewHeight;
			        		resizedPictureHeight = picPreviewWidth;
			        		$("#cropperTracker2").append("<b>Schema: </b>8-VI" + "<br>" +			        				
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");	            			
	            		}
	            		else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 8 && pictureEditor.initialPictureRotation == 270 && pictureEditor.manualDegreeOfRotation == 270) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation - 90;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewHeight;
			        		resizedPictureHeight = picPreviewWidth;
			        		$("#cropperTracker2").append("<b>Schema: </b>8-VII" + "<br>" +
									        			 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
										 				 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	            		else if(pictureEditor.manualPictureRotation == true) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation + 180;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>8-270-VIII" + "<br>" +
									        			 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
										 				 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
            	
		        		break;	
	                
	                default:
	                	pictureEditor.pictureRotation = 0;
		                croppedCoordinateX = croppedPictureX;
				  		croppedCoordinateY = croppedPictureY;
		        		resizedPictureWidth = picPreviewWidth;
		        		resizedPictureHeight = picPreviewHeight;
		        		$("#cropperTracker2").append("<b>Schema: </b>Default" + "<br>" +
		        				 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
				 				 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
								 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
								 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
        		}
			}
        	else {
        		// Non-iOS Device
        		switch(pictureEditor.pictureOrientation) {

	            	case 1:
	
	            		if(pictureEditor.manualPictureRotation == false && pictureEditor.initialPictureOrientation == 1 && pictureEditor.initialPictureRotation == 0 && pictureEditor.manualDegreeOfRotation == 0) {
		            		croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>1-0" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");	            			
	            		}
	            		else if(pictureEditor.manualPictureRotation == true) {
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>1-I" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	            		else {
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>1-II" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	            		
	            		break;
	
	                case 3:
	                	
	                	if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 1 && pictureEditor.initialPictureRotation == 0) {
		            		croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>3-0" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");	            			
	            		}
	                	else if(pictureEditor.manualPictureRotation == false && pictureEditor.initialPictureOrientation == 3 && pictureEditor.initialPictureRotation == 180 && pictureEditor.manualDegreeOfRotation == 0) {
	                		pictureEditor.pictureRotation = pictureEditor.pictureRotation - 180;
	                		croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>3-I" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");	            			
	            		}
	                	else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 3 && pictureEditor.initialPictureRotation == 180 && pictureEditor.manualDegreeOfRotation == -180) {
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>3-II" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	                	else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 3 && pictureEditor.initialPictureRotation == 180 && pictureEditor.manualDegreeOfRotation == 180) {
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>3-III" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}	                	
	                	else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 6 && pictureEditor.initialPictureRotation == 90 && pictureEditor.manualDegreeOfRotation == -90) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation + 90;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewHeight;
			        		resizedPictureHeight = picPreviewWidth;
			        		$("#cropperTracker2").append("<b>Schema: </b>3-IV" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	            		else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 6 && pictureEditor.initialPictureRotation == 90 && pictureEditor.manualDegreeOfRotation == 180) {
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>3-V" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	            		else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 8 && pictureEditor.initialPictureRotation == 270 && pictureEditor.manualDegreeOfRotation == -180) {
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>3-VI" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	            		else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 8 && pictureEditor.initialPictureRotation == 270 && pictureEditor.manualDegreeOfRotation == 180) {
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>3-VII" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}           		
	            		else if(pictureEditor.manualPictureRotation == true) {
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>3-VIII" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	           	
		        		break;
	                
	                case 6:
	                	
	                	if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 1 && pictureEditor.initialPictureRotation == 0 && (pictureEditor.manualDegreeOfRotation == -270 || pictureEditor.manualDegreeOfRotation == 90)) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>6-0" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	                	else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 3 && pictureEditor.initialPictureRotation == 180 && pictureEditor.manualDegreeOfRotation == -270) {
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>6-I" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	                	else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 3 && pictureEditor.initialPictureRotation == 180 && pictureEditor.manualDegreeOfRotation == -90) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation + 180;
	            			croppedCoordinateX = croppedPictureY;
					  		croppedCoordinateY = croppedPictureX;
					  		resizedPictureWidth = picPreviewHeight;
			        		resizedPictureHeight = picPreviewWidth;
			        		$("#cropperTracker2").append("<b>Schema: </b>6-II" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	                	else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 3 && pictureEditor.initialPictureRotation == 180 && pictureEditor.manualDegreeOfRotation == 90) {
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>6-III" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	                	else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 6 && pictureEditor.initialPictureRotation == 90 && pictureEditor.manualDegreeOfRotation == -270) {
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>6-IV" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	                	else if(pictureEditor.manualPictureRotation == false && pictureEditor.initialPictureOrientation == 6 && pictureEditor.initialPictureRotation == 90 && pictureEditor.manualDegreeOfRotation == 0) {
	                		pictureEditor.pictureRotation = pictureEditor.pictureRotation - 90;
	                		croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>6-V" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");	            			
	            		}       		
	            		else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 6 && pictureEditor.initialPictureRotation == 90 && pictureEditor.manualDegreeOfRotation == 90) {
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>6-VI" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	            		else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 8 && pictureEditor.initialPictureRotation == 270 && pictureEditor.manualDegreeOfRotation == -270) {
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>6-VII" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	            		else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 8 && pictureEditor.initialPictureRotation == 270 && pictureEditor.manualDegreeOfRotation == 90) {
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>6-VIII" + "<br>" +
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	
	                	break;
	                
	                case 8:
	                	
	                	if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 1 && pictureEditor.initialPictureRotation == 0) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>8-0" + "<br>" +
			        				 					 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
				 					                     "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	                	else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 3 && pictureEditor.initialPictureRotation == 180 && pictureEditor.manualDegreeOfRotation == -90) {
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>8-I" + "<br>" +
			        				 					 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
				 					                     "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	                	else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 3 && pictureEditor.initialPictureRotation == 180 && pictureEditor.manualDegreeOfRotation == 270) {
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>8-II" + "<br>" +
									        			 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
										 				 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}	                		                	  		                	
	                	else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 6 && pictureEditor.initialPictureRotation == 90 && pictureEditor.manualDegreeOfRotation == -90) {
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>8-III" + "<br>" +
									        			 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
										 				 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	            		else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 6 && pictureEditor.initialPictureRotation == 90 && pictureEditor.manualDegreeOfRotation == 270) {
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth; 
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>8-IV" + "<br>" +
			        				 					 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        				 					 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}             	
	            		else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 8 && pictureEditor.initialPictureRotation == 270 && pictureEditor.manualDegreeOfRotation == -90) {
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>8-V" + "<br>" +
									        			 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
										 				 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	            		else if(pictureEditor.manualPictureRotation == false && pictureEditor.initialPictureOrientation == 8 && pictureEditor.initialPictureRotation == 270 && pictureEditor.manualDegreeOfRotation == 0) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation + 90;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>8-VI" + "<br>" +			        				
			        									 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
			        									 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" +
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");	            			
	            		}
	            		else if(pictureEditor.manualPictureRotation == true && pictureEditor.initialPictureOrientation == 8 && pictureEditor.initialPictureRotation == 270 && pictureEditor.manualDegreeOfRotation == 270) {
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>8-VII" + "<br>" +
									        			 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
										 				 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	            		else if(pictureEditor.manualPictureRotation == true) {
	            			pictureEditor.pictureRotation = pictureEditor.pictureRotation + 180;
	            			croppedCoordinateX = croppedPictureX;
					  		croppedCoordinateY = croppedPictureY;
					  		resizedPictureWidth = picPreviewWidth;
			        		resizedPictureHeight = picPreviewHeight;
			        		$("#cropperTracker2").append("<b>Schema: </b>8-VIII" + "<br>" +
									        			 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
										 				 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
			        									 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
			        									 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
			        				                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
			        				                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
			        				                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	            		}
	        	
		        		break;	
	                
	                default:
	                	pictureEditor.pictureRotation = 0;
		                croppedCoordinateX = croppedPictureX;
				  		croppedCoordinateY = croppedPictureY;
		        		resizedPictureWidth = picPreviewWidth;
		        		resizedPictureHeight = picPreviewHeight;
		        		$("#cropperTracker2").append("<b>Schema: </b>Default" + "<br>" +
							        				 "<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>" + 
									 				 "<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>" + 
													 "<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>" + 
													 "<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>" +  
								                     "<b>Manual Degree of Rotation: </b>" + pictureEditor.manualDegreeOfRotation + "<br>" + 
								                     "<b>Cropped Coordinate X: </b>" + croppedCoordinateX + "<br>" + 
								                     "<b>Cropped Coordinate Y: </b>" + croppedCoordinateY + "<br>");
	        	}
        		
        	}
        	
        	var inputFile = pictureEditor.loadedFile;
		  	
        	FileAPI.Image(inputFile).resize(resizedPictureWidth, resizedPictureHeight).get(function(error, resizedCanvas) {
		  		// Resize the loaded file.
		  	}).rotate(pictureEditor.pictureRotation).get(function(error, rotatedCanvas) {

		  		var croppedCanvas = document.createElement("CANVAS");
		  		var croppedCanvasContext = croppedCanvas.getContext("2d");
		  		croppedCanvas.width = pictureEditor.CANVAS_SIZE;
		  		croppedCanvas.height = pictureEditor.CANVAS_SIZE;
		  		var croppedCanvasCoordX = croppedCoordinateX;
		  		var croppedCanvasCoordY = croppedCoordinateY;
		  		var croppedImageWidth = pictureEditor.CANVAS_SIZE;
		  		var croppedImageHeight = pictureEditor.CANVAS_SIZE;
		  		var canvasCoordX = 0;
		  		var canvasCoordY = 0;
		  		var imageWidth = pictureEditor.CANVAS_SIZE;
		  		var imageHeight = pictureEditor.CANVAS_SIZE;

		  		try {
					// Validate that the picture fits completely in the cropping area.
			  		picFitsCroppingArea = true;//pictureEditor.pictureFitsCroppingArea();
					
			  		if(picFitsCroppingArea) {
						
						// Show dialog that the profile picture is being saved.
						//$(pictureEditor.modal).modal('show');
						
						try {
							croppedCanvasContext.drawImage(rotatedCanvas, croppedCanvasCoordX, croppedCanvasCoordY, croppedImageWidth, croppedImageHeight, canvasCoordX, canvasCoordY, imageWidth, imageHeight);

				        	$("#cropperTracker2").append("<h3>File API Data:</h3>");
				        	$("#cropperTracker2").append("<b>pictureRotation: </b>" + pictureEditor.pictureRotation + "<br>");
				        	$("#cropperTracker2").append("<b>croppedCanvasCoordX: </b>" + croppedCanvasCoordX + "<br>");
					    	$("#cropperTracker2").append("<b>croppedCanvasCoordY: </b>" + croppedCanvasCoordY + "<br>");
					    	$("#cropperTracker2").append("<b>croppedImageWidth: </b>" + croppedImageWidth + "<br>");
					    	$("#cropperTracker2").append("<b>croppedImageHeight: </b>" + croppedImageHeight + "<br>");
					    	$("#cropperTracker2").append("<b>canvasCoordX: </b>" + canvasCoordX + "<br>");
					    	$("#cropperTracker2").append("<b>canvasCoordY: </b>" + canvasCoordY + "<br>");
					    	$("#cropperTracker2").append("<b>imageWidth: </b>" + imageWidth + "<br>");
					    	$("#cropperTracker2").append("<b>imageHeight: </b>" + imageHeight + "<br><br>");

							// Convert the HTMLCanvasElement to a url.
					    	var croppedCanvasURL = croppedCanvas.toDataURL("image/jpeg", 1.0);
					    	// Render the cropped profile picture.				    	
					    	$("#croppedProfilePicture").attr("src", croppedCanvasURL);
							// Convert the htmlElement (img) to a blob url.
							var croppedBlob = pictureEditor.dataURItoBlob(croppedCanvasURL);
							// Convert the blob to a file.
							var croppedFile = pictureEditor.blobToFile(croppedBlob, inputFile.name);
							// Get the name attribute.
							var name = "file";
							
							// Reset the cropping coordinates.
							croppedPictureX = 0;
							croppedPictureY = 0;
							croppedCoordX = 0;
							croppedCoordY = 0;
							
							// Reset the picture width and height.
							picPreviewHeight = 0; picPreviewWidth = 0;
							
							// Reset the EXIF attributes.
							pictureEditor.initialPictureRotation = 0;
							pictureEditor.initialPictureOrientation = 0;						
							pictureEditor.pictureRotation = 0;
							pictureEditor.pictureOrientation = 0;						
							pictureEditor.manualPictureOrientation = 0;
							pictureEditor.manualDegreeOfRotation = 0;
							pictureEditor.manualPictureRotation = false;
							
							// Send the picture.
		            		pictureEditor.sendPicture(name, croppedFile, inputFile.name);
						}
						catch(error) {
							$(pictureEditor.modal).modal('hide');
							pictureEditor.errorMessage = "An issue has occurred while cropping your profile picture.";
	    					pictureEditor.showAlertMessage(pictureEditor.errorMessage);	
	    					return false;
						}
					}
					else {
						$(pictureEditor.modal).modal('hide');
						pictureEditor.errorMessage = "Please make sure that your profile picture fits the cropping area.";
						pictureEditor.showAlertMessage(pictureEditor.errorMessage);
						return false;
					}
		  		}
		  		catch(error) {
			    	$(pictureEditor.modal).modal('hide');
					pictureEditor.errorMessage = "An internal error prevented your profile picture from being updated.";
					pictureEditor.showAlertMessage(pictureEditor.errorMessage);			    	
			    }
		  	});	    
		}	  	
	});		  	
};

// Get the EXIF data from the loaded picture.
pictureEditor.getEXIFData = function(event) {
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
	        
	        // Find the "Make", "Model" and "Orientation"
	        for(attribute in tags) {
	        	if(tags.hasOwnProperty(attribute ) && attribute == "Make") {
	        		pictureEditor.make = tags[attribute].description;
	            }
	        	if(tags.hasOwnProperty(attribute) && attribute == "Model") {
	        		pictureEditor.model = tags[attribute].description;
		        }
	        	if(tags.hasOwnProperty(attribute) && attribute == "Orientation") {
	        		pictureEditor.pictureOrientation = tags[attribute].description;
		        }
	        }
	        
	        if(typeof pictureEditor.pictureOrientation === 'undefined' || pictureEditor.pictureOrientation < 1) {
	        	pictureEditor.pictureOrientation = 1;
	        }

	        // Set the picture rotation.
	        switch(pictureEditor.pictureOrientation) {
            	case 1:
            		pictureEditor.pictureRotation = 0;
                	break;
                case 3:
                	pictureEditor.pictureRotation = 180;
                	break;
                case 6:
                	pictureEditor.pictureRotation = 90;
                	break;
                case 8:
                	pictureEditor.pictureRotation = 270;
                	break;
                default:
                	pictureEditor.pictureRotation = 0;
			}
	        
	        // Initial picture orientation & rotation.
	        pictureEditor.initialPictureOrientation = pictureEditor.pictureOrientation;
	        pictureEditor.initialPictureRotation = pictureEditor.pictureRotation;
	        
	    } 
	    catch(error) {
	    	if(error.message == "Invalid image format") {
	    		pictureEditor.pictureOrientation = 1;
	    		pictureEditor.pictureRotation = 0;
	    	}
	    	if(error.message == "No Exif data") {
	    		pictureEditor.pictureOrientation = 1;
	    		pictureEditor.pictureRotation = 0;
	    	}
	    	else {
	    		pictureEditor.pictureOrientation = 1;
	    		pictureEditor.pictureRotation = 0;
	    	}
	    }
	    finally {
	    	// EXIF Data -  Development only.
			$("#cropperTracker1").append("<h3>EXIF Data:</h3>");
		  	$("#cropperTracker1").append("<b>Picture Orientation: </b>" + pictureEditor.pictureOrientation + "<br>");
		  	$("#cropperTracker1").append("<b>Picture Rotation: </b>" + pictureEditor.pictureRotation + "<br>");
		  	//$("#cropperTracker1").append("<b>Initial Picture Orientation: </b>" + pictureEditor.initialPictureOrientation + "<br>");
		  	//$("#cropperTracker1").append("<b>Initial Picture Rotation: </b>" + pictureEditor.initialPictureRotation + "<br>");
	    }
    };
    // Get only the EXIF information.
    reader.readAsArrayBuffer(files[0].slice(0, 128*1024));
};

// Show alert message.
pictureEditor.showAlertMessage = function(msg) {
	$(pictureEditor.alertMessage).html(msg);
	$(pictureEditor.closeAlertMessage).show();
};

// Validate whether the variable is defined.
pictureEditor.isDefined = function(variable) {
	if(variable == null || variable === 'undefined' || variable == "") {
		return false;
	}
	else {
		return true;
	}
};

// Round a number to a specific decimal point without pixel. Negative values are keep as is.
pictureEditor.roundNoPX = function(number, precision) {
	// Remove pixel suffix from the number and returns a float number.
	number = parseFloat(number);
	// If the precision is not specified, round to the nearest tenth.
	if(!precision) {
		return Math.round(number);
	}
	if(number == 0) {
		var decimals = "";
		for(var i=0; i<precision; i++) decimals += "0";
		return "0." + decimals;
	}
	var exponent = Math.pow(10,precision);
	var num = Math.round((number*exponent)).toString();
	return parseFloat(num.slice(0,-1*precision) + "." + num.slice(-1*precision));
};

// Round a number to a specific decimal point without pixel.
pictureEditor.absRoundNoPX = function(number, precision) {
	// Remove pixel suffix from the number and returns a float number.
	number = parseFloat(number);
	// If the precision is not specified, round to the nearest tenth.
	if(!precision) {
		return Math.abs(Math.round(number));
	}
	if(number == 0) {
		var decimals = "";
		for(var i=0; i<precision; i++) decimals += "0";
		return "0." + decimals;
	}
	var exponent = Math.pow(10,precision);
	var num = Math.abs(Math.round((number*exponent))).toString();
	return parseFloat(num.slice(0,-1*precision) + "." + num.slice(-1*precision));
};

// Verify if the page is being viewed from an iOS device.
pictureEditor.iOSDevice = function() {
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
		pictureEditor.errorMessage = "Your device platform could not be determined";
		pictureEditor.showAlertMessage(pictureEditor.errorMessage);		
		return false;
	}
};

// Convert a dataURL to a blob object.
pictureEditor.dataURItoBlob = function(dataURI) {
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
	    
	    for (var i = 0; i < byteString.length; i++) {
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
pictureEditor.blobToFile = function(someBlob, fileName) {
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
pictureEditor.sendPicture = function(someName, someFile, someFileName) {
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
			    url:"/HelloCropper/loadProfilePicture"
			 }).done(function() {
				window.setTimeout(function() {
					$(pictureEditor.modal).modal('hide');
					window.location.href = pictureEditor.locationOrigin + "/HelloCropper/";
				}, 4000);
		 	 }).fail(function() {
				pictureEditor.errorMessage = "Your profile picture failed to be updated!";
				pictureEditor.showAlertMessage(pictureEditor.errorMessage + " - postMessage: " + postMessage + " - postStatus: " + postStatus);
		 	 });
	}
	catch(error) {
		$(pictureEditor.modal).modal('hide');
		pictureEditor.errorMessage = "An internal error prevented your profile picture from being updated!";
		pictureEditor.showAlertMessage(pictureEditor.errorMessage);
	}
};

// Get the container portrait data.
pictureEditor.getContainerPortraitData = function() {
	try {
		var data = $(this).data(), result;
		data.method = "getContainerPortraitDimensions";
        data = $.extend({}, data);
        result = pictureEditor.image.cropper(data.method);
	  	return result;
	}
	catch(error) {
		pictureEditor.errorMessage = "An error occurred while retrieving the container's portrait data.";
		pictureEditor.showAlertMessage(pictureEditor.errorMessage);
		return false;
	}
};

// Get the container landscape data.
pictureEditor.getContainerLandscapeData = function() {
	try {
		var data = $(this).data(), result;
		data.method = "getContainerLandscapeDimensions";
        data = $.extend({}, data);
        result = pictureEditor.image.cropper(data.method);
	  	return result;
	}
	catch(error) {
		pictureEditor.errorMessage = "An error occurred while retrieving the container's landscape data.";
		pictureEditor.showAlertMessage(pictureEditor.errorMessage);
		return false;
	}
};

// Get the crop box data.
pictureEditor.getCropBoxData = function() {
	try {
		var data = $(this).data(), result;
		data.method = "getCropBoxData";
        data = $.extend({}, data);
        result = pictureEditor.image.cropper(data.method);
	  	return result;
	}
	catch(error) {
		pictureEditor.errorMessage = "An error occurred while retrieving the crop box data.";
		pictureEditor.showAlertMessage(pictureEditor.errorMessage);
		return false;
	}
};

// Get the cropped data of the originally loaded image.
pictureEditor.getCroppedDataOfLoadedImage = function() {
	try {
		var data = $(this).data(), result;
		data.method = "getData";
		data.option = true;
        data = $.extend({}, data);
        result = pictureEditor.image.cropper(data.method, data.option);
        return result;
	}
	catch(error) {
		pictureEditor.errorMessage = "Please select your profile picture.";		
		pictureEditor.showAlertMessage(pictureEditor.errorMessage);
		return false;
	}				
};

// Get the cropped picture data.
pictureEditor.getCroppedPictureData = function() {
	try {
		var data = $(this).data(), result;
		data.method = "getCroppedInfo";
		data.option = true;
        data = $.extend({}, data);
        result = pictureEditor.image.cropper(data.method, data.option);
		return result;
	}
	catch(error) {
		pictureEditor.errorMessage = "Please select your profile picture.";		
		pictureEditor.showAlertMessage(errorMessage);
		return false;
	}
};

// Get the image EXIF orientation.
pictureEditor.getPictureOrientation = function() {
	try {
		var data = $(this).data(), result;
		data.method = "getImageOrientation";
        data = $.extend({}, data);
        result = pictureEditor.image.cropper(data.method);
	  	return result;
	}
	catch(error) {
		pictureEditor.errorMessage = "An error occurred while retrieving the image EXIF orientation data.";
		pictureEditor.showAlertMessage(pictureEditor.errorMessage);
		return false;
	}
};

// Set the orientation of the device upon orientation change.
pictureEditor.setOrientation = function(dvcOrientation) {
	try {
		var data = $(this).data();
		data.method = "setDeviceOrientation";
		data.option = dvcOrientation;
        data = $.extend({}, data);
        pictureEditor.image.cropper(data.method, data.option);
	}
	catch(error) {
		pictureEditor.errorMessage = "Device orientation failed to be set.";		
		pictureEditor.showAlertMessage(pictureEditor.errorMessage);
		return false;
	}
};

// Get the degree of rotation of the image.
pictureEditor.getPictureDegreeOfRotation = function() {
	try {
		var data = $(this).data(), result;
		data.method = "getDegreeOfRotation";
        data = $.extend({}, data);
        result = pictureEditor.image.cropper(data.method);
	  	return result;
	}
	catch(error) {
		pictureEditor.errorMessage = "An error occurred while retrieving the degree of rotation of the image.";
		pictureEditor.showAlertMessage(pictureEditor.errorMessage);
		return false;
	}
};

// Validate that the picture fits completely in the cropping area.
pictureEditor.pictureFitsCroppingArea = function() {
	try {
		var data = $(this).data(), result;
		data.method = "imageFitsCroppingArea";
        data = $.extend({}, data);
        result = pictureEditor.image.cropper(data.method);
	  	return result;
	}
	catch(error) {
		pictureEditor.errorMessage = "An error occurred while validating that the picture fits the crop box.";
		pictureEditor.showAlertMessage(pictureEditor.errorMessage);
		return false;
	}	
};

// Get the Zoom Factor.
pictureEditor.getZoomFactor = function() {
	try {
		var data = $(this).data(), result;
		data.method = "getZoomFactor";
        data = $.extend({}, data);
        result = pictureEditor.image.cropper(data.method);
	  	return result;
	}
	catch(error) {
		pictureEditor.errorMessage = "An error occurred while retrieving the Zoom Factor.";
		pictureEditor.showAlertMessage(pictureEditor.errorMessage);
		return false;
	}
};
