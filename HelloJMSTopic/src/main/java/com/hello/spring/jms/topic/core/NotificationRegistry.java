package com.hello.spring.jms.topic.core;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component("notificationRegistry")
public class NotificationRegistry {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(NotificationRegistry.class);
	private List<Notification> receivedNotifications = new ArrayList<Notification>();
	
	public List<Notification> getReceivedNotifications() {
		return receivedNotifications;
	}
	
	public void registerNotification(Notification notification) {		
		receivedNotifications.add(notification);
		LOGGER.info("Buffering message: " + receivedNotifications);
	}
	
	public void clear() {
		receivedNotifications.clear();
		LOGGER.info("Clearing the Notification Registry");
	}
}
