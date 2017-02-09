package com.enigma.utils;

import java.io.UnsupportedEncodingException;

public class StringUtil {

	/**
	 * Converts a string to a byte array using the UTF-8 encoding.
	 * @param String
	 * @return byte[]
	 */
	public static byte[] getBytesUTF8(String string) {
		try{
			return string.getBytes("UTF-8");
		}
		catch(UnsupportedEncodingException exception){
			throw new RuntimeException(exception);
		}
	}
	
	/**
	 * Converts a byte array to a string using the UTF-8 encoding.
	 * @param byte []
	 * @return String.
	 */
	public static String newStringUTF8(byte[] bytes) {
		try {
			return new String(bytes, "UTF-8");
		}
		catch(UnsupportedEncodingException exception){
			throw new RuntimeException(exception);
		}
	}

}
