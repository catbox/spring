/** The global name space reduces the chance of name conflicts in the application.**/
var cropIt = cropIt || {};

// Initialize.
cropIt.setUp = function() {
     
    $('.image-editor').cropit();
    
    // Cropping Events handling. 
    cropIt.eventsHandler();
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
};