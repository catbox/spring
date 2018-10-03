<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<head>
<title>Login</title>
</head>

<body>	
    <form:form method="post" action="/HelloWorld/login" modelAttribute="loginForm">
        <table>
            <tr>
                <td><form:label path="firstName"><strong>First Name</strong></form:label></td>
                <td><form:input path="firstName"/></td>
                <td><font color="red"><form:errors path="firstName"></form:errors></font></td>
            </tr>
            <tr>
                <td><form:label path="lastName"><strong>Last Name</strong></form:label></td>
                <td><form:input path="lastName"/></td>
                <td><font color="red"><form:errors path="lastName"></form:errors></font></td>
            </tr>
            <tr>
                <td><input type="submit" value="Login"/></td>
            </tr>
        </table>
    </form:form>      
</body>
</html>
