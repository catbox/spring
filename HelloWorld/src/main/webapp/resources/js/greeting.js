/** The global name space reduces the chance of name conflicts in the application.**/
var greeting = greeting || {};

// Initialize
greeting.setUp = function() {
	greeting.startUp();
	greeting.eventsHandler();
};

// On start up
greeting.startUp = function() {
	window.onload = function() {
		$("#helloWorld").html("Hello World");
	};
};

// Events Handling
greeting.eventsHandler = function() {	
	$(document).on('click', "#sayHello", function() {
		var fname = $("#firstName").val();
		var lname = $("#lastName").val();
		greeting.sayHello(fname, lname);
	});
}

// Say hello
greeting.sayHello = function(firstName, lastName) {
	var hello = "Hello " + firstName + " " + lastName + " welcome to Hello World!";
	$("#welcome").html(hello);
};