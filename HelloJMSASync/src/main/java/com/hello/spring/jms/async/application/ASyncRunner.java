package com.hello.spring.jms.async.application;

import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.hello.spring.jms.async.constants.Constants;
import com.hello.spring.jms.async.core.Notification;
import com.hello.spring.jms.async.sender.ASyncSender;

public class ASyncRunner {

	public static void main(String[] args) {
		
		// Loads the beans.xml file and creates the context
		ConfigurableApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
		
		// Create a message
		Notification notification = new Notification("1", "Hello World!");
		
		// Get the asynchronous sender bean
		ASyncSender asyncSender = (ASyncSender)context.getBean("asyncSender");
		
		// Send the message
		asyncSender.convertAndSendMessage(Constants.ASYNC_QUEUE, notification);
		
		// Close the context to prevent leaks
		context.close();

	}

}
