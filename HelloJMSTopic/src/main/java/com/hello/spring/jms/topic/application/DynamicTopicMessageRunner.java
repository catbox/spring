package com.hello.spring.jms.topic.application;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.JMSException;
import javax.jms.MessageConsumer;
import javax.jms.MessageListener;
import javax.jms.Session;
import javax.jms.Topic;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.hello.spring.jms.topic.core.Notification;
import com.hello.spring.jms.topic.core.NotificationRegistry;
import com.hello.spring.jms.topic.receiver.DynamicTopicReceiver;
import com.hello.spring.jms.topic.sender.TopicSender;

public class DynamicTopicMessageRunner {

	private static final Logger LOGGER = LoggerFactory.getLogger(DynamicTopicMessageRunner.class);
	
	public static void main(String[] args) throws InterruptedException {
		
		// Loads the beans.xml file and creates the context
		ConfigurableApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");

		// Get the connectionFactory from beans.xml via the context
		ConnectionFactory connectionFactory = (ConnectionFactory) context.getBean("connectionFactory");
		
		// Get the topic from beans.xml via the context
		Topic topic = (Topic) context.getBean("topic");
		
		// Get the topicSender from beans.xml via the context
		TopicSender topicSender = (TopicSender) context.getBean("topicSender");
		
		// Get the notificationRegistry from beans.xml via the context
		NotificationRegistry notificationRegistry = (NotificationRegistry) context.getBean("notificationRegistry"); 
						
		// Create a message
		Notification notification = new Notification("1", "Hello World!");
				
		// Create a connection
		Connection connection = null;
		
		try {
			connection = connectionFactory.createConnection();
		} 
		catch (JMSException jmsException) {
			LOGGER.error("Error creating the connection: " + jmsException.getMessage());
		}
		
		// Start the connection
		try {
			connection.start();
		} 
		catch (JMSException jmsException) {
			LOGGER.error("Error starting the connection: " + jmsException.getMessage());
		}
		
		// Create the Dynamic Receiver
		try {
			createDynamicReceiver(connection, topic, notificationRegistry);
		} 
		catch (JMSException jmsException) {
			LOGGER.error("Error creating the dynamic receiver: " + jmsException.getMessage());
		}
		
		// Send the message
		topicSender.convertAndSendTopic(notification);
		
		// Halt for 2 seconds before performing the validation.
		// This gives time for the messages from the sender to reach the receiver.
		Thread.sleep(2000);
				
		// Close the connection
		try {
			connection.close();
		} 
		catch (JMSException jmsException) {
			LOGGER.error("Error closing the connection: " + jmsException.getMessage());
		}
		
		// Close the context to prevent leaks
		context.close();
						
	}
	
	private static void createDynamicReceiver(Connection connection, Topic topic, NotificationRegistry notificationRegistry) throws JMSException {
		/**
		 * createSession(boolean transacted, int acknowledgeMode) throws JMSException
		 * 
		 * 1) If transacted is set to true then the session will use a local transaction which may 
		 *    subsequently be committed or rolled back by calling the session's commit or rollback methods. 
		 *    The argument acknowledgeMode is ignored.
		 *    
		 * 2) If transacted is set to false then the session will be non-transacted. 
		 *    In this case the argument acknowledgeMode is used to specify how messages received by this session will be acknowledged.
		 *    The permitted values are: Session.CLIENT_ACKNOWLEDGE, Session.AUTO_ACKNOWLEDGE and Session.DUPS_OK_ACKNOWLEDGE.
		 *     
		 * A) AUTO_ACKNOWLEDGE: With this acknowledgment mode, the session automatically acknowledges a client's receipt of a message either 
		 * 						when the session has successfully returned from a call to receive or when the message listener of the session has 
		 * 						called to process the message successfully returns.
		 * 	  Value: 1
		 * 
		 * B) CLIENT_ACKNOWLEDGE: With this acknowledgment mode, the client acknowledges a consumed message by calling the message's acknowledge method.
		 * 						  Acknowledging a consumed message acknowledges all messages that the session has consumed. 
		 *    Value: 2
		 *    
		 * C) DUPS_OK_ACKNOWLEDGE: This acknowledgment mode instructs the session to lazily acknowledge the delivery of messages.
		 *    					   This is likely to result in the delivery of some duplicate messages if the JMS provider fails, 
		 *    					   so it should only be used by consumers that can tolerate duplicate messages.
		 *                         Use of this mode can reduce session overhead by minimizing the work the session does to prevent duplicates. 
		 * 	  Value: 3
		 * 
		 * D) SESSION_TRANSACTED: This acknowledgment mode specifies that the session should use a local transaction.
		 *    Value: 0  
		 */
		Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
		MessageConsumer consumer = session.createConsumer(topic);
		MessageListener listener = new DynamicTopicReceiver(notificationRegistry);
		consumer.setMessageListener(listener);
	}
	
}
