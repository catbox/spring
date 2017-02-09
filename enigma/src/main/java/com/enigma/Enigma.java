package com.enigma;

import java.math.BigInteger;

public class Enigma {
	
	private byte[] key = new BigInteger("a8c87cb8d9ad59939e858f86df9b909", 16).toByteArray();
	private EnigmaKernel ek = new EnigmaKernel(key);
	
	public Enigma() {
		// Do nothing
	}
	
	public byte[] decrypt(byte[] ciphertext) {
		return ek.decode(ciphertext);
	}

	public byte[] encrypt(byte[] plaintext) {
		return ek.encodeViaBytes(plaintext);
	}

}
