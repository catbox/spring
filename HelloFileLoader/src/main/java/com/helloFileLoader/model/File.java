package com.helloFileLoader.model;

import org.springframework.web.multipart.MultipartFile;

public class File {
	
	/**
	 * A representation of an uploaded file received in a multipart request. 
	 * The multipart request handles content within a servlet request, allowing to access to file upload.
	 */
	MultipartFile file;
	
	/**
	 * @return file
	 */
	public MultipartFile getFile() {
		return file;
	}

	/**
	 * @param file
	 */
	public void setFile(MultipartFile file) {
		this.file = file;
	}		
}
