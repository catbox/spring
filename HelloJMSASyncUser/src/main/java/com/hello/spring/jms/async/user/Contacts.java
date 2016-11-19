package com.hello.spring.jms.async.user;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Component;

@Component("contacts")
public class Contacts {
	
	private Set<String> myContacts = new HashSet<String>();
	private Set<String> contacts = new HashSet<String>();
	private Set<String> blockedContacts = new HashSet<String>();
	
	public Contacts() {
		// Do nothing
	}
	
	/**
	 * <p>Add a userId to contacts</p>
	 * @param userId
	 */
	public void addUserIdToContacts(String userId) {
		contacts.add(userId);
	}
	
	/**
	 * <p>Add a userId to myContacts</p>
	 * @param userId
	 */
	public void addUserIdToMyContacts(String userId) {
		myContacts.add(userId);
	}
	
	/**
	 * <p>Add a userId to blockedContacts</p>
	 * @param userId
	 */
	public void addUserIdBlockedContacts(String userId) {
		blockedContacts.add(userId);
	}

	/**
	 * @return the myContacts
	 */
	public Set<String> getMyContacts() {
		return myContacts;
	}

	/**
	 * @param myContacts the myContacts to set
	 */
	public void setMyContacts(Set<String> myContacts) {
		this.myContacts = myContacts;
	}

	/**
	 * @return the contacts
	 */
	public Set<String> getContacts() {
		return contacts;
	}

	/**
	 * @param contacts the contacts to set
	 */
	public void setContacts(Set<String> contacts) {
		this.contacts = contacts;
	}

	/**
	 * @return the blockedContacts
	 */
	public Set<String> getBlockedContacts() {
		return blockedContacts;
	}

	/**
	 * @param blockedContacts the blockedContacts to set
	 */
	public void setBlockedContacts(Set<String> blockedContacts) {
		this.blockedContacts = blockedContacts;
	}

}
