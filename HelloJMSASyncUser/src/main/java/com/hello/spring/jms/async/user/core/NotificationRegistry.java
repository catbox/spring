package com.hello.spring.jms.async.user.core;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component("notificationRegistry")
public class NotificationRegistry {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(NotificationRegistry.class);
	private List<Notification> receivedNotifications = new ArrayList<Notification>();
	
	// List of notifications
	public List<Notification> getReceivedNotifications() {
		return receivedNotifications;
	}
	
	// Buffer message
	public void registerNotification(Notification notification) {		
		receivedNotifications.add(notification);
		LOGGER.info("Buffering messages: " + receivedNotifications);
	}
	
	// Clear the list of notifications
	public void clear() {
		receivedNotifications.clear();
	}
	
}