package com.hello.spring.jms.async2.sender;

import javax.jms.Connection;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageConsumer;
import javax.jms.MessageListener;
import javax.jms.Session;

import org.apache.activemq.command.ActiveMQQueue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jms.connection.CachingConnectionFactory;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Component;

import com.hello.spring.jms.async2.constants.Constants;
import com.hello.spring.jms.async2.receiver.ASyncMessageReceiver;

@Component("asyncMessageSender")
public class ASyncMessageSender {
	
	@Autowired
	@Qualifier("cachingConnectionFactory")
	private CachingConnectionFactory cachingConnectionFactory;
	
	@Autowired
	@Qualifier("async2Queue")
	private ActiveMQQueue asyncQueue;

	@Autowired
	@Qualifier("jmsTemplate")
	private JmsTemplate jmsTemplate;
	
	private Connection connection;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ASyncMessageSender.class);
	
	public void sendMessage(final String messageSender, final String messageReceiver, final String messageContent) {
		
		try {
			// Create a connection from the cached connection factory
			connection = cachingConnectionFactory.createConnection();
			// Start the connection
			connection.start();
			LOGGER.info("Connection started - " + connection.getClientID());
			
			// Send the message
			sendTheMessage(messageSender, messageReceiver, messageContent);
			
			try {
				// Give some time for the message to propagate
				Thread.sleep(2000);
			} 
			catch (InterruptedException interruptedException) {
				LOGGER.error(interruptedException.getMessage());
			}
			
			try {
				// Close the connection
				connection.close();
				LOGGER.info("Connection closed!");
			} 
			catch(Exception excpetion) {
				LOGGER.error(excpetion.getMessage());
			}
		} 
		catch (JMSException jmsException) {
			LOGGER.error(jmsException.getMessage());
		}
	} 

	private void sendTheMessage(final String messageSender, final String messageReceiver, final String messageContent) {
		
		jmsTemplate.send(Constants.ASYNC_QUEUE, new MessageCreator() {
            @Override
            public Message createMessage(Session session) throws JMSException {
                            
                // session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
            	// By not creating a new session, the Cached JMS Session is being used instead
                LOGGER.info("Session: " + session.toString());
                
            	MessageListener messageListener = new ASyncMessageReceiver();
            	MessageConsumer messageConsumer = session.createConsumer(asyncQueue);
            	messageConsumer.setMessageListener(messageListener);
            	
            	Message message = session.createMessage();
            	message.setStringProperty(Constants.MESSAGE_SENDER, messageSender);
            	message.setStringProperty(Constants.MESSAGE_RECEIVER, messageReceiver);
            	message.setStringProperty(Constants.MESSAGE_CONTENT, messageContent);

                return message;
            }
        });
		
		LOGGER.info("SENDER: " + messageSender + " - RECEIVER: " + messageReceiver + " - MESSAGE: " + messageContent);
	}

}
