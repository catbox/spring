package com.hello.world.form.converter;

import org.springframework.stereotype.Component;

import com.google.common.base.Preconditions;

import com.hello.world.form.LoginForm;
import com.hello.world.transfer.Person;

@Component("loginFormConverter")
public class LoginFormConverter {

	private Person person;
	
	public Person convert(LoginForm loginForm) {
		
		Preconditions.checkNotNull(loginForm);
		
		person = new Person(loginForm.getFirstName(), loginForm.getLastName());
		
		return person;
	}

}
