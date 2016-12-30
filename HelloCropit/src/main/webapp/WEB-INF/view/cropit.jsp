<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

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
<div id="cropit-content" class="container no-copy">
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
				
						<!-- 
						<div class="row">
			       			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			           			<img id="cropitimage" src="">
			       			</div>
			   			</div>
 						-->
 						
						<div class="row">
				            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
				                <label id="cropit-select-btn" class="btn" for="inputImage">
				                     <spring:message code="cropit.select.button"/><input id="inputImage" class="cropit-image-input" name="file" type="file" accept="image/*">
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
			   					<button id="cropit-cancel-btn" class="btn btn-primary fa fa-window-close-o cropit-btn-space" aria-hidden="true"></button>
			   				</div>
			   			</div>
			   			
			   			<!-- DEV ONLY -->
					    <div class="row">
					        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					            <div id="cropitTracker"></div>
					        </div>
					    </div>
			   			
			   			<!-- Display errors -->
		                <div class="row">
		                    <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
		                        <div id="cropit-alert" class="alert alert-danger fade in" style="display:none">
							       <a href="#" class="close" data-dismiss="alert">&times;</a>
								   <p id="cropit-alert-msg"></p>
				                </div>
		                    </div>
		                </div>
		                
   					</div>
 				</div>
 			</div>
    	</div>
    </div>
    
    <div id="cropit-modal" class="modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="modal" aria-labelledby="cropit-modal-label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">      
                    <h4 id="cropit-modal-label" class="modal-title"><spring:message code="cropit.profile.picture"/></h4>                 
                </div>
                <div class="modal-body">
                	<div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                           <h4><spring:message code="cropit.profile.picture.update"/></h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-offset-4 col-xs-8 col-sm-offset-4 col-sm-8 col-md-offset-4 col-md-8 col-lg-offset-4 col-lg-8">                          
                           <i class="fa fa-circle-o-notch fa-spin fa-4x fa-fw" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
                <div class="modal-footer"></div>
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

    	var messageArray = [];
    	messageArray[0] = '<spring:message code="cropit.valid.file"/>';
    	messageArray[1] = '<spring:message code="cropit.file.image"/>';
    	messageArray[2] = '<spring:message code="cropit.file.too.small"/>';
    	messageArray[3] = '<spring:message code="cropit.file.too.large"/>';    	
    	messageArray[4] = '<spring:message code="cropit.undefined.platform"/>';
    	messageArray[5] = '<spring:message code="cropit.file.reader.support"/>';
    	messageArray[6] = '<spring:message code="cropit.profile.picture.cancellation"/>';
    	
    	cropIt.setUp(messageArray);
    });
</script>
</body>

</html>