<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>
<head>
<style>
table, th, td {
    border:1px solid black;
    border-collapse:collapse;
}
th, td {
    padding:5px;
}
</style>
<meta charset="utf-8">
<head>
<title>Hello JDBC</title>
</head>

<body>
	<h2>List of customers</h2>
	<table>
		<tr>
		    <th>Id</th>
		    <th>First Name</th>
		    <th>Last Name</th>
	    </tr> 
	    <c:forEach var="customers" items="${listOfCustomers}">
		    <tr>
		        <td>${customers.id}</td>
		        <td>${customers.firstname}</td>
		        <td>${customers.lastname}</td>  
		    </tr>
	    </c:forEach>             
	</table>
</body>
</html>