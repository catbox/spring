package com.hello.spring.jms.topic.sender;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jms.JmsException;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

import com.hello.spring.jms.topic.constants.Constants;
import com.hello.spring.jms.topic.core.Notification;

@Component("topicSender")
public class TopicSender {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(TopicSender.class);
	
	@Autowired
	@Qualifier("jmsTopicTemplate")
	private JmsTemplate jmsTopicTemplate;
	
	public void convertAndSendTopic(Notification notification) {	
		try {
			jmsTopicTemplate.convertAndSend(Constants.TOPIC, notification);
			LOGGER.info("Sending message: " + notification.toString());
		}
		catch(JmsException jmsException) {
			LOGGER.error("Error sending the message: " + jmsException.getMessage());
		}
	}

}
