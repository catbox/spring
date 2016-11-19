<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>File Loader</title>
</head>

<body> 
<h2>File Loader</h2>
<form:form method="POST" action="/HelloFileLoader/loadProfile" modelAttribute="fileModel" enctype="multipart/form-data">
	<p>File to upload: <input id="inputImage" type="file" name="file"/></p>
	<button type="submit">Upload</button>
	<br>
	<form:errors path="file" cssStyle="color: #ff0000;" />
</form:form>
</body>
</html>