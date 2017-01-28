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

import com.sendwebemailvelocity.constants.Constants;
import com.sendwebemailvelocity.constants.ValidationConstants;
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
	
	/** Load the email page **/
	@RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView loadEmailPage() {		
		EmailForm emailForm = new EmailForm(Constants.EMPTY_STRING, Constants.EMPTY_STRING, Constants.EMPTY_STRING);
		return new ModelAndView("email", "emailForm", emailForm);
    }
	
	/** Send Web Email Velocity controller **/
	@RequestMapping(value = "/sendEmail", method = RequestMethod.POST)
	public ModelAndView sendEmail(@Valid @ModelAttribute("emailForm") EmailForm loginForm, BindingResult result, ModelMap model) {
		// Verify for errors that could have happened during the binding
		if(result.hasErrors()) {
			int errorCount = result.getErrorCount();
			
			if(errorCount > 0) {
				String numberOfErrors = String.valueOf(errorCount);			
				model.addAttribute(ValidationConstants.FIELD_ERRORS, numberOfErrors);		
			}
			// Stay at the send email form
			return new ModelAndView("email", model);
	    }
		else {
			// Stay at the send email form
			return new ModelAndView("email", model);	
		}			
	}

}
