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
    cropIt.eventsHandler();
    
    // Error messages.
    cropIt.setMessage(array);
};

// Cropping Events handling. 
cropIt.eventsHandler = function() {
	$('.rotate-cw').click(function() {
		$('.image-editor').cropit('rotateCW');
    });
      
	$('.rotate-ccw').click(function() {
		$('.image-editor').cropit('rotateCCW');
	});

    $('.export').click(function() {
    	var imageData = $('.image-editor').cropit('export');
        window.open(imageData);
    });	
    
    // Close alert message.
	$(cropIt.closeAlertMessage).on("close.bs.alert", function () {
		$(cropIt.closeAlertMessage).hide();
		return false;
	});
};

cropIt.setMessage = function(closeAlertMsg, alertMsg, array) {
	$('.image-editor').cropit('setMessages', array);
};

// Show alert message.
cropIt.showAlertMessage = function(msg) {
	$(cropIt.alertMessage).html(msg);
	$(cropIt.closeAlertMessage).show();
};