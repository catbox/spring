<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>Profile</title>
    <link href="resources/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="resources/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="resources/css/cropper.css" rel="stylesheet" type="text/css">
    <link href="resources/css/PictureEditor.css" rel="stylesheet" type="text/css">
    <!-- BrowserSync target script: IP Address should the one of the development machine -->
    <!-- <script src="http://XXX.XXX.XXX.XXX:8080/target/target-script-min.js#browsersync"></script> -->
</head>

<%
    response.setHeader("Cache-Control", "no-cache"); // Request a new copy of the page from the server
    response.setHeader("Cache-Control", "no-store"); // Prevent page storing
    response.setDateHeader("Expires", -1);           // Set the browser cache to mark this page as stale
    response.setHeader("Pragma", "no-cache");        // HTTP 1.0 backward compatibility
%>

<body>
<!--  Cropper Page -->
<div id="cropper-content" class="container">
    <!-- Preview new profile image -->
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="panel panel-info picedit-preview-panel">
                
                <!-- Preview Picture -->
                <div class="row">
                    <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                        <b>Preview Picture</b>                   
                        <div id="picedit-sneak-peek" class="picedit-preview"></div>
                    </div>         
                </div>               
                <br>
               
                <!-- Cropped Profile Picture --> 
                <div class="row">                  
                    <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                        <b>Cropped Profile Picture</b>
                        <br>
                        <img id="croppedProfilePicture" class="picedit-viewer" src="" alt="">
                    </div>
                </div>
                <br>
                
                <!-- Display errors -->
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div id="picedit-alert" class="alert alert-danger fade in" style="display:none">
					       <a href="#" class="close" data-dismiss="alert">&times;</a>
						   <p id="picedit-alert-msg"></p>
		                </div>
                    </div>
                </div>                    
            </div>
        </div>
    </div>
    
    <!-- DEV ONLY -->
    <!--
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div id="cropperTracker1"></div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div id="cropperTracker2"></div>
        </div>
    </div>
	-->
	
    <!-- Select an image and edit it -->
    <div id="panelRow" class="row">
          <div id="panelColumnSize" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">       
              <!-- Main panel -->
              <div id="picedit-panel" class="panel panel-info">
                  <div class="panel-body">                    
                       
                       <!-- Browse button to load picture -->
                       <div class="row">
                           <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                               <label id="picedit-select-btn" class="btn" for="inputImage">
                                    Select your profile picture<input class="sr-only" id="inputImage" name="file" type="file" accept="image/*">
                               </label>                                  
                           </div>
                       </div>                          
                       
                       <!-- Editor panel -->
                       <div class="row">
                           <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">        
                               <div id="picedit">
                                   <img id="picedit-input" class="picedit-hidden" src="">
                               </div>
                           </div>
                       </div>

                       <!-- Editing Buttons -->
                       <div class="row">
                           <div class="col-xs-12 col-sm-12 col-md-8 col-lg-12">
                               <!-- Zoom In --> 
                               <button id="zoomInBtn" class="btn btn-primary btn-space" data-method="zoom" data-option="0.1" type="button" title="Zoom In">
                                   <span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
                               </button>
                               <!-- Zoom Out -->
                               <button id="zoomOutBtn" class="btn btn-primary btn-space" data-method="zoom" data-option="-0.1" type="button" title="Zoom Out">
                                   <span class="glyphicon glyphicon-zoom-out" aria-hidden="true"></span>
                               </button>
                               <!-- Reset -->
                               <button id="resetBtn" class="btn btn-primary btn-space" data-method="reset" type="button" title="Reload">
                                   <span class="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                               </button>
                               <!-- Rotate Left -->
                               <button id="rotateLeftBtn" class="btn btn-primary btn-group-vertical btn-space" data-method="rotate" data-option="-90" type="button" title="Rotate Left">
                                   <i class="fa fa-undo"></i>
                               </button>
                               <!-- Rotate Right -->
                               <button id="rotateRightBtn" class="btn btn-primary btn-space" data-method="rotate" data-option="90" type="button" title="Rotate Right">
                                   <i class="fa fa-repeat"></i>
                               </button>
                               <!-- Help -->
                               <button class="btn btn-primary" type="button" title="Help">
                                   <span class="glyphicon glyphicon-question-sign" aria-hidden="true"></span>                                    
                               </button>                                                                 
                           </div>                           
                       </div>
                       
                       <!-- Add some vertical space -->
                       <br>
                       
                       <!-- Save & Cancel Buttons -->                                
                       <div class="row">
                           <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                               <!-- Save the new profile picture -->
                               <button id="picedit-save-btn" class="btn btn-success" type="button">Save</button>                            
                               <!-- Cancel profile editing -->
                               <button id="picedit-cancel-btn" class="btn btn-danger" type="button">Cancel</button>
                           </div>
                      </div>
                      
                  </div>
              </div>
          </div>                
    </div>
    
    <div id="picedit-modal" class="modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="modal" aria-labelledby="picedit-modal-label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">      
                    <h4 id="picedit-modal-label" class="modal-title">Profile Picture</h4>                 
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"> 
                           <h4>Your profile picture is being updated.</h4>                           
                           <img id="picedit-modal-spinner" src="resources/images/wh-spinner.gif" alt="spinner">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <img src="resources/images/wh-morse-logo.png" alt="logo">    
                </div>
            </div>
        </div>
    </div>
    
    <div id="orientation-change-modal" class="modal modal-sm" data-backdrop="static" data-keyboard="false" tabindex="-1" role="modal" aria-labelledby="orientation-change-modal-label" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">      
                    <h4 id="orientation-change-modal-label" class="modal-title">Device Orientation</h4>                 
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"> 
                           <h4>Device orientation changed.</h4>
                           <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <img src="resources/images/wh-morse-logo.png" alt="logo">    
                </div>
            </div>
        </div>
    </div>

</div>

<!-- JavaScript -->
<script src="resources/js/jquery-1.11.2.min.js"></script>
<script src="resources/js/jquery.mobile-1.4.5.js"></script>
<script src="resources/js/bootstrap.min.js"></script>
<script src="resources/js/FileAPI.js"></script>
<script src="resources/js/ExifReader.js"></script>
<script src="resources/js/cropper.js"></script>
<script src="resources/js/PictureEditor.js"></script>
<script>

    // Function to execute as soon as  the DOM is fully loaded.
    $(document).ready(function() {
    	pictureEditor.setUp("#inputImage", "#picedit > img", "#picedit-sneak-peek", ".picedit-preview", 
    			            "#picedit-alert", "#picedit-alert-msg", "#picedit-cancel-btn", "#picedit-save-btn", 
    			            "#picedit-modal");  	
    });
    
    $(window).on( "orientationchange", function(event) {
    	pictureEditor.setDeviceOrientation(event.orientation);
	});

</script>
</body>
</html>