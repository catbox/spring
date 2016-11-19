package com.hello.spring.jms.sync.sender;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jms.JmsException;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

import com.hello.spring.jms.sync.core.Notification;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component("syncSender")
public class SyncSender {

	@Autowired
	@Qualifier("jmsTemplate")
	private JmsTemplate jmsTemplate;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(SyncSender.class);
	
	public void convertAndSendMessage(Notification notification) {
		try {
			jmsTemplate.convertAndSend(notification);
			LOGGER.info("Sending message: " + notification.toString());
		}
		catch(JmsException jmsException) {
			LOGGER.error("Error sending the message: " + jmsException.getMessage());
		}
	}
	
}
