package com.hello.spring.jms.async.user;

import java.util.Hashtable;
import java.util.Map;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;

import org.apache.activemq.command.ActiveMQQueue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.hello.spring.jms.async.user.constants.Constants;
import com.hello.spring.jms.async.user.sender.ASyncMessageSender;

@Component("user")
public class User extends Person implements MessageListener {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(User.class);
	
	@Autowired
	@Qualifier("asyncMessageSender")
	private ASyncMessageSender asyncMessageSender;
	
	@Autowired
	@Qualifier("contacts")
	private Contacts contacts;

	private String userId;
	private String userName;
	private ActiveMQQueue messageQueueName;	
	private String lastMessageSent;
	private String lastMessageReceived;
	private User userSender;
	
	private Map<String, User> userReceiverMap = new Hashtable<String, User>();
	
	/**
	 * Default Constructor
	 */
	public User() {
		// Do nothing
	}
	
	/**
	 * @param userName
	 */
	public User(String userName, ASyncMessageSender asyncMessageSender) {
		setMessageQueueName(userName);
		setAsyncMessageSender(asyncMessageSender);
		lastMessageSent = Constants.USER_LAST_MESSAGE_SENT;
		lastMessageReceived = Constants.USER_LAST_MESSAGE_RECEIVED;
	}
	
	/**
	 * @param firstName
	 * @param lastName
	 */
	public User(String firstName, String lastName) {
		super.setFirstName(firstName);
		super.setLastName(lastName);
		setMessageQueueName(firstName + "-" + lastName);
	}
	
	/**
	 * @param user
	 * @param messageSender
	 * @param messageReceiver
	 * @param messageContent
	 */
	public void sendMessage(User userSender, User userReceiver, String messageContent) {
		asyncMessageSender.sendMessageToUser(userSender, userReceiver, messageContent);
		// Set the last message sent
		lastMessageSent = messageContent;
	}

	/**
	 * <p>Receive a message</p>
	 * <p>The method onMessage(Message message) acts as a Message Receiver</p>
	 * @param message
	 */
	@Override
	public void onMessage(Message message) {
		try {
			String messageSender = message.getStringProperty(Constants.MESSAGE_SENDER);
			String messageReceiver = message.getStringProperty(Constants.MESSAGE_RECEIVER);
			String messageContent = message.getStringProperty(Constants.MESSAGE_CONTENT);
			userSender = (User) message.getObjectProperty(Constants.USER_SENDER);
						
			// Set the last message that was received
			this.lastMessageReceived = messageContent;
			
			// Add userId to contacts
			contacts.addUserIdToContacts(userSender.getUserId());
			
			// Store the sender
			userReceiverMap.put(userSender.getUserId(), userSender);
			
			LOGGER.info("RECEIVER: " + messageReceiver + " - SENDER: " + messageSender + " - MESSAGE: " + messageContent);
		} 
		catch (JMSException jmsException) {
			LOGGER.error(jmsException.getMessage());
		}
	}
	
	public void reply(User userSender, User userReceiver, String messageContent) {
		//asyncMessageSender.sendMessageToUser(userSender, userReceiver, messageContent);
	}
	
	/**
	 * @return the userId
	 */
	public String getUserId() {
		return userId;
	}

	/**
	 * @param userId the userId to set
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}
	/**
	 * @return the userName
	 */
	public String getUserName() {
		return userName;
	}

	/**
	 * @param userName the userName to set
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**
	 * @return the messageQueue
	 */
	public ActiveMQQueue getMessageQueueName() {
		return messageQueueName;
	}
	
	/**
	 * @return the messageQueue
	 */
	public String getMessageQueueNameAsString() {
		String messageQueueNameAsString = "";
		try {
			messageQueueNameAsString =  messageQueueName.getQueueName();
		} 
		catch (JMSException jmsException) {
			LOGGER.error(jmsException.getMessage());
		}
		return messageQueueNameAsString;
	}

	/**
	 * @param messageQueueName the messageQueue to set
	 */
	public void setMessageQueueName(String messageQueueName) {
		this.messageQueueName = new ActiveMQQueue(messageQueueName);
	}
	
	/**
	 * @return the asyncMessageSender
	 */
	public ASyncMessageSender getAsyncMessageSender() {
		return asyncMessageSender;
	}

	/**
	 * @param asyncMessageSender the asyncMessageSender to set
	 */
	public void setAsyncMessageSender(ASyncMessageSender asyncMessageSender) {
		this.asyncMessageSender = asyncMessageSender;
	}
	
	/**
	 * @return the lastMessageSent
	 */
	public String getLastMessageSent() {
		return lastMessageSent;
	}

	/**
	 * @param lastMessageSent the lastMessageSent to set
	 */
	public void setLastMessageSent(String lastMessageSent) {
		this.lastMessageSent = lastMessageSent;
	}

	/**
	 * @return
	 */
	public String getLastMessageReceived() {
		return lastMessageReceived;
	}

	/**
	 * @param lastMessageReceived
	 */
	public void setLastMessageReceived(String lastMessageReceived ) {
		this.lastMessageReceived = lastMessageReceived;
	}

	/**
	 * @return the contacts
	 */
	public Contacts getContacts() {
		return contacts;
	}

	/**
	 * @param contacts the contacts to set
	 */
	public void setContacts(Contacts contacts) {
		this.contacts = contacts;
	}
	
	/**
	 * @return the userSender
	 */
	public User getUserSender() {
		return userSender;
	}

	/**
	 * @param userSender the userSender to set
	 */
	public void setUserSender(User userSender) {
		this.userSender = userSender;
	}

	@Override
	public String toString() {
		return "User [userName=" + userName + " - messageQueueName=" + getMessageQueueNameAsString() + "]";	
	}

}
