<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Expires" content="-1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">   
    <title>CropIt</title>
	<link href="resources/css/cropIt.css" rel="stylesheet" type="text/css">
</head>

<body>
  <div class="image-editor">
    <input type="file" class="cropit-image-input">
    <div class="cropit-preview"></div>
    <div class="image-size-label">
     Zoom
    </div>
    <input type="range" class="cropit-image-zoom-input">
    <button class="rotate-ccw">Rotate counterclockwise</button>
    <button class="rotate-cw">Rotate clockwise</button>

    <button class="export">Export</button>
  </div>

  <!-- JavaScript -->
  <script src="resources/js/jquery-1.11.2.min.js"></script>
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