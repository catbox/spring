package com.hello.world.form;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.Strings;
import com.hello.world.validation.ValidationMessages;

public class LoginForm {

	public LoginForm() {
		firstName = null;
		lastName = null;
	}

	// This annotation means that this variable can not be empty.
	@NotEmpty(message = ValidationMessages.FIRST_NAME_REQUIRED_MESSAGE)
	/* This annotation would stringify the variable as a JSON variable.
	   When @JsonProperty is used the JSON variable would simply be the same as the java variable.
	   However when using @JsonProperty(value="somejsonvariable"), the java variable will be changed to a 
	   JSON variable called somejsonvariable and will hold the value assigned to the java variable */
	@JsonProperty
	private String firstName;
	
	// This annotation means that this variable can not be empty.
	@NotEmpty(message = ValidationMessages.LAST_NAME_REQUIRED_MESSAGE)
	/* This annotation would stringify the variable as a JSON variable.
	   When @JsonProperty is used the JSON variable would simply be the same as the java variable.
	   However when using @JsonProperty(value="somejsonvariable"), the java variable will be changed to a 
	   JSON variable called somejsonvariable and will hold the value assigned to the java variable */
	@JsonProperty
	private String lastName;

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
	
	public boolean isValid() {
		
		if(Strings.isNullOrEmpty(firstName) || Strings.isNullOrEmpty(lastName)) {
			return false;
		}
		else {
			return true;
		}		
	}
	
	@Override
    public String toString() {
        return "LoginForm [firstName=" + firstName + " lastName=" + lastName + "]";
	}

}
