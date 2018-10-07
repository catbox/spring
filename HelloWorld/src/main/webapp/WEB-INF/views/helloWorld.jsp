<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<head>
<title>Hello World</title>
</head>

<body>	
	<h1 id="helloWorld"></h1>
	<h3 id="welcome"></h3>
    <p>First name <input id="firstName" type="text" name="firstname"></p>  	
  	<p>Last name <input id="lastName" type="text" name="lastname"></p>  	
	<a id="sayHello" href="/HelloWorld/sayHello">Greeting</a>	
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
