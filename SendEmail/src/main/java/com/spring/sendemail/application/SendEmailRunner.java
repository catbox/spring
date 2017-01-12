package com.spring.sendemail.application;

import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.spring.sendemail.SendMail;
//import com.spring.sendemail.User;

public class SendEmailRunner {
	
	public static void main(String[] args) {
	
	// Loads the beans.xml file and creates the context
	ConfigurableApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
		
	// Get the send email bean
	SendMail mailer = (SendMail)context.getBean("mailService");
	
	// Send email
	boolean sendMailResult = mailer.sendMail("derschwarzekatze@gmail.com", "New Password", "Your new password is: somepassword");
	
	if(sendMailResult) {
		System.out.println("The email was sent successfully");
	}
	else {
		System.out.println("The email failed to be sent");
	}
	
	context.close();
	
	}
	

}
