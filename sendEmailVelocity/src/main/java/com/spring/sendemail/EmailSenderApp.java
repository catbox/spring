package com.spring.sendemail;

import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.spring.sendemail.model.Receiver;
import com.spring.sendemail.model.Sender;

public class EmailSenderApp {
	
	public static void main(String[] args) {

		// Loads the beans.xml file and creates the context
		ConfigurableApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
		
		// Sender
		Sender sender = new Sender();
		sender.setFirstName("Coco");
		sender.setLastName("LeKat");
		sender.setEmailAddress("cocolekat@gmail.com");
		sender.setEmailSubject("Email Address");
		sender.setEmailAddressDestination("derschwarzekatze@gmail.com");

		// Receiver
		Receiver receiver = new Receiver();
		receiver.setFirstName("Schwarze");
		receiver.setLastName("Katze");
		receiver.setEmailAddress("derschwarzekatze@gmail.com");
		
		EmailSender emailSender = (EmailSender)context.getBean("mailer");
		
		emailSender.sendEmail(sender, receiver);
		
		// Close the context
		context.close();
	}

}