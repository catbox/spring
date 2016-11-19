/** The global name space reduces the chance of name conflicts in the application.
*   Each application's objects are properties of an application-defined global object.
*   The name space definition verifies that there is not an already defined name space either in same file or in another file. 
*   If a same name space is found either in same file or in another file, then the existing global object is used.
*   Otherwise a new global name space is created which will encapsulate variables, functions, and objects.
**/
var profile = profile || {};

profile.setUp = function() {
	
	// Prevent caching
	$.ajaxSetup({
		cache:false
	});
	
	// Prevents right click browser capabilities.
	profile.disableRightClick();	
};

// Prevents right click browser capabilities.
profile.disableRightClick = function() {
	$(document).bind("contextmenu",function(e){
	    return false;
	});
};