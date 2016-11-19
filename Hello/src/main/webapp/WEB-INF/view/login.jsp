<%-- 
Project: Wishive
Folder: view
File: login.jsp
Description: Page that prompts the user to enter its credentials.
Author: Noah
--%>

<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<head>
<title><spring:message code="label.title"/></title>
</head>

<body>
    
	<p><spring:message code="label.language"/><a href="?language=en"><spring:message code="label.english"/></a> <a href="?language=fr"><spring:message code="label.french"/></a></p>
	
    <form:form method="post" action="/Hello/login" modelAttribute="loginForm">
        <table>
            <tr>
                <td><form:label path="firstName"><strong><spring:message code="label.firstName"/></strong></form:label></td>
                <td><form:input path="firstName"/></td>
                <td><font color="red"><form:errors path="firstName"></form:errors></font></td>
            </tr>
            <tr>
                <td><form:label path="lastName"><strong><spring:message code="label.lastName"/></strong></form:label></td>
                <td><form:input path="lastName"/></td>
                <td><font color="red"><form:errors path="lastName"></form:errors></font></td>
            </tr>
            <tr>
                <spring:message code="label.submit" var="labelSubmit"></spring:message>
                <td><input type="submit" value="${labelSubmit}"/></td>
            </tr>
        </table>
    </form:form>
         
</body>
</html>
