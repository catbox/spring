package com.sendwebemailvelocity.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;

import com.sendwebemailvelocity.form.EmailForm;
import com.sendwebemailvelocity.form.converter.EmailFormConverter;

@Controller("sendWebEmailVelocityContoller")
@SessionAttributes("emailForm")
public class sendWebEmailVelocityContoller {
	
	@Autowired
	EmailFormConverter emailFormConverter;
	
	@ModelAttribute("emailForm")
	public EmailForm getEmailForm() {
		return new EmailForm();
	}
	
	/** Load the login page **/
	@RequestMapping(value = "/", method = RequestMethod.GET)
    public String loadEmailPage() {
		// Go to the login page
		return "email";
    }
	
	/** Send Web Email Velocity controller **/
	@RequestMapping(value = "/sendEmail", method = RequestMethod.POST)
	public ModelAndView login(@Valid @ModelAttribute("emailForm") EmailForm loginForm, BindingResult result, ModelMap model) {
		
		// Verify for errors that could have happened during the binding
		if(result.hasErrors()) {
	    	return new ModelAndView("email");
	    }
		// Stay at the login form
		return new ModelAndView("email");		
	}

}
