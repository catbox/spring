package com.password.generator;

public class PasswordGenerator {
	
	public static void main(String[] args) {
		Password password = new Password();
		String pwd = password.generatePassword();
		System.out.println("Password: " + pwd);
	}
}
