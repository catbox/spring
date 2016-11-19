<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<title>File Loader</title>
<link rel="icon" href="resources/icons/favicon.ico">
<link href="resources/css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="resources/css/cropper.css" rel="stylesheet" type="text/css">
<link href="resources/css/main.css" rel="stylesheet" type="text/css">
<link href="resources/css/common.css" rel="stylesheet" type="text/css">
<link href="resources/css/profile.css" rel="stylesheet" type="text/css">
</head>

<body>
<div class="container">
	<!-- Profile Image -->
	<div class="row">
		<div class="col-md-3 col-xs-12">
			<a id="profileAnchor" href="#">
				<img id="profileImg" src="/HelloFileLoader/resources/images/default-user.jpg" class="img-responsive" alt="Default User" width="285" height="285">
			</a>
		</div>
	</div>
	
	<!-- Profile Image Editor -->
	<div class="row">
		<div class="col-md-12 col-xs-12">
			<div id="profile-editor" class="pane-hidden">
				<%@include file="fileLoader.jsp"%>
			</div>
			<br>
		</div>
	</div>
	
	<!-- Profile Image Editor -->
	<div class="row">
		<div class="col-md-8 col-xs-12">
				<div class="row">
					<div class="col-md-3">
				        <div class="docs-preview clearfix">
				        	<div class="img-preview preview-lg"></div>
				        </div>
			      	</div>
				</div>
				
				<div class="row">
	      			<div class="col-md-12">
	        			<div class="img-container">
	          				<img src="/HelloFileLoader/resources/images/default-user.jpg" alt="Picture">
	        			</div>
	      			</div>
	    		</div>
		</div>
	</div>
	
	<!-- Basic Information -->
	<div class="row">
		<div class="col-md-8 col-xs-12">
			<h3>Basic Information</h3>
			<div class="panel panel-info">
				<table class="table">
			  		<tr>
					    <th>Alias</th>
					    <td>Lucifer Sam</td>
				  	</tr>
				  	<tr>
					    <th>Name</th>
					    <td>Samba The Kat</td>
				  	</tr>		  	
				  	<tr>
					    <th>Username</th>
					    <td>samba-the-kat</td>
				  	</tr>
				  	<tr>
					    <th>Date of Birth</th>
					    <td>18-09-1975</td>
				  	</tr>
				  	<tr>
					    <th>Gender</th>
					    <td>Female</td>
				  	</tr>
				</table>
		  	</div>
		</div>	
	</div>
	
	<!-- Contact Information -->
	<div class="row">
		<div class="col-md-8 col-xs-12">
			<h3>Contact Information</h3>
			<div class="panel panel-info">
				<table class="table">
					<tr>
					    <th>Email</th>
					    <td>samba.@gokat.com</td>
				  	</tr>
			  		<tr>
					    <th>Address</th>
					    <td>265 The Tremplin</td>
				  	</tr>
				  	<tr>
					    <th>Mobile Phone</th>
					    <td>(514) 123-4567</td>
				  	</tr>
				</table>
		  	</div>
	  	</div>
	</div>
	
	<!-- Clothing -->
	<div class="row">
		<div class="col-md-8 col-xs-12">
			<h3>Clothing</h3>
			<div class="panel panel-info">
				<table class="table">
			  		<tr>
					    <th>Dress Shirt</th>
					    <td>Medium</td>
				  	</tr>
				  	<tr>
					    <th>T-Shirt</th>
					    <td>Medium</td>
				  	</tr>
				</table>
		  	</div>
	  	</div>
	</div>
	
</div>

<!-- JavaScript -->
<script src="resources/js/jquery-1.11.2.min.js"></script>
<script src="resources/js/bootstrap.min.js"></script>
<script src="resources/js/cropper.js"></script>
<script src="resources/js/main.js"></script>
<script src="resources/js/fileloader.js"></script>
<script type="text/javascript">
	//Function to execute as soon as the DOM is fully loaded.
	$(document).ready(function() {
		FileLoaderObj.Initialize();	
	});
</script>
</body>
</html>