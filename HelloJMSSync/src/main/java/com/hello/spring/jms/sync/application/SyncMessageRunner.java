package com.hello.spring.jms.sync.application;

import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.hello.spring.jms.sync.core.Notification;
import com.hello.spring.jms.sync.receiver.SyncReceiver;
import com.hello.spring.jms.sync.sender.SyncSender;

public class SyncMessageRunner {

	public static void main(String[] args) {
		
		// Loads the beans.xml file and creates the context
		ConfigurableApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
		
		// Create a message
		Notification notification = new Notification("1", "Hello World!");
		
		// Get the synchronous sender bean
		SyncSender syncSender = (SyncSender)context.getBean("syncSender");
		
		// Send the message
		syncSender.convertAndSendMessage(notification);
		
		// Get the synchronous receiver bean
		SyncReceiver syncReceiver = (SyncReceiver)context.getBean("syncReceiver");
		
		// Get the message
		syncReceiver.receive();
		
		// Close the context to prevent leaks
		context.close();

	}

}
