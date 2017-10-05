package com.hello.spring.jms.async2.application;

import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.hello.spring.jms.async2.sender.ASyncMessageSender;

public class ASyncMessageRunner {

	public static void main(String[] args) {			
		
		// Loads the beans.xml file and creates the context
		ConfigurableApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
		
		// Get the asynchronous sender bean
		ASyncMessageSender asyncMessageSender = (ASyncMessageSender)context.getBean("asyncMessageSender");

		// Message Attributes
		String messageSender = "Sam";
		String messageReceiver = "KikiLou";
		String messageContent = "Stop stealing my food!";
		
		// Send the message
		asyncMessageSender.sendMessage(messageSender, messageReceiver, messageContent);
		
		// Message Attributes
		String messageSender2 = "Sam";
		String messageReceiver2 = "CocoLekat";
		String messageContent2 = "Where do you live right now? You left without giving us your address!";
		
		// Send the message
		asyncMessageSender.sendMessage(messageSender2, messageReceiver2, messageContent2);
		
		// Close the context to prevent leaks
		context.close();
	}		
}
