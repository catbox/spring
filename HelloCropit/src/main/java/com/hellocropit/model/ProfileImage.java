package com.hellocropit.model;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonProperty;

@Component("profileImageModel")
public class ProfileImage {
	
	@JsonProperty
	private String name;
	
	@JsonProperty
	private String type;
	
	@JsonProperty
	private int size;
	
	@JsonProperty
	private String lastModified;
	
	@JsonProperty
	private byte[] fileData;

	/**
	 * @return the name
	 */
	@JsonProperty
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the type
	 */
	@JsonProperty
	public String getType() {
		return type;
	}

	/**
	 * @param type the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * @return the size
	 */
	@JsonProperty
	public int getSize() {
		return size;
	}

	/**
	 * @param size the size to set
	 */
	public void setSize(int size) {
		this.size = size;
	}

	/**
	 * @return the lastModified
	 */
	@JsonProperty
	public String getLastModified() {
		return lastModified;
	}

	/**
	 * @param lastModified the lastModified to set
	 */
	public void setLastModified(String lastModified) {
		this.lastModified = lastModified;
	}

	/**
	 * @return the fileData
	 */
	@JsonProperty
	public byte[] getFileData() {
		return fileData;
	}

	/**
	 * @param fileData the fileData to set
	 */
	public void setFileData(byte[] fileData) {
		this.fileData = fileData;
	}

}
