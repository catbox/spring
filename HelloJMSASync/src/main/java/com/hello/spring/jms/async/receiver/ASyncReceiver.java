package com.hello.spring.jms.async.receiver;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.hello.spring.jms.async.core.Notification;
import com.hello.spring.jms.async.core.NotificationRegistry;

@Component("asyncReceiver")
public class ASyncReceiver {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ASyncReceiver.class);
	
	@Autowired
	private NotificationRegistry registry;
	
	public void receiveMessage(Notification notification) {
		LOGGER.info("Received message: " + notification.toString());
		registry.registerNotification(notification);
	}

}
