var emailObj = {
		
		SetUp:function(array) {
			this.EventsHandler();
			this.EmailAddressValidation();
			this.SendEmailValidation(array);
			this.sendEmail();
			
		},
		
		// Events Handling
		EventsHandler:function() {
			// Clear front-end error message
			$("#cancel-email").click(function() {
				if($("#email-form-validation-errors").length > 0) {
					$("#email-form-validation-errors").css('display', 'none');
					$("#firstName").removeClass("error");
					$("#lastName").removeClass("error");
					$("#emailAddress").removeClass("error");
				}
				
				// Clear back-end error message
				if($("#email-form-validation-server-errors").length > 0) {
					$("#email-form-validation-server-errors").css('display', 'none');
					$.ajax({type:"GET", url:"/sendWebEmailVelocity"
					}).done(function(data) {
						window.location.href = window.location.origin + "/sendWebEmailVelocity/";
					}).fail(function() {
						var errorMessage = "Cancellation failed";
						alert(errorMessage)
					}).always(function() {
						// Do nothing.
					});
				}

			});

			// Clear back-end error message. First Name field focus
			$("#firstName").focus(function() {
				if($("#email-form-validation-server-errors").length > 0) {
					emailObj.ClearBackEndErrorMessage();
				}				
			});
			
			// Clear back-end error message. Last Name field focus
			$("#lastName").focus(function() {
				if($("#email-form-validation-server-errors").length > 0) {
					emailObj.ClearBackEndErrorMessage();
				}				
			});
			
			// Clear back-end error message. Email address field focus
			$("#emailAddress").focus(function() {
				if($("#email-form-validation-server-errors").length > 0) {
					emailObj.ClearBackEndErrorMessage();
				}				
			});
		},

		// Clear back-end error message
		ClearBackEndErrorMessage:function() {
			$("#email-form-validation-server-errors").css('display', 'none');;
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
		SendEmailValidation:function(array) {
			$("#emailForm").validate({
				errorContainer:$('#email-form-validation-errors'),
				errorLabelContainer:$('ul', '#email-form-validation-errors'),
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