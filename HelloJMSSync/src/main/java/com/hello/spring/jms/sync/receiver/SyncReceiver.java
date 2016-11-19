package com.hello.spring.jms.sync.receiver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jms.JmsException;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

import com.hello.spring.jms.sync.constants.Constants;
import com.hello.spring.jms.sync.core.Notification;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component("syncReceiver")
public class SyncReceiver {

	@Autowired
	@Qualifier("jmsTemplate")
	private JmsTemplate jmsTemplate;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(SyncReceiver.class);

	public Notification receive() {
		
		Notification notification = new Notification();
		try {
			notification = (Notification) jmsTemplate.receiveAndConvert(Constants.SYNC_QUEUE);
			LOGGER.info("Received message: " + notification.toString());
		}
		catch(JmsException jmsException) {
			LOGGER.error("Error receiving the message: " + jmsException.getMessage());
		}
		return notification;
	}
}
