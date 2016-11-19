package com.hello.db.dao;

import com.hello.db.transter.Person;

public class PersonDAO implements IPersonDAO {

	@Override
	public boolean isValid(Person person) {
		
		if((person.getFirstName().equalsIgnoreCase("Schwarze")) && (person.getLastName().equalsIgnoreCase("Katze"))) {
			return true;
		}
		else {
			return false;
		}
	}

}
