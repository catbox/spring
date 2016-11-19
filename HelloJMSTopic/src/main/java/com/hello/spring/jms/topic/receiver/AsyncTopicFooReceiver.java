package com.hello.spring.jms.topic.receiver;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.hello.spring.jms.topic.core.Notification;
import com.hello.spring.jms.topic.core.NotificationRegistry;

@Component("asyncTopicFooReceiver")
public class AsyncTopicFooReceiver {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(AsyncTopicFooReceiver.class);
	
	@Autowired
	@Qualifier("notificationRegistry")
	private NotificationRegistry registry;

	public void receive(Notification notification) {
		registry.registerNotification(notification);
		LOGGER.info("Received message: " + notification.toString());
	}
		
	public void receiveIteration(Notification notification) {
		registry.registerNotification(notification);
		LOGGER.info("Received message: " + notification.toString());
	}
}
