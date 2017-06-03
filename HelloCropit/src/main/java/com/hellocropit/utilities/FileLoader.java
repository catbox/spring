package com.hellocropit.utilities;

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

import com.hellocropit.constants.FileLoaderConstants;


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

	/**
	 * Creates the root directory for all users
	 */
	public static void createRootDirectory() {
		
		try {		
			if(!rootDirectoryExist()) {
				rootDirectory.mkdir();
				System.out.println("Directory was created at: " + rootDirectory.getAbsolutePath());
			}
			else {
				System.out.println("Directory already exists at: " + rootDirectory.getAbsolutePath() + " *** Directory not created!");
			}
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
		
		if(!userDirectoryExist(userRootDirectory)) {
			userDirectory.mkdir();
			System.out.println("User directory was created at: " + userDirectory.getAbsolutePath());
		}
		else {
			System.out.println("User directory already exists at: " + userDirectory.getAbsolutePath() + " *** Directory not created!");
		}
		
		createUserProfileDirectory(userRootDirectory);
	}
	
	/**
	 * Create the user's profile directory
	 * @param userRootDirectory
	 */
	public static void createUserProfileDirectory(String userRootDirectory) {
		
		userProfileDirectory = new File(rootDirectoryPath + File.separator + userRootDirectory + File.separator + "Profile");
		
		if(!userProfileDirectory.exists()) {
			userProfileDirectory.mkdir();
			System.out.println("User profile directory was created at: " + userProfileDirectory.getAbsolutePath());
		}
		else {
			try {
				FileUtils.cleanDirectory(userProfileDirectory);
				System.out.println("User profile directory already exists at: " + userProfileDirectory.getAbsolutePath() + " *** Profile Directory not created!");
			} 
			catch(IOException ioException) {
				System.out.println("Error cleaning user profile directory: " + ioException.getMessage());
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
			System.out.println("FileNotFoundException: " + fileNotFoundException.getMessage());
			return FileLoaderConstants.EMPTY_STRING;
		}		
		catch(IOException ioException) {
			System.out.println("IOException: " + ioException.getMessage());
			return FileLoaderConstants.EMPTY_STRING;
		}		
		catch(Exception exception) {
			System.out.println("Exception: " + exception.getMessage());
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
			userProfilePicturePath = FileLoaderConstants.DEFAULT_PROFILE_PICTURE;
			return userProfilePicturePath;
		}
		
		return userProfilePicturePath;	
	}

}
