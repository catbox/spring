<%-- 
Project: Wishive
Folder: view
File: sessionExpired.jsp
Description: Page that tells the user that the session has expired.
Author: Noah
--%>

<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title><spring:message code="label.title.session.expired"/></title>
</head>

<body>
	<h1><spring:message code="message.session.expired"/></h1>
	<a href="/Hello/login"><spring:message code="message.session.expired.sign.in"/></a>	
</body>
</html>