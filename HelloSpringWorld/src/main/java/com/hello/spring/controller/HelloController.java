package com.hello.spring.controller;

import org.springframework.stereotype.Controller;  
import org.springframework.web.bind.annotation.RequestMapping;  
import org.springframework.web.servlet.ModelAndView; 

@Controller 
public class HelloController {
	
	String message = "Welcome to the Spring World!";  
	  
    @RequestMapping("/hello")  
    public ModelAndView showMessage() {  
        System.out.println("HelloController is redirecting request to hello page.");  
        return new ModelAndView("hello", "message", message);  
    }  
}
