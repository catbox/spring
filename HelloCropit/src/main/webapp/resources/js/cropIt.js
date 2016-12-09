/** The global name space reduces the chance of name conflicts in the application.**/
var cropIt = cropIt || {};

// Close Alert Message.
cropIt.closeAlertMessage;

// Alert Message.
cropIt.alertMessage;

// Initialize.
cropIt.setUp = function(array) {

    $('.image-editor').cropit();
    
    $('.image-editor').cropit('setMessages', array);

    // Cropping Events handling. 
    cropIt.eventsHandler(array);
    
    // Error messages.
    cropIt.setMessage(array);
};

// Cropping Events handling. 
cropIt.eventsHandler = function(array) {
	$('.rotate-cw').click(function() {
		$('.image-editor').cropit('rotateCW');
    });
      
	$('.rotate-ccw').click(function() {
		$('.image-editor').cropit('rotateCCW');
	});

    $('.export').click(function() {
    	var imageData = $('.image-editor').cropit('export');

    	if(imageData === undefined) {
    		// File can not be null.
    		$("#cropit-alert-msg").html(array[0]);
    		$("#cropit-alert").show();
    	}
    	else {
    		window.open(imageData);
    	}   		
    });	
    
    // Close alert message.
	$("#cropit-alert").on("close.bs.alert", function () {
		$("#cropit-alert").hide();
		return false;
	});
};

cropIt.setMessage = function(closeAlertMsg, alertMsg, array) {
	$('.image-editor').cropit('setMessages', array);
};

// Show alert message.
cropIt.showAlertMessage = function(msg) {
	$("#cropit-alert-msg").html(msg);
	$("#cropit-alert").show();
};