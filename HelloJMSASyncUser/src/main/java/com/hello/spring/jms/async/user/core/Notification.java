package com.hello.spring.jms.async.user.core;

import java.io.Serializable;

import org.springframework.stereotype.Component;

@Component("notification")
public class Notification implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private String id;
	private String sender;
	private String receiver;
	private String message;
		
	/**
	 * Default constructor
	 */
	public Notification() {
		// Do nothing
	}
	
	/**
	 * @param id
	 * @param message
	 */
	public Notification(String id, String message) {
		this.id = id;
		this.message = message;
	}
	
	/**
	 * @param id
	 * @param sender
	 * @param receiver
	 * @param message
	 */
	public Notification(String id, String sender, String receiver, String message) {
		this.id = id;
		this.sender = sender;
		this.receiver = receiver;
		this.message = message;
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}
	
	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}
	
	/**
	 * @return the sender
	 */
	public String getSender() {
		return sender;
	}

	/**
	 * @param sender the sender to set
	 */
	public void setSender(String sender) {
		this.sender = sender;
	}

	/**
	 * @return the receiver
	 */
	public String getReceiver() {
		return receiver;
	}

	/**
	 * @param receiver the receiver to set
	 */
	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}

	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}
	
	/**
	 * @param message the message to set
	 */
	public void setMessage(String message) {
		this.message = message;
	}
	
	@Override
	public String toString() {
		return "Notification [id=" + id + ", message= " + message + "]";
	}
	
}
