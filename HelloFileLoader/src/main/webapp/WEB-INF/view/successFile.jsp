<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>File Loader</title>
</head>

<body>
<h2>File Loader</h2>
Your file <b style="color:red">${fileName}</b> was successfully uploaded!
<br><br>
<form action="/HelloFileLoader/" method="get">
    <button id="back-btn" type="submit">Load Another File</button>
</form>
</body>
</html>