/** The global name space reduces the chance of name conflicts in the application.**/
var cropIt = cropIt || {};

// Initialize.
cropIt.setUp = function() {
     
    $('.image-editor').cropit();
    
    // Cropping Events handling. 
    cropIt.eventsHandler();
    
    // Error messages.
    //cropIt.setMessage(array);
};

// Cropping Events handling. 
cropIt.eventsHandler = function() {
	
	$("#cropit-select-btn").click(function() {
		var fileChangeResult = $('.image-editor').cropit('onFileChange');
		console.log("Result: " + fileChangeResult);
	});
	
	$(".rotate-cw").click(function() {
		$('.image-editor').cropit('rotateCW');
    });
      
	$(".rotate-ccw").click(function() {
		$('.image-editor').cropit('rotateCCW');
	});

    $(".export").click(function() {
    	var imageData = $('.image-editor').cropit('export');
        //window.open(imageData);
    	$("#cropitimage").attr("src", imageData);
    	
    });	
};

/*
cropIt.setMessage = function(array) {
	$('.image-editor').cropit('setMessages', array);
};
*/