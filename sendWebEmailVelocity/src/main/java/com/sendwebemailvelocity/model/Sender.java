package com.sendwebemailvelocity.model;

public class Sender {
	
	private String firstName;
	private String lastName;
	private String emailAddress;
	private String emailSubject;
	private String emailAddressDestination;
	
	public Sender() {
		// Do nothing
	}
	
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmailAddress() {
		return emailAddress;
	}
	
	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}
	
	public String getEmailSubject() {
		return emailSubject;
	}
	
	public void setEmailSubject(String emailSubject) {
		this.emailSubject = emailSubject;
	}
	
	public String getEmailAddressDestination() {
		return emailAddressDestination;
	}
	
	public void setEmailAddressDestination(String emailAddressDestination) {
		this.emailAddressDestination = emailAddressDestination;
	}

}
