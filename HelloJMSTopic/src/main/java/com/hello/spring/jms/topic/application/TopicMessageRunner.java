package com.hello.spring.jms.topic.application;

import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.hello.spring.jms.topic.core.Notification;
import com.hello.spring.jms.topic.sender.TopicSender;

public class TopicMessageRunner {

	public static void main(String[] args) throws InterruptedException {
	
		// Loads the beans.xml file and creates the context
		ConfigurableApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
				
		// Create a message
		Notification notification = new Notification("1", "Hello World!");
		
		// Get the topic sender bean
		TopicSender topicSender = (TopicSender)context.getBean("topicSender");
		
		// Send the message
		topicSender.convertAndSendTopic(notification);
		
		// Halt for 2 seconds before performing the validation.
		// This gives time for the messages from the sender to reach the receivers before closing the context.
		Thread.sleep(2000);
		
		// Close the context to prevent leaks
		context.close();
	}

}
