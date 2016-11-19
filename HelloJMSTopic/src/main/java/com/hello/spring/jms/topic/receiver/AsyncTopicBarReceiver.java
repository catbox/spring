package com.hello.spring.jms.topic.receiver;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.hello.spring.jms.topic.core.Notification;
import com.hello.spring.jms.topic.core.NotificationRegistry;

@Component("asyncTopicBarReceiver")
public class AsyncTopicBarReceiver {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(AsyncTopicBarReceiver.class);
	
	@Autowired
	@Qualifier("notificationRegistry")
	private NotificationRegistry registry;

	public void receive(Notification notification) {
		registry.registerNotification(notification);
		LOGGER.info("Received message: " + notification.toString());
	}
}
