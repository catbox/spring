package com.hello.spring.jms.async.user.application;

import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Component;

import com.hello.spring.jms.async.user.User;

@Component
public class UserMessageRunner {

	public static void main(String[] args) {
		
		// Loads the beans.xml file and creates the context
		ConfigurableApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
		
		// Get a user bean
		User userA = (User)context.getBean("user");
		userA.setUserId("101");
		userA.setUserName("R2-D2");
		userA.setMessageQueueName("R2-D2-Queue");		
		// Print the user properties
		System.out.println(userA.toString());
		
		// Get a user bean
		User userB = (User)context.getBean("user");
		userB.setUserId("102");
		userB.setUserName("C-3PO");
		userB.setMessageQueueName("C-3PO-Queue");	
		// Print the user properties
		System.out.println(userB.toString());
		
		// Get a user bean
		User userC = (User)context.getBean("user");
		userC.setUserId("103");
		userC.setUserName("Luke Skywalker");
		userC.setMessageQueueName("Luke-Skywalker-Queue");		
		// Print the user properties
		System.out.println(userC.toString());
		
		// Send message
		userA.sendMessage(userA, userB, "Hello Star World! Wazup?");
		
		// Leave a space
		System.out.println("");
				
		// Print the last message received by each user
		System.out.println("UserA: " + userA.getUserName() + " - " + "Last Message Sent: " + userA.getLastMessageSent());
		System.out.println("UserA: " + userA.getUserName() + " - " + "Last Message Received: " + userA.getLastMessageReceived() + "\n");
		
		System.out.println("UserB: " + userB.getUserName() + " - " + "Last Message Sent: " + userB.getLastMessageSent());
		System.out.println("UserB: " + userB.getUserName() + " - " + "Last Message Received: " + userB.getLastMessageReceived() + "\n");
		
		System.out.println("UserC: " + userC.getUserName() + " - " + "Last Message Sent: " + userC.getLastMessageSent());
		System.out.println("UserC: " + userC.getUserName() + " - " + "Last Message Received: " + userC.getLastMessageReceived() + "\n");
				
		// Close the context to prevent leaks
		context.close();
		
	}

}
