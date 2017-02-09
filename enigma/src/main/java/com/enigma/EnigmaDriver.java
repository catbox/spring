package com.enigma;

import com.enigma.utils.EnigmaUtil;

public class EnigmaDriver {

	public static void main(String[] args) {
		
		String password = "MisterHacker$265";
		
		String encryptedPassword = EnigmaUtil.encrypt(password);
		
		String decryptedPassword = EnigmaUtil.decrypt(encryptedPassword);
		
		System.out.println("Password: " + password);
		System.out.println("Encrypted Password: " + encryptedPassword);
		System.out.println("Decryted Password: " + decryptedPassword);
	}

}
