package com.sendwebemailvelocity.model;

import java.io.Serializable;

import com.google.common.base.Strings;

public class Receiver implements Serializable{
	
	/** Serial Version */
    private static final long serialVersionUID = 1L;
    
    /** first name */
    private final String firstName;

    /** last name */
    private final String lastName;
    
    /** email address **/
    private final String emailAddress;
    
    public Receiver(String firstName, String lastName, String emailAddress) {
        this.firstName = Strings.emptyToNull(firstName);
        this.lastName = Strings.emptyToNull(lastName);
        this.emailAddress = Strings.emptyToNull(emailAddress);
    }

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

}
