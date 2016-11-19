/**
 * Project: Wishive
 * Folder: resources/js
 * File: login.js
 * Description: JS event handler and validator for the Login Page
 * Author: Noah
 */

var LoginFormObj = {
		
		// Initialize
		Initialize:function(array) {
			this.EventsHandler();
			this.CustomizedValidation();
			this.LoginValidation(array);
			this.Login();
		},
		
		// Events handling
		EventsHandler:function() {
			// Email address field focus
			$("#emailAddress").focus(function() {
				if($("#login-form-validation-server-errors").length > 0) {
					LoginFormObj.ClearBackEndErrorMessage();
				}				
			});
			// Password field focus
			$("#password").focus(function() {
				if($("#login-form-validation-server-errors").length > 0) {
					LoginFormObj.ClearBackEndErrorMessage();
				}
			});
		},
		
		// Clear back-end Error message
		ClearBackEndErrorMessage:function() {
			$("#login-form-validation-server-errors").remove();
		},
		
		// Customized validation
		CustomizedValidation:function() {
			// Email address validation
			$.validator.addMethod("emailAddressValidation", function() {
				//  Get the email address from the submitted login form
				var emailAddress = $("#emailAddress").val();

			    /**
			     	An email address is made up of a Local Part (LP), an @ symbol, then the Fully Qualified Domain Name (FQDN).
			     	The FQDN is composed of all the Domain Levels (DL) and the Top Level Domain (TLD).
			     	The TLD can be Country Code Top Level Domain (CCTLD) or a Generic Top Level Domain (GTLD).
			     	
				    1) Local Part: [a-zA-Z0-9._-] states that the characters must begin with alpha-numeric characters (lower case and/or upper case characters) 
				       and may be followed by periods, underscores and hyphens. The Local Part which usually designates the user name.
	
					2) @ symbol: There must be a "@" symbol between the Local Part and the Fully Qualified Domain Name.
	
					3) Domain Levels: [a-zA-Z0-9.-] states that there must be some alpha-numeric characters (lower case and/or upper case characters) 
					   and may be followed by periods and hyphens.
	
					4) Top Level Domain: [a-zA-Z]{2,} states that there must be some alpha characters (lower case and/or upper case characters) of at least 2 characters.
					   [a-zA-Z]{2,4}$/ would be TLDs such as ca, com, info.
					   
					5) ^ symbol: The start of line.
					
					6) $ symbol: The end of line.
	
					7) It is erroneous to believe that the maximum length of an email address is 320 characters given 64 characters for the LP, 1 character for the "@" and 255 characters for the FQDN.		
					
					8) According to RFC 2821 - Errata ID: 1690 (http://www.rfc-editor.org/errata_search.php?rfc=2821&eid=1690), the maximum length for an email address is 254 characters.
			     */
		
				// Valid email address pattern
				var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
				
				if(emailPattern.test(emailAddress)) {
					return true;
				}
				else {
					return false;
				}

			});
			
			// Password Validation
			$.validator.addMethod("passwordValidation", function() {
				// Get the password from the submitted login form
				var password = $("#password").val();
				
				// Valid password pattern
				var passwordPattern = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%])).{5,20}$/;
				
				if(passwordPattern.test(password)) {
					return true;
				}
				else {
					return false;
				}

			});
		},
		
		// Form validation rules
		LoginValidation:function(array) {
			$("#loginForm").validate({
				errorContainer:$('#login-form-validation-errors'),
				errorLabelContainer:$('ul', '#login-form-validation-errors'),
				wrapper:'li',
				rules: {
					emailAddress: {						
						required:true,
						emailAddressValidation:true
					},	
					password: {
						required:true,
						passwordValidation:true
					},
				},
				messages: {			
					emailAddress: {	
						 required:array[0],
						 emailAddressValidation:array[1]
					},
					password: {
						required:array[2],
						passwordValidation:array[3]
					}
				}
			});
		},
		
		// Submit post
		Login:function() {
			$("#loginForm").submit(function() {
				
				var valid = $("#loginForm").valid();
				
				if(valid) {
					 $(this).ajaxSubmit();
					 return true;	
				}
				else {
					return false;
				}
			});
		},
	
};