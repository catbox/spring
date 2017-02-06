package com.sendwebemailvelocity.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
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
import com.sendwebemailvelocity.model.Receiver;
import com.sendwebemailvelocity.model.Sender;
import com.sendwebemailvelocity.service.SendEmail;
import com.sendwebemailvelocity.validation.ValidationMessages;

@Controller("sendWebEmailVelocityContoller")
@SessionAttributes("emailForm")
public class sendWebEmailVelocityContoller {
	
	@Autowired
	EmailFormConverter emailFormConverter;
	
	@Autowired
	SendEmail sendEmail;
	
	@Autowired
	private MessageSource messageSource;
	
	private ModelMap emailModel;
	
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
			
			// Save the model
			emailModel = model;
			
			// Stay at the send email form
			return new ModelAndView("email", model);
	    }
		else {
			// Email subject
			String emailSubject = messageSource.getMessage("label.email.subject", null, null);
			
			// Sender
			Sender sender = new Sender();
			sender.setFirstName("Coco");
			sender.setLastName("LeKat");
			sender.setEmailAddress("cocolekat@gmail.com");
			sender.setEmailSubject(emailSubject);
			sender.setEmailAddressDestination(loginForm.getEmailAddress());

			// Receiver
			Receiver receiver = new Receiver();
			receiver.setFirstName(loginForm.getFirstName());
			receiver.setLastName(loginForm.getLastName());
			receiver.setEmailAddress(loginForm.getEmailAddress());
			
			boolean emailSent = sendEmail.mailSender(sender, receiver);
			
			if(emailSent) {
				model.addAttribute(ValidationConstants.EMAIL_SENT, ValidationMessages.EMAIL_SENT_SUCCESS);
			}
			else {
				model.addAttribute(ValidationConstants.EMAIL_SENT, ValidationMessages.EMAIL_SENT_FAILED);
			}
			
			// Save the model
			emailModel = model;
			
			// Stay at the send email form
			return new ModelAndView("email", model);	
		}			
	}
	
	// Change language
	@RequestMapping(value = "/sendEmail", method = RequestMethod.GET)
	public ModelAndView changeLanguage() {
		return new ModelAndView("email", emailModel);
	}
	
}
