package com.helloCropper.utilities;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import org.apache.commons.io.FileUtils;
import org.springframework.web.multipart.MultipartFile;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.helloCropper.Constants.FileLoaderConstants;

public class FileLoader {
	
	// Directory root path
	private static String rootDirectoryPath;
	// Property file
	private static Properties properties;
	// Root directory
	private static File rootDirectory;
	// User directory
	private static File userDirectory;
	// User profile directory
	private static File userProfileDirectory;
	// Array of valid file extension (suffix)
	public static String[] fileExtensionArray = {"BMP", "GIF", "ICO", "JFIF", "JPEG", "JPG", "PNG", "TIF", "TIFF"};
	// List of valid file extension (suffix)
	public static List<String> fileExtensionList = new ArrayList<String>(Arrays.asList(fileExtensionArray));
	// Logger
	private static final Logger LOGGER = LoggerFactory.getLogger(FileLoader.class);

	/**
	 * Creates the root directory for all users
	 */
	public static void createRootDirectory() {
		
		try {		
			if(!rootDirectoryExist()) {
				rootDirectory.mkdir();
				LOGGER.info("Directory was created at: " + rootDirectory.getAbsolutePath());
			}
			else {
				LOGGER.info("Directory already exists at: " + rootDirectory.getAbsolutePath() + " - Directory not created");
			}
		}
		catch(Exception exception) {
			LOGGER.error("Exception: " + exception.getMessage());
		}		
	}
	
	/**
	 * Create the user's directory
	 * @param userRootDirectory
	 */
	public static void createUserDirectory(String userRootDirectory) {
		// Create root directory
		createRootDirectory();
		
		try {
			userDirectory = new File(rootDirectoryPath + File.separator + userRootDirectory);
			LOGGER.info("User Directory: " + userDirectory);
			
			if(!userDirectoryExist(userRootDirectory)) {
				userDirectory.mkdir();
				LOGGER.info("User directory was created at: " + userDirectory.getAbsolutePath());
			}
			else {
				LOGGER.info("User directory already exists at: " + userDirectory.getAbsolutePath() + " - Directory was not created");
			}
		}
		catch(Exception exception) {
			LOGGER.error("Exception: " + exception.getMessage());
		}
		// Create user profile directory
		createUserProfileDirectory(userRootDirectory);
	}
	
	/**
	 * Create the user's profile directory
	 * @param userRootDirectory
	 */
	public static void createUserProfileDirectory(String userRootDirectory) {
		
		userProfileDirectory = new File(rootDirectoryPath + File.separator + userRootDirectory + File.separator + "Profile");
		LOGGER.info("User Profile Directory: " + userProfileDirectory);
		
		if(!userProfileDirectory.exists()) {
			userProfileDirectory.mkdir();
			LOGGER.info("User profile directory was created at: " + userProfileDirectory.getAbsolutePath());
		}
		else {
			try {
				FileUtils.cleanDirectory(userProfileDirectory);
				LOGGER.info("User profile directory already exists at: " + userProfileDirectory.getAbsolutePath() + " - Profile Directory not created");
			} 
			catch(IOException ioException) {
				LOGGER.error("Error cleaning user profile directory: " + ioException.getMessage());
			}
		}
	}
	
	/**
	 * Verify the existence of the root directory
	 * @return true if root directory exists else return false.
	 */
	private static boolean rootDirectoryExist() {
				
		rootDirectory = new File(getRootDirectoryPath());
		
		if(rootDirectory.exists()) {
			return true;
		}
		
		return false;		
	}
	
	private static String getRootDirectoryPath() {
		
		try {		
			InputStream rootPathStream = FileLoader.class.getResourceAsStream(FileLoaderConstants.USER_DATA_FILE);
			properties = new Properties();
			properties.load(rootPathStream);
			rootDirectoryPath = properties.getProperty(FileLoaderConstants.ROOT);
		} 
		catch(FileNotFoundException fileNotFoundException) {
			LOGGER.error("FileNotFoundException: " + fileNotFoundException.getMessage());
			return FileLoaderConstants.EMPTY_STRING;
		}		
		catch(IOException ioException) {
			LOGGER.error("IOException: " + ioException.getMessage());
			return FileLoaderConstants.EMPTY_STRING;
		}		
		catch(Exception exception) {
			LOGGER.error("Exception: " + exception.getMessage());
			return FileLoaderConstants.EMPTY_STRING;
		}

		return rootDirectoryPath;
	}
		
	/**
	 * @param userRootDirectory
	 * @return true if user directory exists else return false.
	 */
	private static boolean userDirectoryExist(String userRootDirectory) {
		
		userDirectory = new File(getRootDirectoryPath() + File.separator + userRootDirectory);
		
		if(userDirectory.exists()) {
			return true;
		}
		else {
			return false;
		}
	}
	
	/**
	 * @param userRootDirectory
	 * @return true if user profile directory exists else return false.
	 */
	public static boolean userProfileDirectoryExist(String userRootDirectory) {
		
		userProfileDirectory = new File(rootDirectoryPath + File.separator + userRootDirectory + "Profile");
		
		if(userProfileDirectory.exists()) {
			return true;
		}
		else {
			return false;
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
		try {
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
		}
		catch(Exception exception) {
			LOGGER.error("Exception: " + exception);
		}
	    return(directoryPath.delete());
	}
	
	/**
	 * Upload user's profile image
	 * @param user
	 * @param userProfileImagePath
	 */
	public static void uploadUserProfilePicture(String user, MultipartFile multipartFile) {
		
		createUserDirectory(user);

		try {
			byte[] byteArray = multipartFile.getBytes();
			String fileName = multipartFile.getOriginalFilename();
			int fileLength = fileName.length();			
			int indexOfDot = fileName.lastIndexOf(".");			
			String fileSuffix = fileName.substring(indexOfDot+1, fileLength);
			String ProfilePictureName = user + FileLoaderConstants.PROFILE_PICTURE_SUFFIX + "." + fileSuffix;

			if(isExtensionValid(fileSuffix)) {
				File userProfileLocation = new File(rootDirectoryPath + File.separator + user + File.separator + "Profile" + File.separator + ProfilePictureName);				
				BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(userProfileLocation));
				stream.write(byteArray);
	            stream.close();			
			}
			else {
				LOGGER.error("File extension is not supported");
			}
		} 
		catch(IOException ioException) {
			LOGGER.error("IOException: " + ioException.getMessage());
		}
		catch(Exception exception) {
			LOGGER.error("Exception: " + exception.getMessage());
		}
	}
	
	/**
	 * Get the user profile picture
	 * @param user
	 * @return userProfilePicturePath
	 */
	public static String getUserProfilePicture(String user) {
		
		String userProfilePictureDrivePath = FileLoaderConstants.EMPTY_STRING;			
		String userProfilePicturePath = FileLoaderConstants.DEFAULT_PROFILE_PICTURE;
		
		userProfileDirectory = new File(getRootDirectoryPath() + File.separator + user + File.separator + "Profile");
		
		try {
			File[] userProfilePictureList = userProfileDirectory.listFiles();
			
			File userProfilePicture = userProfilePictureList[0];
			
			if(userProfilePicture.length() == 0) {
				return userProfilePictureDrivePath;
			}
			
			URI userProfilePictureURI = userProfilePicture.toURI();		
			userProfilePictureDrivePath = userProfilePictureURI.getPath();
			int rootDirectoryIndex = userProfilePictureDrivePath.indexOf(FileLoaderConstants.VIRTUAL_FOLDER);
			userProfilePicturePath = userProfilePictureDrivePath.substring(rootDirectoryIndex);
			userProfilePicturePath = FileLoaderConstants.ROOT_FOLDER + userProfilePicturePath;
		}
		catch(Exception exception) {			
			LOGGER.error("Exception: " + exception.getMessage());
			return userProfilePicturePath;
		}
		
		LOGGER.info("User Profile Picture Path: " + userProfilePicturePath);
		return userProfilePicturePath;	
	}

}
