<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
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
</head>

<body>
    <noscript><h1><spring:message code="label.noscript"/></h1></noscript>

<div id="cropit-content" class="container no-copy">
	<div class="row">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
		    <!-- Email Form -->
			<form id="emailForm" method="post" action="/sendEmail" modelAttribute="emailForm">
				<div class="row">
					<p><a href="?language=en"><spring:message code="label.english"/></a> <a href="?language=fr"><spring:message code="label.french"/></a></p>
			    	<h1><spring:message code="label.titleHeader"/></h1>
			    	
			    	<!-- Display Errors from Client Validation -->
					<div id="email-form-validation-errors"><ul><!-- errors --></ul></div>
			        
			        <div class="row">
						<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
					        <!-- First Name -->
					        <label for="firstName" class="sr-only"><spring:message code="label.email.firstname"/></label>
					        <input id="firstName" name="firstName" type="text" class="form-control" placeholder='<spring:message code="label.email.firstname"/>' value='${firstName}' required>
			        	</div>
			        </div>			        
			        <br>
			        
			        <div class="row">
						<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
					        <!-- Last Name -->
					        <label for="lastName" class="sr-only"><spring:message code="label.email.lastname"/></label>
					        <input id="lastName" name="lastName" type="text" class="form-control" placeholder='<spring:message code="label.email.lastname"/>' value='${lastName}' required>
			        	</div>
			        </div>			        
			        <br>
			        
			        <div class="row">
						<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
					        <!-- Email Address -->
					        <label for="emailAddress" class="sr-only"><spring:message code="label.email.emailaddress"/></label>
					        <input id="password" name="password" type="password" class="form-control" placeholder='<spring:message code="label.email.emailaddress"/>' value='${emailAddress}' required>
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
		var LoginMessageArray = new Array();
		EmailMessageArray[0] = '<spring:message code="email.firstName.notEmpty"/>';
		EmailMessageArray[1] = '<spring:message code="email.lastName.notEmpty"/>';
		EmailMessageArray[2] = '<spring:message code="email.notEmpty.emailAddress"/>';
		EmailMessageArray[3] = '<spring:message code="email.format.emailAddress"/>';
		emailObj.Initialize(EmailMessageArray);
	});
</script>
	   
</body>
</html>
