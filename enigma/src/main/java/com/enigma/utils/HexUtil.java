package com.enigma.utils;

public class HexUtil {

	public static String convertByteArrayToHexString(byte[] enc) {
		StringBuffer buf = new StringBuffer(enc.length * 2);
		
		for(int i = 0; i < enc.length; i++) {
			int unsignedVal = enc[i] & 0xff;
			String s = Integer.toHexString(unsignedVal);

			if(unsignedVal < 16) {
				buf.append('0');
			}
			buf.append(s);
		}

		return buf.toString().toUpperCase();
	}

	public static byte[] convertHexStringToByteArray(String input) {
		int len = (int) (input.length() / 2.0 + 0.49);
		byte enc[] = new byte[len];
		
		for(int i = 0; i < input.length(); i = i + 2) {
			if(i + 2 > input.length()) {
				enc[i / 2] = parseByte(input.substring(i));
			}
			else {
				enc[i / 2] = parseByte(input.substring(i, i + 2));
			}
		}

		return enc;
	}

	private static byte parseByte(String s) {
		if(2 > s.length()) {
			return (byte) Integer.parseInt(s, 16);
		}
		else{
			return (byte) Integer.parseInt(s.substring(0, 2), 16);
		}
	}
	
	public static String convertUTFBytesToString(byte[] dec) {
		String s = StringUtil.newStringUTF8(dec);
		int index = s.indexOf('\0');

		if(index > -1) {
			return s.substring(0, index);
		}
		else {
			return s;
		}
	}

}
