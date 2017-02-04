<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">     
    <title><spring:message code="label.title"/></title>
    <link href="resources/css/bootstrap.min.css" rel="stylesheet" type="text/css">	
	<link href="resources/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	<link href="resources/css/sendemail.css" rel="stylesheet" type="text/css">
</head>

<%	
	response.setHeader("Cache-Control","no-cache");	// Request a new copy of the page from the server
	response.setHeader("Cache-Control","no-store"); // Prevent page storing
	response.setDateHeader("Expires", 0); 			// Set the browser cache to mark this page as stale
	response.setHeader("Pragma","no-cache"); 		// HTTP 1.0 backward compatibility
%>

<body>
    <noscript><h1><spring:message code="label.noscript"/></h1></noscript>

<div id="cropit-content" class="container no-copy">
	<div class="row">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
		    <!-- Email Form -->
			<form id="emailForm" method="post" action="/sendWebEmailVelocity/sendEmail" modelAttribute="emailForm">
				<div class="row">
					
					<div class="row">
						<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
							<p><a href="?language=en"><spring:message code="label.english"/></a> <a href="?language=fr"><spring:message code="label.french"/></a></p>
					    	<h1><spring:message code="label.titleHeader"/></h1>
					    	
					    	<!-- Display Errors from Client Validation -->
							<div id="email-form-validation-errors"><ul><!-- errors --></ul></div>
							
							<!-- Display Errors from Server Form Validation -->				
							<c:if test="${fieldErrors > 0}">
								<div id="email-form-validation-server-errors">
									<p><spring:message code="email.backend.invalidData"/></p>
								</div>
							</c:if>
							
							<!-- Display the result of sending the email -->							
							<c:choose>
							    <c:when test="${emailSent == 'EMAIL_SENT_SUCCESS'}">
							    	<div class="alert alert-success">
										<p>Your invitation was successfully sent.</p>
									</div>
							    </c:when>
							    
							    <c:when test="${emailSent == 'EMAIL_SENT_FAILED'}">
							    	<div class="alert alert-danger">
										<p>Your invitation failed to be sent.</p>
									</div>
							    </c:when>
							    
							</c:choose>
							
							
			        	</div>
			        </div>			        
			        <br>
			        
			        <div class="row">
						<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
					        <!-- First Name -->
					        <label for="firstName" class="sr-only"><spring:message code="label.email.firstname"/></label>
					        <input id="firstName" name="firstName" type="text" class="form-control" placeholder='<spring:message code="label.email.firstname"/>' value='${emailForm.firstName}' required>
			        	</div>
			        </div>			        
			        <br>
			        
			        <div class="row">
						<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
					        <!-- Last Name -->
					        <label for="lastName" class="sr-only"><spring:message code="label.email.lastname"/></label>
					        <input id="lastName" name="lastName" type="text" class="form-control" placeholder='<spring:message code="label.email.lastname"/>' value='${emailForm.lastName}' required>
			        	</div>
			        </div>			        
			        <br>
			        
			        <div class="row">
						<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
					        <!-- Email Address -->
					        <label for="emailAddress" class="sr-only"><spring:message code="label.email.emailaddress"/></label>
					        <input id="emailAddress" name="emailAddress" type="text" class="form-control" placeholder='<spring:message code="label.email.emailaddress"/>' value='${emailForm.emailAddress}' required>
			        	</div>
			        </div>
			        <br>
			        
			        <div class="row">
						<div class="col-xs-4 col-sm-2 col-md-2 col-lg-2">
					        <!-- Send email -->
					        <div id="send-email">
					        	<button class="btn btn-lg btn-primary btn-block" type="submit"><spring:message code="label.email.sendemail"/></button>
							</div>
						</div>
						
						<div class="col-xs-4 col-sm-2 col-md-2 col-lg-2">
							<div id="cancel-email">
					        	<button class="btn btn-lg btn-primary btn-block" type="reset"><spring:message code="label.email.cancel"/></button>
							</div>
						</div>
			        </div>
				</div>		
			</form>
		</div>
	</div>
</div>

<!-- JavaScript -->
<script src="resources/js/jquery-1.11.2.min.js"></script>
<script src="resources/js/bootstrap.min.js"></script>
<script src="resources/js/jquery.validate.min.js"></script>
<script src="resources/js/jquery.form.js"></script>
<script src="resources/js/email.js"></script>
<script type="text/javascript">
	// Function to execute as soon as  the DOM is fully loaded.
	$(document).ready(function() {
		var EmailMessageArray = new Array();
		EmailMessageArray[0] = '<spring:message code="email.firstName.notEmpty"/>';
		EmailMessageArray[1] = '<spring:message code="email.lastName.notEmpty"/>';
		EmailMessageArray[2] = '<spring:message code="email.notEmpty.emailAddress"/>';
		EmailMessageArray[3] = '<spring:message code="email.format.emailAddress"/>';
		emailObj.SetUp(EmailMessageArray);
	});
</script>
	   
</body>
</html>
