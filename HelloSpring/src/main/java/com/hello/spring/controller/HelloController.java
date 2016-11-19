package com.hello.spring.controller;

import org.springframework.stereotype.Controller;  
import org.springframework.web.bind.annotation.RequestMapping;  
import org.springframework.web.servlet.ModelAndView;

import org.apache.log4j.Logger;

@Controller 
public class HelloController {
	
	private static final Logger LOGGER = Logger.getLogger(HelloController.class);
	String message = "Welcome to the Spring World!";  
	  
    @RequestMapping("/hello")  
    public ModelAndView showMessage() {
        
        LOGGER.info("HelloController is redirecting request to hello page!");
        
        if(LOGGER.isDebugEnabled()) {
        	LOGGER.debug("HelloController is redirecting request to hello page!");
        }
        
        return new ModelAndView("hello", "message", message);  
    }  
}
