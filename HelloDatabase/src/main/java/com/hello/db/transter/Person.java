package com.hello.db.transter;

import java.io.Serializable;

import com.google.common.base.Strings;

public class Person implements Serializable {
	
	/** Serial Version */
    private static final long serialVersionUID = 1L;
    
    /** first name */
    private final String firstName;

    /** last name */
    private final String lastName;

    /**
     * Constructor
     * 
     * @param firstName
     * @param lastName
     */
    public Person(String firstName, String lastName) {
        this.firstName = Strings.emptyToNull(firstName);
        this.lastName = Strings.emptyToNull(lastName);
    }

    /**
     * returns first name
     * 
     * @return
     */
    public String getFirstName() {
        return this.firstName;
    }

    /**
     * returns last name
     * 
     * @return
     */
    public String getLastName() {
        return this.lastName;
    }

	@Override
    public String toString() {
        return "Person [firstName=" + firstName + " lastName= " + lastName + "]";
    }

}
