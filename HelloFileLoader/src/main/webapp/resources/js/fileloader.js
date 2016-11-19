var FileLoaderObj = {
		
	// Initialize
	Initialize:function() {
		this.EventsHandler();
	},
	
	// Events handling
	EventsHandler:function() {		
		$("#profileAnchor").click(function() {
			FileLoaderObj.showProfileImageEditor();
		});
		
		$("#file-editor-done").click(function() {
			FileLoaderObj.hideProfileImageEditor();
		});	
	},
	
	// Show Profile Image Editor
	showProfileImageEditor:function() {
		$('#profile-editor').show();
	},
	
	// Show Profile Image Editor
	hideProfileImageEditor:function() {
		$('#profile-editor').hide();
	}
		
};