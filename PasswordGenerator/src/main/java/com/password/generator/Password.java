package com.password.generator;

import java.util.Random;

public class Password {
	
	String[] passwordCharacters = {"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t",
								   "u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N",
								   "O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7",
								   "8","9","!","@","£","$","%","^","&","*","~","`","<",">","/","?","|","[","]","+",
								   "=","-","_"};

	public Password() {
		// Do nothing
	}
	
	public String generatePassword(){

		StringBuffer password = new StringBuffer();
		int passwordLength = 10;

		for(int i = 0; i < passwordLength; i++){			
			Random r = new Random();
			int random = r.nextInt(passwordCharacters.length);		
			password.append(passwordCharacters[random]);	
		}

		return password.toString();		
	}

}
