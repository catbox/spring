package com.enigma;

public class EnigmaKernel {
	
	private int _key[];				// The 128 bit key.
	private byte _keyBytes[];		// Original key as found

	/**
	 * Accepts key for enciphering/deciphering.
	 *
	 * @param key 128 bit (16 byte) key.
	 * @throws ArrayIndexOutOfBoundsException if the key is not the correct length.
	 */
	public EnigmaKernel(byte key[]) {
		int klen = key.length;
		_key = new int[4];

		// Incorrect key length throws exception.
		if(klen != 16) {
			throw new ArrayIndexOutOfBoundsException(this.getClass().getName() + ": Key is not 16 bytes");		//$NON-NLS-1$
		}

		int j, i;
		for(i = 0, j = 0; j < klen; j += 4, i++) {
			_key[i] = (key[j] << 24) | (((key[j + 1]) & 0xff) << 16) | (((key[j + 2]) & 0xff) << 8) | ((key[j + 3]) & 0xff);
		}

		_keyBytes = new byte[klen];		// save for toString.

		System.arraycopy(key, 0, _keyBytes, 0, klen);
	}

	/**
	 * Replaces the original contents of the parameters with the results.
	 * The integers are usually created from 8 bytes.
	 */
	private int[] encipher(int v[]) {
		int y = v[0];
		int z = v[1];
		int sum = 0;
		int delta = 0x9E3779B9;
		int a = _key[0];
		int b = _key[1];
		int c = _key[2];
		int d = _key[3];
		int n = 32;

		while(n-- > 0) {
			sum += delta;
			y += (z << 4) + a ^ z + sum ^ (z >> 5) + b;
			z += (y << 4) + c ^ y + sum ^ (y >> 5) + d;
		}

		v[0] = y;
		v[1] = z;

		return v;
	}

	/**
	 * Replaces the original contents of the parameters with the results.
	 * The integers are usually decoded to 8 bytes.
	 */
	private int[] decipher(int v[]) {
		int y = v[0];
		int z = v[1];
		int sum = 0xC6EF3720;
		int delta = 0x9E3779B9;
		int a = _key[0];
		int b = _key[1];
		int c = _key[2];
		int d = _key[3];
		int n = 32;

		while(n-- > 0) {
			z -= (y << 4) + c ^ y + sum ^ (y >> 5) + d;
			y -= (z << 4) + a ^ z + sum ^ (z >> 5) + b;
			sum -= delta;
		}

		v[0] = y;
		v[1] = z;

		return v;
	}

	/**
	 * Encode from a byte array.
	 * @param b[]
	 * @return byte[] bytes
	 */
	public byte[] encodeViaBytes(byte b[]) {
		int[] crypt = encode(b);
		byte[] bytes = convertIntArrayToByteArray(crypt);

		return bytes;
	}

	/**
	 * Byte wrapper for encoding.
	 * Converts bytes to int.
	 * Padding will be added if required.
	 * @param byte array
	 * @return integer conversion array, possibly with padding.
	 */
	public int[] encode(byte b[]) {
		int bLen = b.length;
		byte bp[] = b;

		int _padding = bLen % 8;

		if(_padding != 0) {
			_padding = 8 - (bLen % 8);
			bp = new byte[bLen + _padding];
			System.arraycopy(b, 0, bp, 0, bLen);
			bLen = bp.length;
		}

		int intCount = bLen / 4;
		int r[] = new int[2];
		int out[] = new int[intCount];

		for(int i = 0, j = 0; j < bLen; j += 8, i += 2) {
			r[0] = (bp[j] << 24) | (((bp[j + 1]) & 0xff) << 16) | (((bp[j + 2]) & 0xff) << 8) | ((bp[j + 3]) & 0xff);
			r[1] = (bp[j + 4] << 24) | (((bp[j + 5]) & 0xff) << 16) | (((bp[j + 6]) & 0xff) << 8) | ((bp[j + 7]) & 0xff);

			encipher(r);

			out[i] = r[0];
			out[i + 1] = r[1];
		}

		return out;
	}

	/**
	 * Convert a byte array to ints and then decode.
	 * There may be some padding at the end of the byte array from the previous encode operation.
	 * @param bytes to decode
	 * @return an array of decoded bytes.
	 */
	public byte[] decode(byte b[]) {
		int[] ini = convertByteArrayToIntArray(b);

		return decode(ini);
	}

	/**
	 * Convert an integer array to a byte array.
	 */
	private byte[] convertIntArrayToByteArray(int[] ca) {
		byte[] buf = new byte[ca.length * 4];

		for(int i = 0; i < ca.length; i++) {
			for(int j = 0; j < 4; j++) {
				buf[i * 4 + 3 - j] = (byte) ca[i];
				ca[i] = ca[i] >> 8;
			}
		}

		return buf;
	}

	/**
	 * Convert a byte array to an integer array.
	 */
	private int[] convertByteArrayToIntArray(byte[] b) {
		int intCount = b.length / 4;
		int ini[] = new int[intCount];
		for(int i = 0, j = 0; i < intCount; i += 2, j += 8) {
			ini[i] = (b[j] << 24) | (((b[j + 1]) & 0xff) << 16) | (((b[j + 2]) & 0xff) << 8) | ((b[j + 3]) & 0xff);
			ini[i + 1] = (b[j + 4] << 24) | (((b[j + 5]) & 0xff) << 16) | (((b[j + 6]) & 0xff) << 8) | ((b[j + 7]) & 0xff);
		}

		return ini;
	}

	/**
	 * Decode an integer array.
	 * There may be some padding at the end of the byte array from the previous encode operation.
	 * @param  bytes to decode
	 * @return array of decoded bytes.
	 */
	byte[] decode(int b[]) {
		
		int intCount = b.length;

		byte outb[] = new byte[intCount * 4];
		int tmp[] = new int[2];

		// Decipher all the integers.
		for(int j = 0, i = 0; i < intCount; i += 2, j += 8) {
			tmp[0] = b[i];
			tmp[1] = b[i + 1];

			decipher(tmp);

			outb[j] = (byte) (tmp[0] >>> 24);
			outb[j + 1] = (byte) (tmp[0] >>> 16);
			outb[j + 2] = (byte) (tmp[0] >>> 8);
			outb[j + 3] = (byte) (tmp[0]);
			outb[j + 4] = (byte) (tmp[1] >>> 24);
			outb[j + 5] = (byte) (tmp[1] >>> 16);
			outb[j + 6] = (byte) (tmp[1] >>> 8);
			outb[j + 7] = (byte) (tmp[1]);
		}

		return outb;
	}

}
