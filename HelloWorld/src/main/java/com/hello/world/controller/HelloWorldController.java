package com.hello.world.controller;

	import org.springframework.stereotype.Controller;
	import org.springframework.web.bind.annotation.RequestMapping;
	import org.springframework.web.bind.annotation.RequestMethod;

	@Controller("HelloWorldController")
	public class HelloWorldController {
		
		/** Load the login page **/
		@RequestMapping(value = "/", method = RequestMethod.GET)
	    public String loadLoginPage() {
			// Go to the login page
			return "login";
	    }
		
		/** Login controller **/
		@RequestMapping(value = "/login", method = RequestMethod.GET)
		public String login() {
			// Call greeting.sayHello(firstName, lastName) such that it does the same thing as clicking on the button "Say Hello".
			// In this case you can hard code the first name and last name instead of reading from the input textfields.
			System.out.println("Hello World!");
			return "login";
		}	
}
