package com.hello.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.ModelAndView;

import com.hello.db.dao.PersonDAO;
import com.hello.db.transter.Person;
import com.hello.form.LoginForm;
import com.hello.form.converter.LoginFormConverter;

@Controller("HelloController")
@SessionAttributes("loginForm")
public class HelloController {
	
	@Autowired
	LoginFormConverter loginFormConverter;
	
	@Autowired
	PersonDAO personDAO;

	@ModelAttribute("loginForm")
	public LoginForm getLoginForm() {
		return new LoginForm();
	}
	
	/** Load the login page **/
	@RequestMapping(value = "/", method = RequestMethod.GET)
    public String loadLoginPage() {
		// Go to the login page
		return "login";
    }
	
	/** Login controller **/
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ModelAndView login(@Valid @ModelAttribute("loginForm") LoginForm loginForm, BindingResult result, ModelMap model) {
		
		// Verify for errors that could have happened during the binding
		if(result.hasErrors()) {
	    	return new ModelAndView("login");
	    }
		// Go to the home controller
		return new ModelAndView("redirect:/home", model);		
	}
	
	/** Home controller **/
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public ModelAndView goToHome(ModelMap model, SessionStatus sessionStatus) {
	
		// Retrieve the login form from the model
		LoginForm loginForm = (LoginForm)model.get("loginForm");
		//  Mark the current handler's session processing as complete, allowing for cleanup of session attributes.
		sessionStatus.setComplete();
		// Verify for expired session
		if(!loginForm.isValid()) {
			// Go to the session expired controller
			return new ModelAndView("redirect:/sessionExpired");
		}
		else {
			// Converts form data to a Person object
			Person person = loginFormConverter.convert(loginForm);	
			// Validate the person
			if(personDAO.isValid(person)) {
				model.addAttribute("firstName", person.getFirstName());
				model.addAttribute("lastName", person.getLastName());
				// Go to the home page
				return new ModelAndView("home", model);
			}
			else {
				// Go to the login page
				return new ModelAndView("login");
			}
		}
	}
	
	/** Logout Controller **/
	@RequestMapping(value = "/login", method = RequestMethod.GET)
    public String backToLogin(HttpServletRequest request) {
		
		// Get the session and save the user object
		HttpSession session = request.getSession();
		// Kill the session
		session.removeAttribute("Person");
		session.invalidate();
		// Go to the login page
		return "login";
	}
	
	/** Session Expired Controller **/
	@RequestMapping(value = "/sessionExpired", method = RequestMethod.GET)
    public String sessionExpired(HttpServletRequest request) {
		
		// Get the session and save the user object
		HttpSession session = request.getSession();
		// Kill the session
		session.removeAttribute("Person");
		session.invalidate();
		// Go to the session expired page
		return "sessionExpired";
	}
}
