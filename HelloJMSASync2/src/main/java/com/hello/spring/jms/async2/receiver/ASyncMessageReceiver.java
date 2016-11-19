package com.hello.spring.jms.async2.receiver;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hello.spring.jms.async2.constants.Constants;

public class ASyncMessageReceiver implements MessageListener {

	private static final Logger LOGGER = LoggerFactory.getLogger(ASyncMessageReceiver.class);
	
	public ASyncMessageReceiver() {
		
	}
	
	@Override
	public void onMessage(Message message) {
		
		try {
			String messageSender = message.getStringProperty(Constants.MESSAGE_SENDER);
			String messageReceiver = message.getStringProperty(Constants.MESSAGE_RECEIVER);
			String messageContent = message.getStringProperty(Constants.MESSAGE_CONTENT);
			
			LOGGER.info("SENDER: " + messageSender + " - RECEIVER: " + messageReceiver + " - MESSAGE: " + messageContent);
		} 
		catch (JMSException jmsException) {
			LOGGER.error(jmsException.getMessage());
		}
		
	}

}
