package com.enigma.utils;

import com.enigma.Enigma;

public class EnigmaUtil {
	
	private static Enigma enigma = new Enigma();
	
	// Encrypt the password.
	public static String encrypt(String password) {
		
		byte[] passwordBytes = StringUtil.getBytesUTF8(password);
		byte[] encryptedPassword = enigma.encrypt(passwordBytes);	
		String encryptedPasswordStr = HexUtil.convertByteArrayToHexString(encryptedPassword );
		
		return encryptedPasswordStr;
	}
	
	// Decrypt the encoded password.
	public static String decrypt(String encryptedPasswordStr) {
		
		byte[] encodedPassword = HexUtil.convertHexStringToByteArray(encryptedPasswordStr);
		byte[] decodedPassword = enigma.decrypt(encodedPassword);
		String decryptedPasswordStr = HexUtil.convertUTFBytesToString(decodedPassword) ;
		
		return decryptedPasswordStr;
	}

}
