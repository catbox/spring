package com.helloFileLoader.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.helloFileLoader.model.File;
import com.helloFileLoader.utilities.FileLoader;
import com.helloFileLoader.validator.FileValidator;

@Controller
public class FileController {

	@Autowired
	@Qualifier("fileValidator")
	FileValidator validator;
	
	@ModelAttribute("fileModel")
	public File getFileModel() {
		return new File();
	}

	@InitBinder
	private void initBinder(WebDataBinder binder) {
		binder.setValidator(validator);
	}

	/** Load file loader page **/
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String fileLoaderPage() {
		return "file";
	}

	@RequestMapping(value = "/loadProfile", method = RequestMethod.POST)
	public ModelAndView fileUploaded(@Valid @ModelAttribute("fileModel") File file, BindingResult result, ModelMap model) {
		
		String returnVal = "successFile";
		
		if(result.hasErrors()) {
			returnVal = "file";
		} 
		else {			
			MultipartFile multipartFile = file.getFile();
			
			String fileName = multipartFile.getOriginalFilename();
			model.addAttribute("fileName", fileName);
			
			FileLoader.uploadUserProfileImage("Gerald", multipartFile);
		}
		return new ModelAndView(returnVal, model);
	}
}