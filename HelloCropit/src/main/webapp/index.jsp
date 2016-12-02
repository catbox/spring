<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">     
    <title>CropIt</title>
    <link href="resources/css/bootstrap.min.css" rel="stylesheet" type="text/css">	
	<link href="resources/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	<link href="resources/css/cropIt.css" rel="stylesheet" type="text/css">
</head>

<%
    response.setHeader("Cache-Control", "no-cache"); // Request a new copy of the page from the server
    response.setHeader("Cache-Control", "no-store"); // Prevent page storing
    response.setDateHeader("Expires", -1);           // Set the browser cache to mark this page as stale
    response.setHeader("Pragma", "no-cache");        // HTTP 1.0 backward compatibility
%>

<body>
<div id="cropit-content" class="container">
	<div class="row">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
  			<div id="cropit-panel" class="panel panel-info">
            	<div class="panel-body"> 
  					<div class="image-editor">
  				  
						<div class="row">
							<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
								<div class="cropit-preview"></div>
							</div>
						</div>
				
						<div class="row">
			       			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			           			<img id="cropitimage" src="">
			       			</div>
			   			</div>
				
						<div class="row">
				            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
				                <label id="cropit-select-btn" class="btn" for="inputImage">
				                     Update profile picture<input id="inputImage" class="cropit-image-input" type="file">
				                </label>                                  
				            </div>
			            </div>
                
			            <div class="row">
							<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
			    				<button id="cropit-sm-img" class="btn"><i class="fa fa-file-image-o inline" aria-hidden="true"></i></button>
								<input type="range" class="cropit-image-zoom-input inline">
			    				<button id="cropit-lg-img" class="btn"><i class="fa fa-file-image-o fa-2x inline" aria-hidden="true"></i></button>
							</div>
						</div>
				
						<div class="row">
							<div class="col-xs-12 col-sm-8 col-md-8 col-lg-4">
			   					<button id="cropit-rotate-ccw-btn" class="btn btn-primary rotate-ccw fa fa-undo cropit-btn-space" aria-hidden="true"></button>
					    		<button id="cropit-rotate-cw-btn" class="btn btn-primary rotate-cw fa fa-repeat cropit-btn-space" aria-hidden="true"></button>
			   					<button id="cropit-save-btn" class="btn btn-primary export fa fa-floppy-o cropit-btn-space" aria-hidden="true"></button>
			   					<button id="cropit-close-btn" class="btn btn-primary fa fa-window-close-o cropit-btn-space" aria-hidden="true"></button>
			   				</div>
			   			</div>
   					</div>
 				</div>
 			</div>
    	</div>
    </div>	
</div>
<!-- JavaScript -->
<script src="resources/js/jquery-1.11.2.min.js"></script>
<script src="resources/js/bootstrap.min.js"></script>
<script src="resources/js/jquery.cropit.js"></script>
<script src="resources/js/cropIt.js"></script>
<script>
	// Function to execute as soon as  the DOM is fully loaded.
    $(document).ready(function() {
    	cropIt.setUp();  	
    });
</script>
</body>

</html>