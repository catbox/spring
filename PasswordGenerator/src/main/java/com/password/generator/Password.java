package com.password.generator;

import java.util.Random;

public class Password {
	
	String[] passwordCharactersAndDigits = {"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u",
											"v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P",
											"Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"};
	
	String[] passwordSymbols = {"$","#","%","@"};

	public Password() {
		// Do nothing
	}
	
	public String generatePassword(){

		// Characters and digits elements.
		StringBuffer pwdCharsAndDigits = new StringBuffer();
		int pwdLength = 14;

		for(int i = 0; i < pwdLength; i++){			
			Random r = new Random();
			int random = r.nextInt(passwordCharactersAndDigits.length);		
			pwdCharsAndDigits.append(passwordCharactersAndDigits[random]);	
		}
		
		String passwordCharsAndDigits = pwdCharsAndDigits.toString();
		
		// Symbols.
		StringBuffer pwdSymbol = new StringBuffer();
		int pwdSymbolLength = 1;
		
		for(int i = 0; i < pwdSymbolLength; i++){			
			Random r = new Random();
			int random = r.nextInt(passwordSymbols.length);		
			pwdSymbol.append(passwordSymbols[random]);	
		}
		
		String passwordSymbol = pwdSymbol.toString();;

		// Complete password.
		StringBuilder pwdBuilder = new StringBuilder();
		pwdBuilder.append(passwordSymbol).append(passwordCharsAndDigits);
		
		String password = pwdBuilder.toString();
		
		return password;
	}

}
