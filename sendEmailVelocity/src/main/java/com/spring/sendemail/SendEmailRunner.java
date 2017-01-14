package com.spring.sendemail;

import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SendEmailRunner {
	
	public static void main(String[] args) {
		
		// Loads the beans.xml file and creates the context
		ConfigurableApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
		
		// Create the mail
		Mail mail = new Mail();
		mail.setMailFrom("cocolekat@gmail.com");
		mail.setMailTo("derschwarzekatze@gmail.com");
		mail.setMailSubject("Subject - Send Email using Spring Velocity Template");
		mail.setTemplateName("emailTemplate.vm");
		
		// Get the mailer bean
		Mailer mailer = (Mailer) context.getBean("mailer");

		// Send the email 
		mailer.sendMail(mail);
		
		// Close the context
		context.close();
	}

}