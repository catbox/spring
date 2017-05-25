<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Expires" content="-1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>Profile</title>
    <link href="resources/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="resources/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="resources/css/common.css" rel="stylesheet" type="text/css">
    <link href="resources/css/profile.css" rel="stylesheet" type="text/css">
    <!-- BrowserSync target script: IP Address should the one of the development machine -->
    <!-- <script src="http://XXX.XXX.XXX.XXX:8080/target/target-script-min.js#browsersync"></script> -->
    <script type="text/javascript">    
	 	// Prevent caching
		$.ajaxSetup({
			cache:false
		});
	</script>
</head>

<%
    response.setHeader("Cache-Control", "no-cache"); // Request a new copy of the page from the server
    response.setHeader("Cache-Control", "no-store"); // Prevent page storing
    response.setDateHeader("Expires", -1);           // Set the browser cache to mark this page as stale
    response.setHeader("Pragma", "no-cache");        // HTTP 1.0 backward compatibility
%>

<body>
<!-- Profile Page -->
<div id="profile-content" class="container no-copy">
    <!-- Preview new profile image -->
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="panel panel-info picedit-preview-panel">
                <div class="row">
                    <div class="col-xs-11 col-sm-3 col-md-3 col-lg-3">
                        <a id="profile" href="/HelloCropit/ProfilePictureEditor">
                            <img id="profileImg" class="profile-viewer" src='${profilePicture}' alt="Profile Picture">
                        </a>
                    </div>
                 </div>  
             </div>
        </div>   
    </div>
</div>

<!-- JavaScript -->
<script src="resources/js/jquery-1.11.2.min.js"></script>
<script src="resources/js/bootstrap.min.js"></script>
<script src="resources/js/Profile.js"></script> 
<script type="text/javascript">
    // Function to execute as soon as  the DOM is fully loaded.
    $(document).ready(function() {   	
    	profile.setUp();
    });
</script>

</body>
</html>