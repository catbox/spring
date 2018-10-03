package com.hello.world.dao;

import com.hello.world.transfer.Person;

public class PersonDAO implements IPersonDAO {

	@Override
	public boolean isValid(Person person) {
		
		if((person.getFirstName().equalsIgnoreCase("admin")) && (person.getLastName().equalsIgnoreCase("admin"))) {
			return true;
		}
		else {
			return false;
		}
	}

}
