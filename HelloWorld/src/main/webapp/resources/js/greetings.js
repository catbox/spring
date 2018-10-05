/** The global name space reduces the chance of name conflicts in the application.**/
var greetings = greetings || {};

// Initialize
greetings.setUp = function() {
	greetings.startUp();
	greetings.sayHello();
};

// On start up
greetings.startUp = function() {
	window.onload = function() {
		$("#helloWorld").html("Hello World");
	};
};

// Say hello
greetings.sayHello = function() {
	$("#sayHello").html("Hello admin, welcome to Hello World!");
};