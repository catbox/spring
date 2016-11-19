package com.helloCropper.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.helloCropper.Constants.ControllerConstants;
import com.helloCropper.Constants.FileLoaderConstants;
import com.helloCropper.Constants.Pages;
import com.helloCropper.utilities.FileLoader;

@Controller(ControllerConstants.FileController)
public class FileController {
	/*
	@Autowired
	@Qualifier("profilePictureValidator")
	ProfilePictureValidator validator;
	
	@ModelAttribute("profileImageModel")
	public ProfileImage getProfileImageModel() {
		return new ProfileImage();
	}
	
	@InitBinder
	private void initBinder(WebDataBinder binder) {
		binder.setValidator(validator);
	}
	*/
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public @ResponseBody ModelAndView LandingPage(HttpServletRequest request) {
		
		HttpSession session = request.getSession();		
		session.setAttribute("userid", "Samba-24032014000000");
	    session.setAttribute("username", "Samba");
		
	    String userName = (String)session.getAttribute("username");
	    String userProfilePicture = FileLoader.getUserProfilePicture(userName);

		Map<String, Object> model = new HashMap<String, Object>();
		
		model.put(FileLoaderConstants.PROFILE_PICTURE, userProfilePicture);

		return new ModelAndView(Pages.PROFILE_PAGE, model);
	}
	
	@RequestMapping(value ="/ProfilePictureEditor", method = RequestMethod.GET)
	public String ProfilePictureEditor() {
		return Pages.CROPPER_PAGE;
	}
	
	@RequestMapping(value ="/Profile", method = RequestMethod.GET)
	public String Profile() {
		return Pages.PROFILE_PAGE;
	}
		
	@RequestMapping(value = "/loadProfilePicture", method = RequestMethod.POST)
	public @ResponseBody String loadProfilePicture(@RequestParam("file") MultipartFile file) {
		try {
			FileLoader.uploadUserProfilePicture("Samba", file);
		}
		catch(Exception exception) {
			System.out.println("Profile Picture Upload Error: " + exception.getMessage());
		}	
		return "redirect:/";
	}
	
}