var emailObj = {
		
		// Events Handling
		EventsHandler:function() {
			// First Name field focus
			$("#firstName").focus(function() {
				if($("#login-form-validation-server-errors").length > 0) {
					LoginFormObj.ClearBackEndErrorMessage();
				}				
			});
			
			// Last Name field focus
			$("#lastName").focus(function() {
				if($("#login-form-validation-server-errors").length > 0) {
					LoginFormObj.ClearBackEndErrorMessage();
				}				
			});
			
			// Email address field focus
			$("#emailAddress").focus(function() {
				if($("#login-form-validation-server-errors").length > 0) {
					LoginFormObj.ClearBackEndErrorMessage();
				}				
			});
			
		},
		
		// Clear back-end Error message
		ClearBackEndErrorMessage:function() {
			$("#login-form-validation-server-errors").remove();
		},
		
		// Email Address validation
		EmailAddressValidation:function() {

			// Email Address validation
			$.validator.addMethod("emailAddressValidation", function() {
				//  Get the email address from the submitted login form
				var emailAddress = $("#emailAddress").val();

			   	// Valid email address pattern
				var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
				
				if(emailPattern.test(emailAddress)) {
					return true;
				}
				else {
					return false;
				}

			});
		},
		
		// Send email form validation rules
		LoginValidation:function(array) {
			$("#loginForm").validate({
				errorContainer:$('#login-form-validation-errors'),
				errorLabelContainer:$('ul', '#login-form-validation-errors'),
				wrapper:'li',
				rules: {
					firstName: {
						required:true
					},
					lastName: {
						required:true
					},
					emailAddress: {						
						required:true,
						emailAddressValidation:true
					}
				},
				messages: {	
					fistName: {
						required:array[0]
					},
					lastName: {
						required:array[1]
					},
					emailAddress: {	
						 required:array[2],
						 emailAddressValidation:array[3]
					}
				}
			});
		},
		
		// Send Email
		sendEmail:function() {
			$("#emailForm").submit(function() {
				
				var valid = $("#emailForm").valid();
				
				if(valid) {
					 $(this).ajaxSubmit();
					 return true;	
				}
				else {
					return false;
				}
			});
		}
		
}