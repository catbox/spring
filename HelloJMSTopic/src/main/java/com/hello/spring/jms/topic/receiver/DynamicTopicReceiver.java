package com.hello.spring.jms.topic.receiver;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.ObjectMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.hello.spring.jms.topic.core.Notification;
import com.hello.spring.jms.topic.core.NotificationRegistry;

public class DynamicTopicReceiver implements MessageListener {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(DynamicTopicReceiver.class);
			
	@Autowired
	@Qualifier("notificationRegistry")
	private NotificationRegistry registry;
	
	public DynamicTopicReceiver() {
		// Do nothing
	}
	
	public DynamicTopicReceiver(NotificationRegistry registry) {
		this.registry = registry;
	}
	
	@Override
	public void onMessage(Message message) {
		try {
			Notification notification = (Notification) ((ObjectMessage) message).getObject();
			registry.registerNotification(notification);
			LOGGER.info("Received message: " + notification.toString());
		}
		catch(JMSException jmsException) {
			LOGGER.info("Error receiving the message: " + jmsException.getMessage());
		}
	}

}
