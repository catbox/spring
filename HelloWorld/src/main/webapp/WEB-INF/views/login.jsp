<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<head>
<title>home</title>
</head>

<body>	
	<h1 id="helloWorld"></h1>
	<h3 id="welcome"></h3>
    <p>First name:</p>
  	<input id="firstName" type="text" name="firstname">
  	<br>
  	<p>Last name:</p>
  	<input id="lastName" type="text" name="lastname">
  	<br><br>
	<a id="sayHello" href="/HelloWorld/login">Greeting</a>
	
	<button id="sayHello" type="button">Say Hello</button> 
	
    <!-- javascript -->
    <script src="resources/js/jquery-1.11.2.min.js"></script>
    <script src="resources/js/greeting.js"></script> 
    
    <script type="text/javascript">
		$(document).ready(function() {
			greeting.setUp();
		});
	</script>      
</body>
</html>
