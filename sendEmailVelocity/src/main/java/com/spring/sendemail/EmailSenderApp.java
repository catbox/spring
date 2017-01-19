package com.spring.sendemail;

import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class EmailSenderApp {
	
	public static void main(String[] args) {
		
		
		
		// Loads the beans.xml file and creates the context
		ConfigurableApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
		
		EmailSender emailSender = (EmailSender)context.getBean("mailer");
		
		emailSender.sendEmail("How are you?", "Hello Dear, How are you?", "derschwarzekatze@gmail.com");
		
		// Close the context
		context.close();
	}

}