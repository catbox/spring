package com.helloFileLoader.utilities;


import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import org.springframework.web.multipart.MultipartFile;

import com.helloFileLoader.Constants.FileLoaderConstants;

public class FileLoader {
	
	// Directory root path
	private static String rootDirectoryPath;
	// Property file
	private static Properties properties;
	// Root Directory
	private static File rootDirectory;
	// User Directory
	private static File userDirectory;
	// Array of valid file extension (suffix)
	public static String[] fileExtensionArray = {"BMP", "GIF", "ICO", "JFIF", "JPEG", "JPG", "PNG", "TIF", "TIFF"};
	// List of valid file extension (suffix)
	public static List<String> fileExtensionList = new ArrayList<String>(Arrays.asList(fileExtensionArray));

	/**
	 * Creates the root directory for all users
	 */
	public static void createRootDirectory() {
		
		try {		
			InputStream rootPathStream = FileLoader.class.getResourceAsStream(FileLoaderConstants.USER_DATA_FILE);
			properties = new Properties();
			properties.load(rootPathStream);
			rootDirectoryPath = properties.getProperty(FileLoaderConstants.ROOT);		
			rootDirectory = new File(rootDirectoryPath);
			
			if(!rootDirectory.exists()) {
				rootDirectory.mkdir();
				System.out.println("Directory was created at: " + rootDirectory.getAbsolutePath());
			}
			else {
				System.out.println("Directory already exists at: " + rootDirectory.getAbsolutePath() + " *** Directory not created!");
			}
		} 
		catch(FileNotFoundException fileNotFoundException) {
			System.out.println("FileNotFoundException: " + fileNotFoundException.getMessage());
		} 
		catch(IOException ioException) {
			System.out.println("IOException: " + ioException.getMessage());
		}
		catch(Exception exception) {
			System.out.println("Exception: " + exception.getMessage());
		}		
	}
	
	/**
	 * Create the user's directory
	 * @param userRootDirectory
	 */
	public static void createUserDirectory(String userRootDirectory) {
		
		createRootDirectory();
		
		userDirectory = new File(rootDirectoryPath + File.separator + userRootDirectory);
		
		if(!userDirectory.exists()) {
			userDirectory.mkdir();
			System.out.println("User directory was created at: " + userDirectory.getAbsolutePath());
		}
		else {
			System.out.println("User directory already exists at: " + userDirectory.getAbsolutePath() + " *** Directory not created!");
		}
	}
	
	/**
	 * Verify if file extension is valid
	 * @param extension
	 * @return true if file extension is valid else false
	 */
	private static boolean isExtensionValid(String extension) {
	
		if(fileExtensionList.contains(extension.toUpperCase())) {
			return true;
		}
		else {
			return false;
		}
	}
	
	/**
	 * Upload user's profile image
	 * @param user
	 * @param userProfileImagePath
	 */
	public static void uploadUserProfileImage(String user, MultipartFile multipartFile) {
		
		createUserDirectory(user);

		try {
			byte[] byteArray = multipartFile.getBytes();
			String fileName = multipartFile.getOriginalFilename();
			int fileLength = fileName.length();			
			int indexOfDot = fileName.lastIndexOf(".");			
			String fileSuffix = fileName.substring(indexOfDot+1, fileLength);

			if(isExtensionValid(fileSuffix)) {
				File userProfileLocation = new File(rootDirectoryPath + File.separator + user + File.separator + fileName);				
				BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(userProfileLocation));
				stream.write(byteArray);
	            stream.close();			
			}
			else {
				System.err.println("File extension is not supported");
			}
		} 
		catch(IOException ioException) {
			System.err.println("IOException: " + ioException.getMessage());
		}
		catch(Exception exception) {
			System.err.println("Exception: " + exception.getMessage());
		}
	}
	
	/**
	 * Delete the user's directory
	 * @param userDirectory
	 * @return true if deletion of the user directory was successful else false
	 */
	public static boolean deleteUserDirectory(String userDirectory) {
		 return deleteUserDirectoryContent(new File(rootDirectoryPath + File.separator + userDirectory));
	}
	
	/**
	 * Delete the user's directory content
	 * @param directoryPath
	 * @return true if deletion of the user directory was successful else false
	 */
	private static boolean deleteUserDirectoryContent(File directoryPath) {
		if(directoryPath.exists()) {
	      File[] userDirectoryContent = directoryPath.listFiles();
	      for(int i=0; i<userDirectoryContent.length; i++) {
	    	 // Found a directory - Call back the method recursively
	         if(userDirectoryContent[i].isDirectory()) {
	           deleteUserDirectoryContent(userDirectoryContent[i]);
	         }
	         // Found a file - Delete it
	         else {
	           userDirectoryContent[i].delete();
	         }
	      }
	    }
	    return(directoryPath.delete());
	}

}
