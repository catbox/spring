package com.hello.spring.jms.topic.receiver;

import static org.junit.Assert.*;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.JMSException;
import javax.jms.MessageConsumer;
import javax.jms.MessageListener;
import javax.jms.Session;
import javax.jms.Topic;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.hello.spring.jms.topic.core.Notification;
import com.hello.spring.jms.topic.core.NotificationRegistry;
import com.hello.spring.jms.topic.sender.TopicSender;

//In case that more than one xml file needs to be loaded, it can simply be done as follows:
//@ContextConfiguration(locations = {"/file1.xml","/file2.xml"})
@ContextConfiguration(locations = {"/beans.xml"})
@RunWith(SpringJUnit4ClassRunner.class)
public class TestDynamicTopicReceiver {
	
	@Autowired
	@Qualifier("topicSender")
	private TopicSender topicSender;
	
	@Autowired
	@Qualifier("notificationRegistry")
	private NotificationRegistry notificationRegistry;
	
	@Autowired
	@Qualifier("connectionFactory")
	private ConnectionFactory connectionFactory;
	
	@Autowired
	@Qualifier("topic")
	private Topic topic;
	
	@Before
	public void prepareTest() {
		notificationRegistry.clear();
	}

	@Test
	public void testTopicSending() throws InterruptedException, JMSException {
		
		// Create a message
		Notification notification = new Notification("R2-D2", "Hello Star World!");
		
		// Create a connection
		Connection connection = connectionFactory.createConnection();
		
		// Start the connection
		connection.start();
		
		// Create the Dynamic Receiver
		createDynamicReceiver(connection);
		
		// Send the message
		topicSender.convertAndSendTopic(notification);
		
		// Halt for 2 seconds before performing the validation.
		// This gives time for the messages from the sender to reach the receiver.
		Thread.sleep(2000);
		
		// Close the connection
		connection.close();
		
		// Validation
		assertEquals(3, notificationRegistry.getReceivedNotifications().size());
		assertEquals("Hello Star World!", notificationRegistry.getReceivedNotifications().get(0).getMessage());
		assertEquals("Hello Star World!", notificationRegistry.getReceivedNotifications().get(1).getMessage());
		assertEquals("Hello Star World!", notificationRegistry.getReceivedNotifications().get(2).getMessage());
	}
	
	private void createDynamicReceiver(Connection connection) throws JMSException {
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
