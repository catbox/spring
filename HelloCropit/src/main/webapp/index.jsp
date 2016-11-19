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
    <style>
      .cropit-preview {
        background-color: #f8f8f8;
        background-size: cover;
        border: 1px solid #ccc;
        border-radius: 3px;
        margin-top: 7px;
        width: 250px;
        height: 250px;
      }

      .cropit-preview-image-container {
        cursor: move;
      }

      .image-size-label {
        margin-top: 10px;
      }

      input, .export {
        display: block;
      }

      button {
        margin-top: 10px;
      }
    </style>
</head>

<body>
  <div class="image-editor">
    <input type="file" class="cropit-image-input">
    <div class="cropit-preview"></div>
    <div class="image-size-label">
      Resize image
    </div>
    <input type="range" class="cropit-image-zoom-input">
    <button class="rotate-ccw">Rotate counterclockwise</button>
    <button class="rotate-cw">Rotate clockwise</button>

    <button class="export">Export</button>
  </div>

  <!-- JavaScript -->
  <script src="resources/js/jquery-1.11.2.min.js"></script>
  <script src="resources/js/jquery.cropit.js"></script>
  <script>
    $(function() {

      var $editor = $('.image-editor');
      $editor.cropit();

      $('.rotate-cw').click(function() {
        $('.image-editor').cropit('rotateCW');
      });
      
      $('.rotate-ccw').click(function() {
        $('.image-editor').cropit('rotateCCW');
      });

      $('.export').click(function() {
        var imageData = $('.image-editor').cropit('export');
        window.open(imageData);
      });

    });
  </script>
</body>

</html>