<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Welcome</title>
</head>

<body>
	<h1 id="helloWorld"></h1>
	<h3 id="sayHello"></h3>
	<p>First Name: ${firstName}</p>
    <p>Last Name: ${lastName}</p>
    <a href="/HelloWorld/login">Logout</a>
    
    <!-- javascript -->
    <script src="resources/js/jquery-1.11.2.min.js"></script>
    <script src="resources/js/greetings.js"></script> 
    
    <script type="text/javascript">
		$(document).ready(function() {
			greetings.setUp();
			// The function sayHello() can be called by the following statement:
			// greetings.sayHello();
		});
	</script>
</body>  
</html> 