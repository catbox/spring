package com.hello.spring.jms.async.sender;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jms.JmsException;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hello.spring.jms.async.core.Notification;

@Component("asyncSender")
public class ASyncSender {

	@Autowired
	@Qualifier("jmsTemplate")
	private JmsTemplate jmsTemplate;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ASyncSender.class);
	
	public void convertAndSendMessage(String destination, Notification notification) {		
		try {
			jmsTemplate.convertAndSend(destination, notification);
			LOGGER.info("Sending message: " + notification.toString());
		}
		catch(JmsException jmsException) {
			LOGGER.error("Error sending the message: " + jmsException.getMessage());
		}
	}

}
