package com.sendwebemailvelocity.form.converter;

import org.springframework.stereotype.Component;

import com.google.common.base.Preconditions;
import com.sendwebemailvelocity.form.EmailForm;
import com.sendwebemailvelocity.model.Receiver;

@Component("emailConverter")
public class EmailFormConverter {
	
	private Receiver receiver;
	
	public Receiver convert(EmailForm loginForm) {
		
		Preconditions.checkNotNull(loginForm);
		
		receiver = new Receiver(loginForm.getFirstName(), loginForm.getLastName(), loginForm.getEmailAddress());
		
		return receiver;
	}

}
