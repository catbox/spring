package com.hello.form.converter;

import org.springframework.stereotype.Component;

import com.google.common.base.Preconditions;

import com.hello.db.transter.Person;
import com.hello.form.LoginForm;

@Component("loginConverter")
public class LoginFormConverter {

	private Person person;
	
	public Person convert(LoginForm loginForm) {
		
		Preconditions.checkNotNull(loginForm);
		
		person = new Person(loginForm.getFirstName(), loginForm.getLastName());
		
		return person;
	}

}
