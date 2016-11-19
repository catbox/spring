package com.hello.form;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class LoginFormTest {
	
	public static void main(String args[] ) {
		
		LoginForm loginForm = new LoginForm();
		loginForm.setFirstName("Crazy");
		loginForm.setLastName("Diamond");
		
		System.out.println("LoginForm: " + loginForm);
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		try {
			String jsonString =  objectMapper.writeValueAsString(loginForm);
			System.out.println("JSON string of LoginForm: " + jsonString);
		} 
		catch (JsonProcessingException e) {
			e.printStackTrace();
		}
			
	}

}
