package com.sendwebemailvelocity.form;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.Strings;
import com.sendwebemailvelocity.validation.ValidationMessages;

@Component("emailForm")
public class EmailForm {
	
	@NotEmpty(message = ValidationMessages.FIRST_NAME_REQUIRED_MESSAGE)
	@JsonProperty
	private String firstName;
	
	@NotEmpty(message = ValidationMessages.LAST_NAME_REQUIRED_MESSAGE)
	@JsonProperty
	private String lastName;
	
	@NotEmpty(message = ValidationMessages.EMAIL_ADDRESS_REQUIRED_MESSAGE)
	@JsonProperty
	private String emailAddress;
	
	public EmailForm() {
		firstName = null;
		lastName = null;
		emailAddress = null;
	}
    
	@JsonProperty
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	@JsonProperty
	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@JsonProperty
	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}
	
	public boolean isValid() {
		
		if(Strings.isNullOrEmpty(firstName) || Strings.isNullOrEmpty(lastName) || Strings.isNullOrEmpty(emailAddress)) {
			return false;
		}
		else {
			return true;
		}		
	}
	
	@Override
    public String toString() {
        return "LoginForm [firstName=" + firstName + " lastName=" + lastName + "emailAddress=" + emailAddress + "]";
	}

}
