<%-- 
Project: Wishive
Folder: view
File: home.jsp
Description: Page that shows the application once the user has successfully logged in.
Author: Noah
--%>

<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title><spring:message code="label.title.bonjour"/></title>
</head>

<body>

     <h2><spring:message code="message.greeting"/></h2>

     <p>FirstName: ${firstName}</p>
     <p>LastName: ${lastName}</p>

     <a href="/Hello/login">Logout</a>	
</body>  
</html> 