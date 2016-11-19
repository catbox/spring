package com.hello.spring.jms.async.user.sender;

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

import com.hello.spring.jms.async.user.User;
import com.hello.spring.jms.async.user.constants.Constants;

@Component("asyncMessageSender")
public class ASyncMessageSender {
	
	@Autowired
	@Qualifier("cachingConnectionFactory")
	private CachingConnectionFactory cacheConnectionFactory;

	@Autowired
	@Qualifier("jmsTemplate")
	private JmsTemplate jmsTemplate;
	
	private Connection connection;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ASyncMessageSender.class);
	
	public void sendMessageToUser(User userSender, User userReceiver, String messageContent) {
		
		try {
			// Create a connection from the cached connection factory
			connection = cacheConnectionFactory.createConnection();
			// Start the connection
			connection.start();
			LOGGER.info("Connection started - " + connection.getClientID());
			
			// Send the message
			sendTheMessageToUser(userSender, userReceiver, messageContent);
			
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
			catch(Exception excepetion) {
				LOGGER.error(excepetion.getMessage());
			}
		} 
		catch (JMSException jmsException) {
			LOGGER.error(jmsException.getMessage());
		}
	}
	
	private void sendTheMessageToUser(final User userSender, final User userReceiver, final String messageContent) {
		
		jmsTemplate.send(userReceiver.getMessageQueueName(), new MessageCreator() {
            @Override
            public Message createMessage(Session session) throws JMSException {
                            
                // session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
            	// By not creating a new session, the Cached JMS Session is being used instead
                LOGGER.info("Session: " + session.toString());
                
                ActiveMQQueue receiverQueueName = userReceiver.getMessageQueueName();
                
            	MessageListener messageListener = userReceiver;
            	MessageConsumer messageConsumer = session.createConsumer(receiverQueueName);
            	messageConsumer.setMessageListener(messageListener);
            	
            	Message message = session.createMessage();
            	message.setStringProperty(Constants.MESSAGE_SENDER, userSender.getUserName());
            	message.setStringProperty(Constants.MESSAGE_RECEIVER, userReceiver.getUserName());
            	message.setStringProperty(Constants.MESSAGE_CONTENT, messageContent);
            	message.setObjectProperty(Constants.USER_RECEIVER, userReceiver);

                return message;
            }
        });
		
		LOGGER.info("SENDER: " + userSender.getUserName()+ " - RECEIVER: " + userReceiver.getUserName() + " - MESSAGE: " + messageContent);
	}

	/**
	 * @return the cacheConnectionFactory
	 */
	public CachingConnectionFactory getCacheConnectionFactory() {
		return cacheConnectionFactory;
	}

	/**
	 * @param cacheConnectionFactory the cacheConnectionFactory to set
	 */
	public void setCacheConnectionFactory(CachingConnectionFactory cacheConnectionFactory) {
		this.cacheConnectionFactory = cacheConnectionFactory;
	}

	/**
	 * @return the jmsTemplate
	 */
	public JmsTemplate getJmsTemplate() {
		return jmsTemplate;
	}

	/**
	 * @param jmsTemplate the jmsTemplate to set
	 */
	public void setJmsTemplate(JmsTemplate jmsTemplate) {
		this.jmsTemplate = jmsTemplate;
	}

}
