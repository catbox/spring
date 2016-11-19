/*!
 * Cropper v0.8.0
 * https://github.com/fengyuanchen/cropper
 * Copyright 2014-2015 Fengyuan Chen
 * Released under the MIT license
 * Date: 2015-02-19T06:49:29.144Z
 * 
 * Contributing Author: Schwarze Katze.
 * Description: Enhanced for the wh project.
 * Date: 06-11-2016
 */

(function (factory) {
  if(typeof define === 'function' && define.amd) {
    // AMD - Register as Anonymous Module.
    define(['jquery'], factory);
  } 
  else if(typeof exports === 'object') {
    // Node / CommonJS.
    factory(require('jquery'));
  } 
  else {
    // Browser Globals.
    factory(jQuery);
  }
})(function ($) {

  'use strict';

  var $window = $(window),
      $document = $(document),
      location = window.location,

      // Constants.
      STRING_DIRECTIVE = 'directive',
      CROPPER_NAMESPACE = '.cropper',

      // RegExps.
      REGEXP_DIRECTIVES = /^(all|crop|move|zoom)$/,

      // Classes
      CLASS_MODAL = 'cropper-modal',
      CLASS_HIDE = 'cropper-hide',
      CLASS_HIDDEN = 'cropper-hidden',
      CLASS_INVISIBLE = 'cropper-invisible',
      CLASS_MOVE = 'cropper-move',
      CLASS_CROP = 'cropper-crop',
      CLASS_DISABLED = 'cropper-disabled',
      CLASS_BG = 'cropper-bg',

      // Events.
      EVENT_MOUSE_DOWN = 'mousedown touchstart',
      EVENT_MOUSE_MOVE = 'mousemove touchmove',
      EVENT_MOUSE_UP = 'mouseup mouseleave touchend touchleave touchcancel',
      EVENT_WHEEL = 'wheel mousewheel DOMMouseScroll',
      EVENT_DBLCLICK = 'dblclick',
      
      // Bind event to window with name space.
      EVENT_RESIZE = 'resize' + CROPPER_NAMESPACE,
      EVENT_BUILD = 'build' + CROPPER_NAMESPACE,
      EVENT_BUILT = 'built' + CROPPER_NAMESPACE,
      EVENT_DRAG_START = 'dragstart' + CROPPER_NAMESPACE,
      EVENT_DRAG_MOVE = 'dragmove' + CROPPER_NAMESPACE,
      EVENT_DRAG_END = 'dragend' + CROPPER_NAMESPACE,

      // Supports.
      support = {
        canvas: $.isFunction($('<canvas>')[0].getContext)
      },

      // Mathematical functions.
      round = Math.round,
      sqrt = Math.sqrt,
      min = Math.min,
      max = Math.max,
      abs = Math.abs,
      sin = Math.sin,
      cos = Math.cos,
      num = parseFloat,

      // wh - Image loaded.
      imageLoaded = false,
      // wh - Copy of crop box in the portrait orientation.
      cropBoxPortrait,
      // wh - Copy of crop box in the landscape orientation.
      cropBoxLandscape,
      // wh - Device orientation.
  	  ORIENTATION_PORTRAIT = "portrait", ORIENTATION_LANDSCAPE = "landscape",
  	  initialDeviceOrientation = ORIENTATION_PORTRAIT, deviceOrientation,
  	  deviceOrientationHasChanged, portraitLandscapeLock = true, landscapePortraitLock = true,
      // wh - Container data.
      containerData, containerWidth = 0, containerHeight = 0,
      // wh - Container style data.
      iOSStyleArray = [], nonIOSStyleArray = [],
      // wh - Distance between canvas and panel.
      panelMarginLeftSide = 0, panelPaddingLeftSize = 0, panelPaddingRightSize = 0, panelColumnSize = 0,
      // wh - Orientation sizes.
      portraitWidth = 0, portraitHeight = 0, landscapeWidth = 0, landscapeHeight = 0,
      // wh - Canvas data.     
      canvasData, canvasElement, canvasWidth = 0, canvasHeight = 0, canvasPortraitFactor = 0, canvasLandscapeFactor = 0,
      initialCanvasPortraitWidth = 0, initialCanvasPortraitHeight = 0, initialCanvasLandscapeWidth = 0, initialCanvasLandscapeHeight = 0,
      canvasPortraitWidth = 0, canvasPortraitHeight = 0, canvasLandscapeWidth = 0, canvasLandscapeHeight = 0,
      // wh - Image data.
      portraitImageData, landscapeImageData, iOSPortraitImageData, iOSLandscapeImageData,
      // wh - Crop box data.
      cropBoxLeft = 0, cropBoxTop = 0, cropBoxRight = 0, cropBoxBottom = 0, cropBoxWidth = 0, cropBoxHeight = 0,
      // wh - Zoom Factor.
      zoomFactor = num(0),
      // wh - Zoom Lock.
      zoomLock = false,
      // wh - Picture dimensions.
      pictureDimensions = [], imageWidth = 0, imageMaxWidth = 0, imageHeight = 0, imageMaxHeight = 0,
      imageLeft = 0, imageTop = 0, imageRight = 0, imageBottom = 0, IMAGE_MAX = num(10.0),
      // wh - Default zoom in factor.
      DEFAULT_ZOOM_IN_FACTOR = num(1.0),
      // wh - For rendering purposes, smaller image in portrait orientation are zoomed in.
      PORTRAIT_ZOOM_IN_FACTOR = num(1.0),
      // wh - For rendering purposes, smaller image in landscape orientation are zoomed in.
      LANDSCAPE_ZOOM_IN_FACTOR = num(2.0),
      // wh - Zoom constants.
      ZOOM_MAX = num(3.5), ZOOM_DELTA = num(0.1), ZOOM_MICRO_DELTA = num(0.001),
      // wh - Degree of Rotation.
      degreeOfRotation = 0,
      // wh - Image EXIF orientation.
      imageOrientation = 0,

      // Prototype.
      prototype = {};
  
  // Verify if an object is of the type "number".
  function isNumber(n) {
    return typeof n === 'number';
  }

  // Verify if an object is of the type "string".
  function isString(n) {
    return typeof n === 'string';
  }

  // Verify if an object is of the type "undefined".
  function isUndefined(n) {
    return typeof n === 'undefined';
  }

  // Convert an object to an array and return a part of it.
  function toArray(obj, offset) {
    var args = [];
    // IE8 Compatibility
    if(isNumber(offset)) {
      args.push(offset);
    }
    return args.slice.apply(obj, args);
  }

  // Custom proxy to avoid jQuery's guid.
  function proxy(fn, context) {
    var args = toArray(arguments, 2);

    return function () {
      return fn.apply(context, args.concat(toArray(arguments)));
    };
  }

  // Validate that the url is of the type cross-origin.
  // An origin is defined as a combination of URI scheme, hostname, and port number.
  // The request header is of the format "Origin: http://foo.com:portNumber".
  // The response header is of the format "Access-Control-Allow-Origin: http://foo.com".
  function isCrossOriginURL(url) {
    var parts = url.match(/^(https?:)\/\/([^\:\/\?#]+):?(\d*)/i);

    if(parts && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port)) {
      return true;
    }
    return false;
  }
  
  // Time stamp the url.
  function addTimestamp(url) {
    var timestamp = 'timestamp=' + (new Date()).getTime();
    return (url + (url.indexOf('?') === -1 ? '?' : '&') + timestamp);
  }

  // Get the rotated value.
  function getRotateValue(degree) {
    return degree ? 'rotate(' + degree + 'deg)' : 'none';
  }

  // Get the rotated sizes.
  function getRotatedSizes(data) {
    var deg = abs(data.degree) % 180,
        arc = (deg > 90 ? (180 - deg) : deg) * Math.PI / 180;

    return {
      width: data.width * cos(arc) + data.height * sin(arc),
      height: data.width * sin(arc) + data.height * cos(arc)
    };
  }
  
  // wh - Convert a number to a specific decimal point. Negative values are keep as is.
  function decimalNumber(number, precision) {
	  // Convert the first parameter to a number.
	  number = num(number);
	  // If the precision is not specified, round to the nearest tenth.
	  if(!precision) {
		  return Math.round(number);
	  }
	  if(number == 0) {
		  var decimals = "";
		  for(var i=0; i<precision; i++) decimals += "0";
		  return "0." + decimals;
	  }
	  var exponent = Math.pow(10,precision);
	  var roundedNumber = Math.round((number*exponent)).toString();
	  return parseFloat(roundedNumber.slice(0,-1*precision) + "." + roundedNumber.slice(-1*precision));
  }
  
  // Round a number to a specific decimal point without pixel. Negative values are keep as is.
  function roundNoPX(number, precision) {
  	// Remove pixel suffix from the number and returns a float number.
  	number = parseFloat(number);
  	// If the precision is not specified, round to the nearest tenth.
  	if(!precision) {
  		return Math.round(number);
  	}
  	if(number == 0) {
  		var decimals = "";
  		for(var i=0; i<precision; i++) decimals += "0";
  		return "0." + decimals;
  	}
  	var exponent = Math.pow(10,precision);
  	var num = Math.round((number*exponent)).toString();
  	return parseFloat(num.slice(0,-1*precision) + "." + num.slice(-1*precision));
  }
  
  // Round a number to a specific decimal point without pixel.
  function absRoundNoPX(number, precision) {
  	// Remove pixel suffix from the number and returns a float number.
  	number = parseFloat(number);
  	// If the precision is not specified, round to the nearest tenth.
  	if(!precision) {
  		return Math.abs(Math.round(number));
  	}
  	if(number == 0) {
  		var decimals = "";
  		for(var i=0; i<precision; i++) decimals += "0";
  		return "0." + decimals;
  	}
  	var exponent = Math.pow(10,precision);
  	var num = Math.abs(Math.round((number*exponent))).toString();
  	return parseFloat(num.slice(0,-1*precision) + "." + num.slice(-1*precision));
  }

  // Get the canvas.
  function getSourceCanvas(image, data) {
    var canvas = $('<canvas>')[0],
        context = canvas.getContext('2d'),
        width = data.naturalWidth,
        height = data.naturalHeight,
        rotate = data.rotate,
        rotated = getRotatedSizes({
          width: width,
          height: height,
          degree: rotate
        });

    if(rotate) {
      canvas.width = rotated.width;
      canvas.height = rotated.height;
      context.save();
      context.translate(rotated.width / 2, rotated.height / 2);
      context.rotate(rotate * Math.PI / 180);
      context.drawImage(image, -width / 2, -height / 2, width, height);
      context.restore();
    } 
    else {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(image, 0, 0, width, height);
    }
    return canvas;
  }

  // Cropper constructor.
  function Cropper(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Cropper.DEFAULTS, $.isPlainObject(options) && options);

    this.ready = false;
    this.built = false;
    this.cropped = false;
    this.disabled = false;

    this.load();
  }

  // Load the image.
  prototype.load = function () {
    var _this = this,
        options = this.options,
        $this = this.$element,
        crossOrigin = '',
        buildEvent,
        $clone,
        url;

    // wh - Zoom in the image to the default factor of 1.
    zoomFactor = num(DEFAULT_ZOOM_IN_FACTOR);
    
    if($this.is('img')) {
      url = $this.prop('src');
    } 
    else if($this.is('canvas') && support.canvas) {
      url = $this[0].toDataURL();
    }
  
    if(!url) {
      return;
    }
    
    buildEvent = $.Event(EVENT_BUILD);
    
    // Only trigger once
    $this.one(EVENT_BUILD, options.build).trigger(buildEvent);

    if(buildEvent.isDefaultPrevented()) {
      return;
    }

    if(options.checkImageOrigin) {
      if(isCrossOriginURL(url)) {
        crossOrigin = ' crossOrigin';
        url = addTimestamp(url);
      }
    }

    this.$clone = ($clone = $('<img' + crossOrigin + ' src="' + url + '">'));

    $clone.one('load', function () {
      var naturalWidth = this.naturalWidth || $clone.width(),
          naturalHeight = this.naturalHeight || $clone.height();

      _this.image = {
        naturalWidth: naturalWidth,
        naturalHeight: naturalHeight,
        aspectRatio: naturalWidth / naturalHeight,
        rotate: 0
      };

      _this.url = url;
      _this.ready = true;
      _this.build();
      
      // wh - The image was successfully loaded.
      imageLoaded = true;
    });

    // Hide and insert into the document.
    $clone.addClass(CLASS_HIDE).prependTo('body');
  };

  // Building process of the image as soon as it loads.
  prototype.build = function () {
    var $this = this.$element,
        options = this.options,
        $cropper,
        $cropBox;

    if(!this.ready) {
      return;
    }

    if(this.built) {
      this.unbuild();
    }

    // Create cropper elements.
    this.$cropper = $cropper = $(Cropper.TEMPLATE);

    // Hide the original image.
    $this.addClass(CLASS_HIDDEN);

    // Show and prepend the clone image to the cropper.
    this.$clone.removeClass(CLASS_HIDE).prependTo($cropper);

    // Setup the container.
    this.$container = $this.parent();
    containerWidth = this.$container.width();
    containerHeight = this.$container.height();

    // wh - Find the margin on the left hand side of the panel.
    panelMarginLeftSide = parseFloat($("#picedit").css("margin-left"));
    
    // wh - Find the distance between the canvas and the panel.
    panelPaddingLeftSize = parseFloat($("#panelColumnSize").css("padding-left"));
    panelPaddingRightSize = parseFloat($("#panelColumnSize").css("padding-right"));
    panelColumnSize = (panelPaddingLeftSize + panelPaddingRightSize + panelMarginLeftSide);

    this.$container.append($cropper);
    this.$canvas = $cropper.find('.cropper-canvas');
    this.$cropBox = $cropBox = $cropper.find('.cropper-cropbox');
    this.$viewer = $cropper.find('.cropper-viewer');
    
    this.addListeners();
    this.initPreview();

    // Format Aspect Ratio: 0 -> NaN, 'auto' -> NaN.
    options.aspectRatio = abs(num(options.aspectRatio)) || NaN;

    if(options.autoCrop) {
      this.cropped = true;
      options.modal && this.$canvas.addClass(CLASS_MODAL);
    } 
    else {
      $cropBox.addClass(CLASS_HIDDEN);
    }

    options.background && $cropper.addClass(CLASS_BG);
    !options.highlight && $cropBox.find('.cropper-face').addClass(CLASS_INVISIBLE);
    !options.movable && $cropBox.find('.cropper-face').data(STRING_DIRECTIVE, 'move');
    !options.resizable && $cropBox.find('.cropper-line, .cropper-point').addClass(CLASS_HIDDEN);
    this.setDragMode(options.dragCrop ? 'crop' : 'move');

    this.built = true;
    this.render();
    $this.one(EVENT_BUILT, options.built).trigger(EVENT_BUILT);

    // The size of the device.
    var availableWidth = window.screen.availWidth;
	var availableHeight = window.screen.availHeight;
    
	// Get the initial orientation of the device.
    var wmm = window.matchMedia("(orientation: portrait)");
	
    // If there are matches, it implies that the device is in the portrait orientation.
    if(wmm.matches) {
    	// Portrait orientation
    	initialDeviceOrientation = ORIENTATION_PORTRAIT;
    	// Canvas Data.
    	canvasData = this.$canvas;
    	canvasElement = canvasData.get(0);
    	portraitWidth = num(canvasElement.clientWidth);
    	portraitHeight = num(canvasElement.clientHeight);
    	canvasPortraitFactor = portraitWidth/availableWidth;
    	$("#cropperTracker1").append("<h3>Initial Device Orientation:</h3>");
	  	$("#cropperTracker1").append("<b>Initial Device Orientation: </b>" + initialDeviceOrientation + "<br>");
	  	$("#cropperTracker1").append("<b>canvasPortraitWidth: </b>" + portraitWidth + "<br>");
	  	$("#cropperTracker1").append("<b>canvasPortraitHeight: </b>" + portraitHeight + "<br>");
    } 
    else {  
    	// Landscape orientation
    	initialDeviceOrientation = ORIENTATION_LANDSCAPE;
    	// Canvas Data.
    	canvasData = this.$canvas;
    	canvasElement = canvasData.get(0);
    	landscapeWidth = num(canvasElement.clientWidth);
    	landscapeHeight = num(canvasElement.clientHeight);
    	canvasLandscapeFactor = landscapeWidth/availableWidth;
    	$("#cropperTracker1").append("<h3>Initial Device Orientation:</h3>");
	  	$("#cropperTracker1").append("<b>Initial Device Orientation: </b>" + initialDeviceOrientation + "<br>");
	  	$("#cropperTracker1").append("<b>canvasLandscapeWidth: </b>" + landscapeWidth + "<br>");
	  	$("#cropperTracker1").append("<b>canvasLandscapeHeight: </b>" + landscapeHeight + "<br>");
    }

    /*
    var r1 = this.approximatePortraitWidth(18);    
    var r2 = this.approximatePortraitWidth(227.5);
    var r3 = this.approximatePortraitWidth(345.5);
    var r4 = this.approximatePortraitWidth(455.8);
    var r5 = this.approximatePortraitWidth(569.75);
    var r6 = this.approximatePortraitWidth(678.3);
    var r7 = this.approximatePortraitWidth(789.33);
    var r8 = this.approximatePortraitWidth(379.125);
    $("#cropperTracker1").append("<h3>Portrait Approximation:</h3>");
  	$("#cropperTracker1").append("<b>18: </b>" + r1 + "<br>");  	
  	$("#cropperTracker1").append("<b>227.5: </b>" + r2 + "<br>");
  	$("#cropperTracker1").append("<b>345.5: </b>" + r3 + "<br>");
  	$("#cropperTracker1").append("<b>455.8: </b>" + r4 + "<br>");
  	$("#cropperTracker1").append("<b>569.75: </b>" + r5 + "<br>"); 	
    $("#cropperTracker1").append("<b>678.3: </b>" + r6 + "<br>");
  	$("#cropperTracker1").append("<b>789.33: </b>" + r7 + "<br>");
  	$("#cropperTracker1").append("<b>379.125: </b>" + r8 + "<br>");
  	*/
    
    /*
  	var r1 = this.approximateLandscapeWidth(110.5);    
    var r2 = this.approximateLandscapeWidth(218);
    var r3 = this.approximateLandscapeWidth(328.75);
    var r4 = this.approximateLandscapeWidth(439);
    var r5 = this.approximateLandscapeWidth(560);
    var r6 = this.approximateLandscapeWidth(674);
    var r7 = this.approximateLandscapeWidth(776);
    var r8 = this.approximateLandscapeWidth(895);
 
    $("#cropperTracker1").append("<h3>Landscape Approximation:</h3>");
  	$("#cropperTracker1").append("<b>110.5: </b>" + r1 + "<br>");  	
  	$("#cropperTracker1").append("<b>218: </b>" + r2 + "<br>");
  	$("#cropperTracker1").append("<b>328.75: </b>" + r3 + "<br>");
  	$("#cropperTracker1").append("<b>439: </b>" + r4 + "<br>");
  	$("#cropperTracker1").append("<b>560: </b>" + r5 + "<br>"); 	
    $("#cropperTracker1").append("<b>674: </b>" + r6 + "<br>");
  	$("#cropperTracker1").append("<b>776: </b>" + r7 + "<br>");
  	$("#cropperTracker1").append("<b>895: </b>" + r8 + "<br>");
  	*/
  };

  // Reset all the building components that were used to build the image.
  prototype.unbuild = function () {
    if(!this.built) {
      return;
    }

    this.built = false;
    this.removeListeners();

    this.$preview.empty();
    this.$preview = null;

    this.$cropBox = null;
    this.$canvas = null;
    this.$container = null;

    this.$cropper.remove();
    this.$cropper = null;
  };

  $.extend(prototype, {

	// Initialization of container, image and crop box.
	render: function () {
      this.initContainer();
      this.initImage();
      this.initCropBox();
    },
    
    // Initialize the container.
    initContainer: function () {
      var $this = this.$element,
          $container = this.$container,
          $cropper = this.$cropper,
          options = this.options;

      $cropper.addClass(CLASS_HIDDEN);
      $this.removeClass(CLASS_HIDDEN);

      $cropper.css((this.container = {
        width: max(containerWidth, num(options.minContainerWidth) || 350),
        height: max(containerHeight, num(options.minContainerHeight) || 150)
      }));

      $this.addClass(CLASS_HIDDEN);
      $cropper.removeClass(CLASS_HIDDEN);      
    },

    // Initialize the image.
    initImage: function () {
      var container = this.container,
          image = this.image,
          aspectRatio = image.aspectRatio,
          width = image.naturalWidth,
          height = image.naturalHeight,
          left = 0,
          top = 0,
          right = 0,
          bottom = 0;

      if(containerHeight * aspectRatio > containerWidth) {
          width = containerWidth;
          height = width / aspectRatio;
          top = (containerHeight - height) / 2;
        } 
      else {
    	  height = containerHeight;
    	  width = height * aspectRatio;
    	  left = (containerWidth - width) / 2;
      }

      // wh - Added right & bottom property.
      $.extend(image, {
        width: width,
        height: height,
        left: left,
        top: top,
        right: right,
        bottom: bottom
      });
      
      // wh - Maximum size for width and height.
      imageMaxWidth = decimalNumber((width*IMAGE_MAX), 3);
      imageMaxHeight = decimalNumber((height*IMAGE_MAX), 3);

      this.defaultImage = $.extend({}, image);
      
      // wh - Device orientation has not changed.
      deviceOrientationHasChanged = false;

      this.renderImage();
    },

    // Display the image.
    renderImage: function (changed) {
      var options = this.options,
          image = this.image,
          width = image.width,
          height = image.height,
          rotate = image.rotate,
          rotated;

      if(rotate) {
        rotated = getRotatedSizes({
          width: width,
          height: height,
          degree: rotate
        });
      }

      $.extend(image, {
        rotatedWidth: rotated ? rotated.width : image.width,
        rotatedHeight: rotated ? rotated.height : image.height,
        rotatedLeft: rotated ? (image.left - (rotated.width - width) / 2) : image.left,
        rotatedTop: rotated ? (image.top - (rotated.height - height) / 2) : image.top
      });

      this.$clone.css({
        width: width,
        height: height,
        marginLeft: image.left,
        marginTop: image.top,
        transform: getRotateValue(rotate)
      });

      if(changed) {
        this.preview();
        $.isFunction(options.crop) && options.crop.call(this.$element, this.getData());
      }
      
      imageWidth = decimalNumber((image.width), 3);
      imageHeight = decimalNumber((image.height), 3);
      imageLeft = decimalNumber((image.left), 3); 
      imageTop = decimalNumber((image.top), 3); 
      imageRight = decimalNumber((imageLeft + imageWidth), 3); 
      imageBottom = decimalNumber((imageTop + imageHeight), 3);
    },

    // wh - Initialize the crop box.
    initCropBox: function () {
      var cropBox = {
            width: 0,
            height: 0,
            left: 0,
            top: 0,
            oldLeft: 0,
            oldTop: 0,
            right: 0,
            bottom: 0
          };

      var cBoxHeight = parseFloat($(".cropper-cropbox").css("height"));

      cropBox.width = cBoxHeight;
      cropBox.height = cBoxHeight;
      cropBox.left = (containerWidth - cropBox.width)/2;
      cropBox.top = (containerHeight - cropBox.height)/2;
      cropBox.oldLeft = cropBox.left;
      cropBox.oldTop = cropBox.top;
      cropBox.right = (cropBox.width + cropBox.left);
      cropBox.bottom = (cropBox.height + cropBox.top);
      
      /*
      console.log("containerWidth: " + containerWidth);
      console.log("containerHeight: " + containerHeight);
      console.log("cropBox.width: " + cropBox.width);
      console.log("cropBox.height: " + cropBox.height);
      console.log("cropBox.left: " + cropBox.left);
      console.log("cropBox.top: " + cropBox.top);
      console.log("cropBox.right: " + cropBox.right);
      console.log("cropBox.bottom: " + cropBox.bottom);
      */
    
      this.defaultCropBox = $.extend({}, cropBox);
      this.cropBox = cropBox;

      if(this.cropped) {
        this.renderCropBox();
      }
    },
    
    // wh - Display the crop box.
    renderCropBox: function () {
      var options = this.options,
          $cropBox = this.$cropBox,
          cropBox = this.cropBox;

      if(options.movable) {
        $cropBox.find('.cropper-face').data(STRING_DIRECTIVE, (cropBox.width === containerWidth && cropBox.height === containerHeight) ? 'move' : 'all');
      }

      $cropBox.css({
        width: cropBox.width,
        height: cropBox.height,
        left: cropBox.left,
        top: cropBox.top
      });
      
      if(!this.disabled) {
        this.preview();
        $.isFunction(options.crop) && options.crop.call(this.$element, this.getData());
      }
      
      // wh - Zoom the image so that it is larger than the cropper box.
	  this.zoom(DEFAULT_ZOOM_IN_FACTOR);
    },
    
    // Display the crop box upon orientation change.
    displayCropBox: function () {
      var options = this.options,
          $cropBox = this.$cropBox,
          cropBox = this.cropBox;

      if(options.movable) {
        $cropBox.find('.cropper-face').data(STRING_DIRECTIVE, (cropBox.width === containerWidth && cropBox.height === containerHeight) ? 'move' : 'all');
      }
	  
      $cropBox.css({
        width: cropBox.width,
        height: cropBox.height,
        left: cropBox.left,
        top: cropBox.top
      });

      if(!this.disabled) {
        this.preview();
        $.isFunction(options.crop) && options.crop.call(this.$element, this.getData());
      }
    }
  });

  // Initialize the preview.
  prototype.initPreview = function () {
    var url = this.url;

    this.$preview = $(this.options.preview);
    this.$viewer.html('<img src="' + url + '">');

    // Override img element styles.
    // Add `display:block` to avoid margin top issue (Occur only when margin-top <= -height).
    this.$preview.each(function () {
      var $this = $(this);

      $this.data({
        width: $this.width(),
        height: $this.height()
      }).html('<img src="' + url + '" style="display:block;width:100%;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;">');
    });
  };

  // Display the preview.
  prototype.preview = function () {
    var image = this.image,
        cropBox = this.cropBox,
        width = image.width,
        height = image.height,
        left = cropBox.left - image.left,
        top = cropBox.top - image.top,
        rotate = image.rotate;

    if(!this.cropped || this.disabled) {
      return;
    }

    this.$viewer.find('img').css({
      width: width,
      height: height,
      marginLeft: -left,
      marginTop: -top,
      transform: getRotateValue(rotate)
    });

    this.$preview.each(function () {
      var $this = $(this),
          data = $this.data(),
          ratio = data.width / cropBox.width,
          newWidth = data.width,
          newHeight = cropBox.height * ratio;

      if(newHeight > data.height) {
        ratio = data.height / cropBox.height,
        newWidth = cropBox.width * ratio;
        newHeight = data.height;
      }

      $this.width(newWidth).height(newHeight).find('img').css({
        width: width * ratio,
        height: height * ratio,
        marginLeft: -left * ratio,
        marginTop: -top * ratio,
        transform: getRotateValue(rotate)
      });
    });
  };

  // Event Listeners.
  prototype.addListeners = function () {
    var options = this.options;

    this.$element.on(EVENT_DRAG_START, options.dragstart).on(EVENT_DRAG_MOVE, options.dragmove).on(EVENT_DRAG_END, options.dragend);
    this.$cropper.on(EVENT_MOUSE_DOWN, $.proxy(this.dragstart, this)).on(EVENT_DBLCLICK, $.proxy(this.dblclick, this));
    
    if(options.zoomable && options.mouseWheelZoom) {
      this.$cropper.on(EVENT_WHEEL, $.proxy(this.wheel, this));
    }

    if(options.global) {
      $document.on(EVENT_MOUSE_MOVE, (this._dragmove = proxy(this.dragmove, this))).on(EVENT_MOUSE_UP, (this._dragend = proxy(this.dragend, this)));
    } 
    else {
      this.$cropper.on(EVENT_MOUSE_MOVE, $.proxy(this.dragmove, this)).on(EVENT_MOUSE_UP, $.proxy(this.dragend, this));
    }

    options.responsive && $window.on(EVENT_RESIZE, (this._resize = proxy(this.resize, this)));
  };

  // Unload the Event Listeners.
  prototype.removeListeners = function () {
    var options = this.options;

    this.$element.off(EVENT_DRAG_START, options.dragstart).off(EVENT_DRAG_MOVE, options.dragmove).off(EVENT_DRAG_END, options.dragend);
    this.$cropper.off(EVENT_MOUSE_DOWN, this.dragstart).off(EVENT_DBLCLICK, this.dblclick);
    
    if(options.zoomable && options.mouseWheelZoom) {
      this.$cropper.off(EVENT_WHEEL, this.wheel);
    }

    if(options.global) {
      $document.off(EVENT_MOUSE_MOVE, this._dragmove).off(EVENT_MOUSE_UP, this._dragend);
    } 
    else {
      this.$cropper.off(EVENT_MOUSE_MOVE, this.dragmove).off(EVENT_MOUSE_UP, this.dragend);
    }

    options.responsive && $window.off(EVENT_RESIZE, this._resize);
  };

  $.extend(prototype, {
	
	// Resize the image.
    resize: function () {
      var $container = this.$container,
          container = this.container;

      if(this.disabled) {
        return;
      }

      if($container.width() !== container.width || $container.height() !== container.height) {
        clearTimeout(this.resizing);
        this.resizing = setTimeout($.proxy(function () {
          var imageData = this.getImageData(),
              cropBoxData = this.getCropBoxData();

          this.render();
          this.setImageData(imageData);
          this.setCropBoxData(cropBoxData);
        }, this), 200);
      }
    },

    // Double click event.
    dblclick: function () {
      if(this.disabled) {
        return;
      }

      if(this.$canvas.hasClass(CLASS_CROP)) {
        this.setDragMode('move');
      } 
      else {
        this.setDragMode('crop');
      }
    },

    // Mouse wheel event.
    wheel: function (event) {
      var e = event.originalEvent,
          delta = 1;

      if(this.disabled) {
        return;
      }

      event.preventDefault();

      if(e.deltaY) {
        delta = e.deltaY > 0 ? 1 : -1;
      } 
      else if(e.wheelDelta) {
        delta = -e.wheelDelta / 120;
      } 
      else if(e.detail) {
        delta = e.detail > 0 ? 1 : -1;
      }
      
      if((zoomFactor <= ZOOM_MAX) || ((zoomFactor >= ZOOM_MAX) && (delta == -1))) {
    	  this.zoom(delta * 0.1);
      }
      else {
    	  return;
      }     
    },
    
    // Start moving the image.
    dragstart: function (event) {
      var options = this.options,
          originalEvent = event.originalEvent,
          touches = originalEvent && originalEvent.touches,
          e = event,
          directive,
          dragStartEvent,
          touchesLength;

      if(this.disabled) {
        return;
      }

      if(touches) {
        touchesLength = touches.length;
        
        if(touchesLength > 1) {

          if(options.zoomable && options.touchDragZoom && touchesLength === 2) {
            e = touches[1];
            this.startX2 = e.pageX;
            this.startY2 = e.pageY;
            
            if(zoomFactor >= ZOOM_MAX) {
            	zoomFactor = decimalNumber((ZOOM_MAX - ZOOM_MICRO_DELTA), 3);
            }           
            directive = 'zoom';
          } 
          else {
        	  return;
          }
        }
        e = touches[0];
      }

      directive = directive || $(e.target).data(STRING_DIRECTIVE);

      if(REGEXP_DIRECTIVES.test(directive)) {
        event.preventDefault();

        dragStartEvent = $.Event(EVENT_DRAG_START);
        this.$element.trigger(dragStartEvent);

        if(dragStartEvent.isDefaultPrevented()) {
          return;
        }

        this.directive = directive;
        this.cropping = false;
        this.startX = e.pageX;
        this.startY = e.pageY;
        
        if(directive === 'crop') {
          this.cropping = true;
          this.$canvas.addClass(CLASS_MODAL);
        }
      }
    },

    // The image is moving.
    dragmove: function (event) {
      var options = this.options,
          originalEvent = event.originalEvent,
          touches = originalEvent && originalEvent.touches,
          e = event,
          dragMoveEvent,
          touchesLength,
          change = true;

      if(this.disabled) {
        return;
      }
      
      // wh - Get image size and position
      var imageData = this.getImageData();
      var imageWidth = imageData.width;
      var imageHeight = imageData.height;
      var imageLeft = imageData.left;
      var imageTop = imageData.top;
      var imageRight = (imageWidth + imageLeft);
      var imageBottom = (imageTop + imageHeight);

      if(touches) {
        touchesLength = touches.length;

        if(touchesLength > 1) {
          if(options.zoomable && options.touchDragZoom && touchesLength === 2) {        	
            e = touches[1];
            this.endX2 = e.pageX;
            this.endY2 = e.pageY;            
          } 
          else {
            return;
          }
        }
        e = touches[0];
      }

      if(this.directive) {
        event.preventDefault();

        dragMoveEvent = $.Event(EVENT_DRAG_MOVE);
        this.$element.trigger(dragMoveEvent);

        if(dragMoveEvent.isDefaultPrevented()) {
          return;
        }

        this.endX = e.pageX;
        this.endY = e.pageY;
 
        this.change();
      }
    },

    // The image has stop moving.
    dragend: function (event) {
      var dragEndEvent;

      if(this.disabled) {
        return;
      }

      if(this.directive) {
        event.preventDefault();

        dragEndEvent = $.Event(EVENT_DRAG_END);
        this.$element.trigger(dragEndEvent);

        if(dragEndEvent.isDefaultPrevented()) {
          return;
        }

        if(this.cropping) {
          this.cropping = false;
          this.$canvas.toggleClass(CLASS_MODAL, this.cropped && this.options.modal);
        }

        this.directive = '';
      }
    } 
  });

  $.extend(prototype, {

	// wh - Set the device orientation.
	setDeviceOrientation: function(orientation) {

		// Set orientation for iOS Device.
		if(this.iOSDevice()) {
			this.setDeviceOrientationForIOS(orientation);
		}
		// Set orientation for non-iOS Device.
		else {					
			this.setDeviceOrientationForNonIOS(orientation);
		}
	
	},
	
	// wh - Set orientation for iOS Device.
	setDeviceOrientationForIOS: function(orientation) {
		if(imageLoaded) {
			
			$("#cropperTracker2").empty();
			
			// Reset the zoom factor.
		    zoomFactor = num(DEFAULT_ZOOM_IN_FACTOR);
		    this.zoom(0);
		    
			// Device orientation has changed.
		    deviceOrientationHasChanged = true;
			
		    // Device orientation (portrait or landscape).
		    deviceOrientation = orientation;
		    
		    // Get the crop box data.
			var cropBoxData = this.getCropBoxData();
			var cropBoxWidth = cropBoxData.width;
			var cropBoxHeight = cropBoxData.height;
			var cropBoxLeft = cropBoxData.left;
			var cropBoxTop = cropBoxData.top;
			var cropBoxRight = cropBoxData.right;
			var cropBoxBottom = cropBoxData.bottom;
			
			// Set crop box size upon device orientation change.			
			this.cropBox.width = cropBoxWidth;
			this.cropBox.height = cropBoxHeight;
			this.cropBox.left = cropBoxLeft;
			this.cropBox.top = cropBoxTop;
			this.cropBox.oldLeft = cropBoxLeft;
			this.cropBox.oldTop = cropBoxTop;
			
			if(deviceOrientation == ORIENTATION_PORTRAIT) {
				cropBoxPortrait = this.cropBox;
			}
			else if(deviceOrientation == ORIENTATION_LANDSCAPE) {
				cropBoxLandscape = this.cropBox;
			}

		    // Canvas Data.
		    canvasData = this.$canvas;
			canvasElement = canvasData.get(0);
			canvasWidth = num(canvasElement.clientWidth);
			canvasHeight = num(canvasElement.clientHeight);
	
			// Set the image size upon device orientation change.
			var imgAspectRatio = num(this.image.aspectRatio);
			var imgWidth = canvasWidth;
			var imgHeight = (imgWidth/imgAspectRatio);

			var imageSizeFactor = num(2);
			while((imgHeight <= cropBoxHeight) || (imgWidth <= cropBoxWidth)) {
				
				if(imgHeight <= cropBoxHeight) {
					imgHeight = imageSizeFactor*cropBoxHeight;
					imgWidth = imgHeight*imgAspectRatio;
					imageSizeFactor++;
				}
				else if(imgWidth <= cropBoxWidth) {
					imgWidth = imageSizeFactor*cropBoxWidth;
					imgHeight = imgWidth/imgAspectRatio;
					imageSizeFactor++;
				}
			}

			// Set the image left position upon device orientation change.
			var imgLeft = num(0);
			if(imgWidth > canvasWidth) {
				imgLeft = -(imgWidth - canvasWidth)/2;
			}
			else if(imgWidth < canvasWidth) {
				imgLeft = (canvasWidth - imgWidth)/2;
			}

			// Set the image top position upon device orientation change.
			var imgTop = num(0);
			if(imgHeight > canvasHeight) {
				imgTop = -(imgHeight - canvasHeight)/2;
			}
			else if(imgHeight < canvasHeight) {
				imgTop = (canvasHeight - imgHeight)/2;
			}

			this.image.width = imgWidth;
			this.image.height = imgHeight;
			this.image.left = imgLeft;
			this.image.top = imgTop;
			this.image.right = (imgLeft + imgWidth);
			this.image.bottom = (imgTop + imgHeight);
			this.image.rotatedWidth = imgWidth;
			this.image.rotatedHeight = imgHeight;
			this.image.rotatedLeft = imgLeft;
			this.image.rotatedTop = imgTop;
			this.image.transform = $(".cropper-container > img").css("transform");
			
			if(deviceOrientation == ORIENTATION_PORTRAIT) {
				iOSPortraitImageData = this.image;
			}
			else if(deviceOrientation == ORIENTATION_LANDSCAPE) {
				iOSLandscapeImageData = this.image;
			}
		
			// Display the crop box.
			this.displayCropBox();
			
			// Display the image.
			this.renderImage();	
			
			
			$("#cropperTracker2").append("<h3>Device Orientation:</h3>");
			$("#cropperTracker2").append("<b>Device Orientation: </b>" + deviceOrientation + "<br>");
			/*
			$("#cropperTracker2").append("<h3>Image Size Factor:</h3>");
			$("#cropperTracker2").append("<b>Image Size Factor: </b>" + imageSizeFactor + "<br>");
			$("#cropperTracker2").append("<b>Image Width: </b>" + this.image.width + "<br>");
			$("#cropperTracker2").append("<b>Image Height: </b>" + this.image.height + "<br>");

			$("#cropperTracker2").append("<h3>Canvas Data:</h3>");
			$("#cropperTracker2").append("<b>Canvas Width: </b>" + canvasWidth + "<br>");
			$("#cropperTracker2").append("<b>Canvas Height: </b>" + canvasHeight + "<br>")
			
			$("#cropperTracker2").append("<h3>Crop Box Data:</h3>");
			$("#cropperTracker2").append("<b>Crop Box Width: </b>" + cropBoxWidth + "<br>");
			$("#cropperTracker2").append("<b>Crop Box Height: </b>" + cropBoxHeight + "<br>");
			$("#cropperTracker2").append("<b>Crop Box Left: </b>" + cropBoxLeft + "<br>");
			$("#cropperTracker2").append("<b>Crop Box Top: </b>" + cropBoxTop + "<br>");
			$("#cropperTracker2").append("<b>Crop Box Right: </b>" + cropBoxRight + "<br>");
			$("#cropperTracker2").append("<b>Crop Box Bottom: </b>" + cropBoxBottom + "<br>");
			*/
			var ccSrc = $(".cropper-container > img").attr("src");
		    var ccStyle = $(".cropper-container > img").attr("style");
		    var imgWidth = $(".cropper-container > img").css("width");
		    var imgHeight = $(".cropper-container > img").css("height");
		    var imgMarginLeft = $(".cropper-container > img").css("margin-left");
		    var imgMarginTop = $(".cropper-container > img").css("margin-top");
		    var imgTransform = $(".cropper-container > img").css("transform");

		    iOSStyleArray[0] = imgWidth;
		    iOSStyleArray[1] = imgHeight;
		    iOSStyleArray[2] = imgMarginLeft;
		    iOSStyleArray[3] = imgMarginTop;
		    iOSStyleArray[4] = imgTransform;
		    
		    /*
		    console.log("src:" + ccSrc);
		    console.log("ccStyle:" + ccStyle);
		    console.log("imgWidth: " + iOSStyleArray[0]);
		    console.log("imgHeight: " + iOSStyleArray[1]);
		    console.log("imgMarginLeft: " + iOSStyleArray[2]);
		    console.log("imgMarginTop: " + iOSStyleArray[3]);
		    console.log("imgTransform: " + iOSStyleArray[4]);
		    */
		}		
	},
	
	// wh - Set orientation for non-iOS Device.
	setDeviceOrientationForNonIOS: function(orientation) {
		if(imageLoaded) {
			
			 $("#cropperTracker2").empty();
			
			 var availableWidth = window.screen.availWidth;
			 var availableHeight = window.screen.availHeight;
			    
			 $("#cropperTracker2").append("<h3>Device Size:</h3>");
			 $("#cropperTracker2").append("<b>availableWidth: </b>" + availableWidth + "<br>");
			 $("#cropperTracker2").append("<b>availableHeight: </b>" + availableHeight + "<br>");
			
			// Reset the zoom factor.
		    zoomFactor = num(DEFAULT_ZOOM_IN_FACTOR);
		    this.zoom(0);
		    
			// Device orientation has changed.
		    deviceOrientationHasChanged = true;
			
		    // Device orientation (portrait or landscape).
		    deviceOrientation = orientation;
		    
			// Find the canvas data from the initial orientation.
			if(initialDeviceOrientation == ORIENTATION_PORTRAIT && deviceOrientation == ORIENTATION_LANDSCAPE && portraitLandscapeLock) {
				canvasPortraitWidth = portraitWidth;
				canvasPortraitHeight = portraitHeight;
				canvasLandscapeWidth = availableWidth;
				canvasLandscapeHeight = portraitHeight;
				portraitLandscapeLock = false;
			}
			else if(initialDeviceOrientation == ORIENTATION_LANDSCAPE && deviceOrientation == ORIENTATION_PORTRAIT && landscapePortraitLock) {
				canvasLandscapeWidth = landscapeWidth;
				canvasLandscapeHeight = landscapeHeight;
				canvasPortraitWidth = availableWidth;
				canvasPortraitHeight = landscapeHeight;
				landscapePortraitLock = false;
			}

			var cPortraitWidth = 0;
			var cLandscapeWidth = 0;
			if(deviceOrientation == ORIENTATION_PORTRAIT && initialDeviceOrientation == ORIENTATION_PORTRAIT) {
				canvasWidth = canvasPortraitWidth;
				canvasHeight = canvasPortraitHeight;
			}
			else if(deviceOrientation == ORIENTATION_LANDSCAPE && initialDeviceOrientation == ORIENTATION_LANDSCAPE) {
				canvasWidth = canvasLandscapeWidth;
				canvasHeight = canvasLandscapeHeight;
			}
			else if(deviceOrientation == ORIENTATION_PORTRAIT && initialDeviceOrientation == ORIENTATION_LANDSCAPE) {
				cPortraitWidth = canvasPortraitWidth*canvasLandscapeFactor;
				canvasWidth = this.approximatePortraitWidth(cPortraitWidth);
				canvasHeight = canvasPortraitHeight;
			}
			else if(deviceOrientation == ORIENTATION_LANDSCAPE && initialDeviceOrientation == ORIENTATION_PORTRAIT) {
				cLandscapeWidth = canvasLandscapeWidth*canvasPortraitFactor;
				canvasWidth = this.approximateLandscapeWidth(cLandscapeWidth);
				canvasHeight = canvasLandscapeHeight;
			}

		    // Get the crop box data.		
			var cropBoxData = this.getCropBoxDataForNonIOS(canvasWidth, canvasHeight);
			var cropBoxWidth = cropBoxData.width;
			var cropBoxHeight = cropBoxData.height;
			var cropBoxLeft = cropBoxData.left;
			var cropBoxTop = cropBoxData.top;
			var cropBoxRight = cropBoxData.right;
			var cropBoxBottom = cropBoxData.bottom;
			
			// Set crop box size upon device orientation change.			
			this.cropBox.width = cropBoxWidth;
			this.cropBox.height = cropBoxHeight;
			this.cropBox.left = cropBoxLeft;
			this.cropBox.top = cropBoxTop;
			this.cropBox.oldLeft = cropBoxLeft;
			this.cropBox.oldTop = cropBoxTop;
			
			if(deviceOrientation == ORIENTATION_PORTRAIT) {
				cropBoxPortrait = this.cropBox;
			}
			else if(deviceOrientation == ORIENTATION_LANDSCAPE) {
				cropBoxLandscape = this.cropBox;
			}

			// Set the image size upon device orientation change.
			var imgAspectRatio = num(this.image.aspectRatio);
			var imgWidth = canvasWidth;
			var imgHeight = (imgWidth/imgAspectRatio);

			var imageSizeFactor = num(2);
			while((imgHeight <= cropBoxHeight) || (imgWidth <= cropBoxWidth)) {
				
				if(imgHeight <= cropBoxHeight) {
					imgHeight = imageSizeFactor*cropBoxHeight;
					imgWidth = imgHeight*imgAspectRatio;
					imageSizeFactor++;
				}
				else if(imgWidth <= cropBoxWidth) {
					imgWidth = imageSizeFactor*cropBoxWidth;
					imgHeight = imgWidth/imgAspectRatio;
					imageSizeFactor++;
				}
			}

			// Set the image left position upon device orientation change.
			var imgLeft = num(0);
			if(imgWidth > canvasWidth) {
				imgLeft = -(imgWidth - canvasWidth)/2;
			}
			else if(imgWidth < canvasWidth) {
				imgLeft = (canvasWidth - imgWidth)/2;
			}

			// Set the image top position upon device orientation change.
			var imgTop = num(0);
			if(imgHeight > canvasHeight) {
				imgTop = -(imgHeight - canvasHeight)/2;
			}
			else if(imgHeight < canvasHeight) {
				imgTop = (canvasHeight - imgHeight)/2;
			}

			this.image.width = imgWidth;
			this.image.height = imgHeight;
			this.image.left = imgLeft;
			this.image.top = imgTop;
			this.image.right = (imgLeft + imgWidth);
			this.image.bottom = (imgTop + imgHeight);
			this.image.rotatedWidth = imgWidth;
			this.image.rotatedHeight = imgHeight;
			this.image.rotatedLeft = imgLeft;
			this.image.rotatedTop = imgTop;
			this.image.transform = $(".cropper-container > img").css("transform");
			
			if(deviceOrientation == ORIENTATION_PORTRAIT) {
				portraitImageData = this.image;
			}
			else if(deviceOrientation == ORIENTATION_LANDSCAPE) {
				landscapeImageData = this.image;
			}
			
			// Display the crop box.
			this.displayCropBox();
			
			// Display the image.
			this.renderImage();	

			$("#cropperTracker2").append("<h3>Device Orientation:</h3>");
			$("#cropperTracker2").append("<b>Device Orientation: </b>" + deviceOrientation + "<br>");
			/*
			$("#cropperTracker2").append("<h3>Image Size Factor:</h3>");
			$("#cropperTracker2").append("<b>Image Size Factor: </b>" + imageSizeFactor + "<br>");
			$("#cropperTracker2").append("<b>Image Width: </b>" + this.image.width + "<br>");
			$("#cropperTracker2").append("<b>Image Height: </b>" + this.image.height + "<br>");

			$("#cropperTracker2").append("<h3>Canvas Data:</h3>");
			$("#cropperTracker2").append("<b>canvasPortraitFactor: </b>" + canvasPortraitFactor + "<br>");
			$("#cropperTracker2").append("<b>canvasLandscapeFactor: </b>" + canvasLandscapeFactor + "<br>");
			$("#cropperTracker2").append("<b>canvasPortraitWidth: </b>" + canvasPortraitWidth + "<br>");
			$("#cropperTracker2").append("<b>canvasPortraitHeight: </b>" + canvasPortraitHeight + "<br>")
			$("#cropperTracker2").append("<b>canvasLandscapeWidth: </b>" + canvasLandscapeWidth + "<br>");
			$("#cropperTracker2").append("<b>canvasLandscapeHeight: </b>" + canvasLandscapeHeight + "<br>");
			$("#cropperTracker2").append("<b>Canvas Raw Portrait Width: </b>" + cPortraitWidth + "<br>");
			$("#cropperTracker2").append("<b>Canvas Raw Landscape Width: </b>" + cLandscapeWidth + "<br>");
			$("#cropperTracker2").append("<b>Canvas Width: </b>" + canvasWidth + "<br>");
			$("#cropperTracker2").append("<b>Canvas Height: </b>" + canvasHeight + "<br>")

			$("#cropperTracker2").append("<h3>Crop Box Data:</h3>");
			$("#cropperTracker2").append("<b>Crop Box Width: </b>" + cropBoxWidth + "<br>");
			$("#cropperTracker2").append("<b>Crop Box Height: </b>" + cropBoxHeight + "<br>");
			$("#cropperTracker2").append("<b>Crop Box Left: </b>" + cropBoxLeft + "<br>");
			$("#cropperTracker2").append("<b>Crop Box Top: </b>" + cropBoxTop + "<br>");
			$("#cropperTracker2").append("<b>Crop Box Right: </b>" + cropBoxRight + "<br>");
			$("#cropperTracker2").append("<b>Crop Box Bottom: </b>" + cropBoxBottom + "<br>");
			*/
			var ccSrc = $(".cropper-container > img").attr("src");
		    var ccStyle = $(".cropper-container > img").attr("style");
		    var imgWidth = $(".cropper-container > img").css("width");
		    var imgHeight = $(".cropper-container > img").css("height");
		    var imgMarginLeft = $(".cropper-container > img").css("margin-left");
		    var imgMarginTop = $(".cropper-container > img").css("margin-top");
		    var imgTransform = $(".cropper-container > img").css("transform");

		    nonIOSStyleArray[0] = imgWidth;
		    nonIOSStyleArray[1] = imgHeight;
		    nonIOSStyleArray[2] = imgMarginLeft;
		    nonIOSStyleArray[3] = imgMarginTop;
		    nonIOSStyleArray[4] = imgTransform;
		    /*
		    console.log("src:" + ccSrc);
		    console.log("ccStyle:" + ccStyle);
		    console.log("imgWidth: " + nonIOSStyleArray[0]);
		    console.log("imgHeight: " + nonIOSStyleArray[1]);
		    console.log("imgMarginLeft: " + nonIOSStyleArray[2]);
		    console.log("imgMarginTop: " + nonIOSStyleArray[3]);
		    console.log("imgTransform: " + nonIOSStyleArray[4]);
		    */
		}	
	},
	
	// Find out if a device is an iOS one.
	iOSDevice: function() {
		try {
			var windowNavigatorPlatform = window.navigator.platform;
			if((/iP(hone|od|ad)/).test(windowNavigatorPlatform)) {
		    	return true;
		    }
			else {
				return false;
			}
		}
		catch(error) {
			pictureEditor.errorMessage = "Your device platform could not be determined";
			pictureEditor.showAlertMessage(pictureEditor.errorMessage);		
			return false;
		}	
	},
	
	// Approximate the portrait width.
	approximatePortraitWidth: function(pwidth) {
		
		// Portrait width as a float.
		var pw = num(pwidth);
		// Denominator or Divisor.
		var d = num(100)
		// Quotient.
		var q = parseInt((pw)/d);
		// Remainder.
		var r = num(pw%d);
		// Rounded downward to the nearest integer.
		var x = Math.floor(r);
		// Threshold.
		var y = num(12.5);		
		// Result
		var result = num(0);
 
		if(x <= 25) {
			x = 0;
		}		
		else if((x > 25) && (x <= 50) && ((x - 25) < y)) {
			x = 12.5;
		}
		else if((x > 25) && (x <= 50) && ((x - 25) >= y)) {
			x = 25;
		}		
		else if((x > 50) && (x <= 75) && ((x - 50) < y)) {
			x = 37.5;
		}
		else if((x > 50) && (x <= 75) && ((x - 50) >= y)) {
			x = 50;
		}
		else if((x > 75) && (x <= 100) && ((x - 75) < y)) {
			x = 62.5;
		}
		else if((x > 75) && (x <= 100) && ((x - 75) >= y)) {
			x = 75;
		}
		
		result = num((q*d)+x);
		
		return result;
		
	},
	
	// Approximate the landscape width.
	approximateLandscapeWidth: function(lwidth) {
	
		// Landscape width as a float.
		var lw = num(lwidth);
		// Denominator or Divisor.
		var d = num(100)
		// Quotient.
		var q = parseInt((lw)/d);
		// Remainder.
		var r = num(lw%d);
		// Rounded upward to the nearest integer.
		var x = num(Math.ceil(r));		
		// Result
		var result = num(0);
		
		if(x <= 12.5) {
			x = 25;
		}
		else if(12.5 < x && x <= 25) {
			x = 37.5;
		}
		else if(25 < x && x <= 37.5) {
			x = 50;
		}
		else if(37.5 < x && x <= 50) {
			x = 62.5;
		}
		else if(50 < x && x <= 62.5) {
			x = 75;
		}
		else if(62.5 < x && x <= 75) {
			x = 87.5;
		}
		else if(75 < x && x <= 87.5) {
			x = 100;
		}
		else if(87.5 < x && x <= 100) {
			x = 112.5;
		}
		
		result = num((q*d)+x);
		
		return result;
	},

	// Reset the image and crop box to the initial states.
    reset: function () {

      if(deviceOrientation == ORIENTATION_PORTRAIT) {
    	  this.resetPortrait();
    	  return;
      }
      else if(deviceOrientation == ORIENTATION_LANDSCAPE) {
    	  this.resetLandscape();
    	  return;  	  
      }

      if(!this.cropped || this.disabled) {
        return;
      }
      
      // wh - Reset the zoom factor.
      zoomFactor = num(DEFAULT_ZOOM_IN_FACTOR);
      
      this.image = $.extend({}, this.defaultImage);
      this.renderImage();

      this.cropBox = $.extend({}, this.defaultCropBox);
      this.renderCropBox(); 
    },
    
    // wh - Reset the image and crop box to the initial states in portrait orientation.
    resetPortrait: function () {

      if(!this.cropped || this.disabled) {
        return;
      }

      // Reset the zoom factor.
      zoomFactor = num(DEFAULT_ZOOM_IN_FACTOR);
      
      this.resetImage(iOSStyleArray);

      this.cropBox = cropBoxPortrait;
      
      this.displayCropBox();
    },
    
    // wh - Reset the image and crop box to the initial states in landscape orientation.
    resetLandscape: function () {

      if(!this.cropped || this.disabled) {
        return;
      }

      // Reset the zoom factor.
      zoomFactor = num(DEFAULT_ZOOM_IN_FACTOR);
      
      this.resetImage(nonIOSStyleArray);

      this.cropBox = cropBoxLandscape;
      
      this.displayCropBox();
    },
    
    resetImage: function(imgToReset) {

    	var imgWidth = decimalNumber(imgToReset[0], 3);
    	var imgHeight = decimalNumber(imgToReset[1], 3);
    	var imgMarginLeft = decimalNumber(imgToReset[2], 3);
    	var imgMarginTop = decimalNumber(imgToReset[3], 3);
    	var imgTransform = imgToReset[4];
    	
    	var containerStyle = "width: " + imgWidth + "px; height: " + imgHeight + "px; margin-left: " + 
    						 imgMarginLeft + "px; margin-top: " + imgMarginTop + "px; transform: " + imgTransform + ";";
    	
    	$(".cropper-container > img").attr("style", containerStyle);    	
    },
    
    // Find the device orientation, the platform and validate the image location with respect to the crop box.
    imageFitsCroppingArea: function() {
    	
    	var cropBoxData;
    	var result;
    	
    	if(deviceOrientationHasChanged) {
    		// iOS Device.
    		if(this.iOSDevice()) {
    			
    			var imageData;
    			
    			if(deviceOrientation == ORIENTATION_PORTRAIT) {
    				imageData = iOSPortraitImageData;
    			}
    			else if(deviceOrientation == ORIENTATION_LANDSCAPE) {
    				imageData = iOSLandscapeImageData;
    			}
    			
    			cropBoxData = this.getCropBoxData();
    			result = this.validateImageFitsCroppingArea(imageData, cropBoxData);
    		}
    		// Non-iOS Device.
    		else {
    			
    			var imageData;
    			
    			if(deviceOrientation == ORIENTATION_PORTRAIT) {
    				imageData = portraitImageData;
    			}
    			else if(deviceOrientation == ORIENTATION_LANDSCAPE) {
    				imageData = landscapeImageData;
    			}
    			
    			cropBoxData = this.getCropBoxDataForNonIOS(canvasWidth, canvasHeight);
    			result = this.validateImageFitsCroppingArea(imageData, cropBoxData);
    		}
    	}
    	else {
    		var imageData = this.image;//this.getImageData(true);
    		cropBoxData = this.getCropBoxData();
    		result = this.validateImageFitsCroppingArea(imageData, cropBoxData);		
    	}
    	
    	return result;
    },
    
    // Validate that the image fits completely in the cropping area.
    validateImageFitsCroppingArea: function(imgData, cBoxData) {
    	
    	var imageData = this.getCompleteImageData(imgData, cBoxData);
    	var imgWidth = imageData.width, imgHeight = imageData.height,
    		imgLeft = imageData.left, imgTop = imageData.top, 
    		imgRight = imageData.right, imgBottom = imageData.bottom,
    		imgTransform = $(".cropper-container > img").css("transform");
    		//imgTransform = $(".cropper-container > img").attr("style");
    	var	braceIndex = 0, degIndex = 0, rotation = 0;
    	
    		//braceIndex = imgTransform.indexOf("("), degIndex = imgTransform.indexOf("deg"), rotation = imgTransform.substring((braceIndex+1),degIndex);
    	
    	var cropBoxWidth = cBoxData.width, cropBoxHeight = cBoxData.height, 
    		cropBoxLeft = cBoxData.left, cropBoxTop = cBoxData.top, cropBoxRight = cBoxData.right, cropBoxBottom = cBoxData.bottom;

    	/*
    	if(imgTransform != "none") {
    		imgWidth = parseFloat($(".cropper-container > img").css("width"));
    		imgHeight = parseFloat($(".cropper-container > img").css("height"));
    		imgLeft = parseFloat($(".cropper-container > img").css("margin-left"));
    		imgTop = parseFloat($(".cropper-container > img").css("margin-top"));
    		imgRight = (imgWidth + imgLeft);
    		imgBottom = (imgHeight + imgTop);
    	};
    	*/
    	
    	$("#cropperTracker2").append("<h3>Image Data:</h3>");
    	$("#cropperTracker2").append("<b>Image Width: </b>" + imgWidth + "<br>");
    	$("#cropperTracker2").append("<b>Image Height: </b>" + imgHeight + "<br>");
		$("#cropperTracker2").append("<b>Image Left: </b>" + imgLeft + "<br>");
		$("#cropperTracker2").append("<b>Image Top: </b>" + imgTop + "<br>");
		$("#cropperTracker2").append("<b>Image Right: </b>" + imgRight + "<br>");
		$("#cropperTracker2").append("<b>Image Bottom: </b>" + imgBottom + "<br>");
		$("#cropperTracker2").append("<b>Image Transform: </b>" + imgTransform + "<br>");
		$("#cropperTracker2").append("<b>Image Rotation: </b>" + rotation + "<br>");
		
		$("#cropperTracker2").append("<h3>Crop Box Data:</h3>");
		$("#cropperTracker2").append("<b>Crop Box Width: </b>" + cropBoxWidth + "<br>");
		$("#cropperTracker2").append("<b>crop Box Height: </b>" + cropBoxHeight + "<br>");
		$("#cropperTracker2").append("<b>Crop Box Left: </b>" + cropBoxLeft + "<br>");
		$("#cropperTracker2").append("<b>Crop Box Top: </b>" + cropBoxTop + "<br>");
		$("#cropperTracker2").append("<b>Crop Box Right: </b>" + cropBoxRight + "<br>");
		$("#cropperTracker2").append("<b>Crop Box Bottom: </b>" + cropBoxBottom + "<br>");

		$("#cropperTracker2").append("<h3>Fitting Schema:</h3>");
    	
    	// Image is partially or completely out of the left side of the cropping area.
    	if(imgLeft > cropBoxLeft) {
    		$("#cropperTracker2").append("<b>Case#1: </b>" + imgLeft + " - " + cropBoxLeft + "<br>");
    		return false;
    	}	
    	// Image is partially or completely out of the top side of the cropping area.
    	else if(imgTop > cropBoxTop) {
    		$("#cropperTracker2").append("<b>Case#2: </b>" + imgTop + " - " + cropBoxTop + "<br>");
    		return false;
    	}	
    	// Image is partially or completely out of the right side of the cropping area.
    	else if(imgRight < cropBoxRight) {
    		$("#cropperTracker2").append("<b>Case#3: </b>" + imgRight + " - " + cropBoxRight + "<br>");
    		return false;
    	}	
    	// Image is partially or completely out of the bottom side of the cropping area.
    	else if(imgBottom < cropBoxBottom) {
    		$("#cropperTracker2").append("<b>Case#4: </b>" + imgBottom + " - " + cropBoxBottom+ "<br>");
    		return false;
    	}
    	// Image fits the cropping area.
    	else if((imgLeft <= cropBoxLeft) && (imgTop <= cropBoxTop) && 
    			(imgRight >= cropBoxRight) && (imgBottom >= cropBoxBottom) ) {
    		$("#cropperTracker2").append("<b>Case#5: </b>" + "It fits!" + "<br>");
    		return true;
    	}
    	else {
    		$("#cropperTracker2").append("<b>Case#6: </b>" + "Something Happened Here!" + "<br>");
    		return false;
    	}
    	
    },
    
    // Clear the crop box.
    clear: function () {
      var cropBox = this.cropBox;

      if(!this.cropped || this.disabled) {
        return;
      }

      this.cropped = false;
      cropBox.left = 0;
      cropBox.top = 0;
      cropBox.width = 0;
      cropBox.height = 0;
      this.renderCropBox();

      this.$canvas.removeClass(CLASS_MODAL);
      this.$cropBox.addClass(CLASS_HIDDEN);
    },

    // Destroy the cropper and remove the instance from the image.
    destroy: function () {
      var $this = this.$element;

      if(!this.ready) {
        this.$clone.off('load').remove();
      }

      this.unbuild();
      $this.removeClass(CLASS_HIDDEN).removeData('cropper');
    },

    // Replace the image and rebuild the cropper.
    replace: function (url) {
      var _this = this,
          $this = this.$element,
          canvas,
          context;

      if(!this.disabled && url && url !== this.url && url !== $this.attr('src')) {
        if($this.is('img')) {
          $this.attr('src', url);
          this.load();
        }
        else if($this.is('canvas') && support.canvas) {
          canvas = $this[0];
          context = canvas.getContext('2d');

          $('<img src="' + url + '"">').one('load', function () {
            canvas.width = this.width;
            canvas.height = this.height;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(this, 0, 0);
            _this.load();
          });
        }
      }
    },

    // Enable (unfreeze) the cropper.
    enable: function () {
      if(this.built) {
        this.disabled = false;
        this.$cropper.removeClass(CLASS_DISABLED);
      }
    },

    // Disable (freeze) the cropper.
    disable: function () {
      if(this.built) {
        this.disabled = true;
        this.$cropper.addClass(CLASS_DISABLED);
      }
    },

    // Move the image.
    move: function (offsetX, offsetY) {
      var image = this.image;

      if(!this.disabled && isNumber(offsetX) && isNumber(offsetY)) {
        image.left += offsetX;
        image.top += offsetY;      
        this.renderImage(true);
      }
    },
    
    // Zoom the image.
    zoom: function (delta) {
        var image = this.image, width, height, zoomDelta;

        delta = num(delta);        
        zoomFactor = num(zoomFactor);
        zoomDelta = num(delta);
        
        var CROP_BOX_OUTER_MARGIN = num(15.0);
        
        if(delta && this.built && !this.disabled && this.options.zoomable) {
        	
        	delta = delta <= -1 ? 1 / (1 - delta) : delta <= 1 ? (1 + delta) : delta;
	        width = image.width * delta;
            height = image.height * delta;
            
        	if((width > ((this.cropBox.width) + CROP_BOX_OUTER_MARGIN)) && (width < imageMaxWidth) && 
        	   (height > ((this.cropBox.height) + CROP_BOX_OUTER_MARGIN)) && (height < imageMaxHeight)) {
        		
	        	// Zoom In - Make the image larger.
	        	if(zoomFactor > 0 && zoomFactor < ZOOM_MAX) {

			        image.left -= (width - image.width) / 2;
			        image.top -= (height - image.height) / 2;
			        image.width = width;
			        image.height = height;
			        this.renderImage(true);
			        this.setDragMode('move');
			        
			        // wh - Increase the Zoom Factor.
			        zoomFactor = decimalNumber((zoomFactor + zoomDelta), 3);
			        
			        if(zoomFactor == ZOOM_MAX) {
			        	zoomLock = true;
			        }
    
			        imageLeft = image.left;
			        imageTop = image.top;
			        imageWidth = image.width;
			        imageHeight = image.height;
			        pictureDimensions[0] = imageLeft;
			        pictureDimensions[1] = imageTop;
			        pictureDimensions[2] = imageWidth;
			        pictureDimensions[3] = imageHeight;
	        	}
	        	// Zoom Out - Make the image smaller.
	        	else if((zoomFactor >= ZOOM_MAX) && (zoomDelta <= -ZOOM_DELTA) && zoomLock == true) {
	        		zoomFactor = decimalNumber((zoomFactor + zoomDelta), 3);
	        		zoomLock = false;
	        		this.zoom(-ZOOM_DELTA);      		
	        	}
        	}
        }
    },
    
    // Rotate the image.
    rotate: function (degree) {
      var image = this.image;

      degree = num(degree) || 0;

      if(degree !== 0 && this.built && !this.disabled && this.options.rotatable) {
        image.rotate = (image.rotate + degree) % 360;
        degreeOfRotation = image.rotate;
        this.renderImage(true);
      }
    },
    
    // wh - Get the image degree of rotation.
    getDegreeOfRotation: function() {
    	return degreeOfRotation;
    },
    
    // wh - Get the image EXIF orientation.
    getImageOrientation: function() {
    	
    	switch(degreeOfRotation) {
	    	case 0:
	    		imageOrientation = 1;
	        	break;
	        case 90:
	        	imageOrientation = 6;
	        	break;
	        case 180:
	        	imageOrientation = 3;
	        	break;
	        case 270:
	        	imageOrientation = 8;
	        	break;
	        case 360:
	        	imageOrientation = 1;	        	
	        case -90:
	        	imageOrientation = 8;
	        	break;
	        case -180:
	        	imageOrientation = 3;
	        	break;
	        case -270:
	        	imageOrientation = 6;
	        	break;
	        case -360:
	        	imageOrientation = 1;
	        	break;		
	        default:
	        	imageOrientation = 1;
	        	degreeOfRotation = 0;
		}
    	return imageOrientation;   	
    },
	
    // wh - Get the zoom factor.
    getZoomFactor: function() {
    	return zoomFactor;
    },
    
    // wh - Get the image url.
	getImageURL: function() {
		var url = this.url;
		return url;
	},
	
	// Get the cropped area data in the original image for cropping image.
    getData: function (rounded) {
      var cropBox = this.cropBox,
          image = this.image,
          rotate = image.rotate,
          ratio,
          data;

      if(this.built && this.cropped) {
        data = {
          x: cropBox.left - (rotate ? image.rotatedLeft : image.left),
          y: cropBox.top - (rotate ? image.rotatedTop : image.top),
          width: cropBox.width,
          height: cropBox.height
        };

        ratio = image.width / image.naturalWidth;

        $.each(data, function (i, n) {
          n = n / ratio;
          data[i] = rounded ? round(n) : n;
        });

        data.rotate = rotate;
      } 
      else {
        data = {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          rotate: rotate
        };
      }     
      return data;
    },

    // Get the cropped data.
    getCroppedInfo: function (rounded) {
        var cropBox = this.cropBox,
            image = this.image, ratio, data;
        
        var imageLeft = image.left;
	    
        if(imageLeft == null || imageLeft === 'undefined' || imageLeft == "") {
        	imageLeft = 0;
	    }
	      
	    var imageTop = image.top;
	      
	    if(imageTop == null || imageTop === 'undefined' || imageTop == "") {
	    	imageTop = 0;
	    }

        if(this.built && this.cropped) {
          data = {
            x: cropBox.left - imageLeft,
            y: cropBox.top - imageTop,
            width: cropBox.width,
            height: cropBox.height
          };
          
          ratio = image.width / image.naturalWidth;

          $.each(data, function (i, n) {
            n = n / ratio;
            data[i] = rounded ? round(n) : n;
          });

        } 
        else {
          data = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          };
        }
        return data;
    },   
    
    // Get the image data.
    getImageData: function (all) {
      var image = this.image,
          data = {};

      if(this.built) {
        $.extend(data, all ? image : {          
          left: image.left,
          top: image.top,
          right: (image.left + image.width),
          bottom: (image.top + image.height),
          width: image.width,
          height: image.height
        });
      }
      return data;
    },
    
    // wh - Get the complete image data.
    getCompleteImageData: function(imgData, cBoxData) {
    	
    	var imageData = imgData;
    	var cropBoxData = cBoxData;
    	var imgLeftOverFlow = 0;
    	var imgTopOverFlow = 0;
   	
    	// Image width.
    	var imgWidth = roundNoPX(imageData.width, 3);
    	// Image height.
    	var imgHeight = roundNoPX(imageData.height, 3);
    	
    	// Image left side.
    	var imgLeft = roundNoPX(imageData.left, 3);
    	if(imgLeft < 0) {
    		imgLeftOverFlow = absRoundNoPX(imgLeft, 3);
    		imgLeft = roundNoPX(cBoxData.left, 3);
    	}
    	
    	// Image top side.
    	var imgTop = roundNoPX(imageData.top, 3);
    	if(imgTop < 0) {
    		imgTopOverFlow = absRoundNoPX(imageData.top, 3);
    		imgTop = roundNoPX(cBoxData.top, 3);
    	}
    	
    	// Image right side.
    	var imgRight = 0
    	if(imgLeftOverFlow == 0) {
    		imgRight = roundNoPX((imgWidth + imgLeft), 3);
    	}
    	else if(imgLeftOverFlow > 0) {
    		imgRight = roundNoPX((imgWidth - imgLeftOverFlow), 3);
    	}
    	
    	// Image bottom side.
    	var imgBottom = 0;
    	if(imgTopOverFlow == 0) {
    		imgBottom = roundNoPX((imgHeight + imgTop), 3);
    	}
    	else if(imgTopOverFlow > 0) {
    		imgBottom = roundNoPX((imgHeight - imgTopOverFlow), 3);
    	}
    	
    	this.image.width = imgWidth;
    	this.image.height = imgHeight;
    	this.image.left = imgLeft;
    	this.image.top = imgTop;
    	this.image.right = imgRight;
    	this.image.bottom = imageBottom;
    	this.image.rotate = imageData.rotate;
    	this.image.rotatedWidth = imgWidth;
    	this.image.rotatedHeight = imgHeight;
    	this.image.rotatedLeft = imgLeft;
    	this.image.rotatedTop = imgTop;
    	this.image.transform = $(".cropper-container > img").css("transform");
    	
    	var completeImageData = this.image;
    	
    	return completeImageData;

    },

    // Set the image data.
    setImageData: function (data) {
      var image = this.image;

      if(this.built && !this.disabled && $.isPlainObject(data)) {
        if(isNumber(data.left)) {
          image.left = data.left;
        }

        if(isNumber(data.top)) {
          image.top = data.top;
        }

        if(isNumber(data.width)) {
          image.width = data.width;
          image.height = image.width / image.aspectRatio;
        } 
        else if(isNumber(data.height)) {
          image.height = data.height;
          image.width = image.height * image.aspectRatio;
        }

        this.renderImage(true);
      }
    },

    // Get the crop box size and position.
    getCropBoxData: function () {
      var data = {}, cropBox;
      
      // Canvas Data.
      var canvasData = this.$canvas;
      var canvasElement = canvasData.get(0);
      var canvasWidth = canvasElement.clientWidth;
      var canvasHeight = canvasElement.clientHeight;
      
      if(this.cropped) {
        cropBox = this.cropBox;
        
        // Crop Box Data.
        var cropBoxWidth = cropBox.width;
        var cropBoxHeight = cropBox.height;
        var cropBoxLeft = (canvasWidth - cropBoxWidth)/2;
        var cropBoxTop = (canvasHeight - cropBoxHeight)/2;
        
        data = {
          width: cropBoxWidth,
          height: cropBoxHeight,
          left: cropBoxLeft,
          top: cropBoxTop,
          right: (cropBoxLeft + cropBoxWidth),
          bottom: (cropBoxTop + cropBoxHeight)                    
        };
      }
      return data;
    },
    
    // Get the crop box size and position for non-iOS.
    getCropBoxDataForNonIOS: function (cWidth, cHeight) {
      var data = {}, cropBox;
           
      if(this.cropped) {
        cropBox = this.cropBox;
        
        // Crop Box Data.
        var cropBoxWidth = cropBox.width;
        var cropBoxHeight = cropBox.height;
        var cropBoxLeft = (cWidth - cropBoxWidth)/2;
        var cropBoxTop = (cHeight - cropBoxHeight)/2;
        
        data = {
          width: cropBoxWidth,
          height: cropBoxHeight,
          left: cropBoxLeft,
          top: cropBoxTop,
          right: (cropBoxLeft + cropBoxWidth),
          bottom: (cropBoxTop + cropBoxHeight)                    
        };
      }
      return data;
    },    

    // Change the crop box's position and size.
    setCropBoxData: function (data) {
      var cropBox = this.cropBox,
          aspectRatio = this.options.aspectRatio;

      if(this.cropped && !this.disabled && $.isPlainObject(data)) {

        if(isNumber(data.left)) {
          cropBox.left = data.left;
        }

        if(isNumber(data.top)) {
          cropBox.top = data.top;
        }

        if(aspectRatio) {
          if(isNumber(data.width)) {
            cropBox.width = data.width;
            cropBox.height = cropBox.width / aspectRatio;
          }
          else if(isNumber(data.height)) {
            cropBox.height = data.height;
            cropBox.width = cropBox.height * aspectRatio;
          }
        } 
        else {
          if(isNumber(data.width)) {
            cropBox.width = data.width;
          }

          if(isNumber(data.height)) {
            cropBox.height = data.height;
          }
        }
        this.renderCropBox();
      }
    },

    // Set the aspect ratio of the crop box.
    setAspectRatio: function (aspectRatio) {
      var options = this.options;

      if(!this.disabled && !isUndefined(aspectRatio)) {
        options.aspectRatio = abs(num(aspectRatio)) || NaN;

        if(this.built) {
          this.initCropBox();
        }
      }
    },

    // Set the drag mode.
    setDragMode: function (mode) {
      var $canvas = this.$canvas,
          cropable = false,
          movable = false;

      if(!this.ready || this.disabled) {
        return;
      }

      switch(mode) {
        
      	case 'crop':
          if(this.options.dragCrop) {
            cropable = true;
            $canvas.data(STRING_DIRECTIVE, mode);
          } 
          else {
            movable = true;
          }

          break;

        case 'move':
          movable = true;
          $canvas.data(STRING_DIRECTIVE, mode);

          break;

        default:
          $canvas.removeData(STRING_DIRECTIVE);
      }

      $canvas.toggleClass(CLASS_CROP, cropable).toggleClass(CLASS_MOVE, movable);
    }
  });

  // Respond to image and cropbox changes.
  prototype.change = function () {
	  
    var directive = this.directive,
        image = this.image,
        maxWidth = containerWidth,
        maxHeight = containerHeight,
        cropBox = this.cropBox,
        width = cropBox.width,
        height = cropBox.height,
        left = cropBox.left,
        top = cropBox.top,
        right = left + width,
        bottom = top + height,
        renderable = true,
        aspectRatio = this.options.aspectRatio,
        range = {
          x: this.endX - this.startX,
          y: this.endY - this.startY
        },
        offset;

    if(aspectRatio) {
      range.X = range.y * aspectRatio;
      range.Y = range.x / aspectRatio;
    }

    switch(directive) {
      
      // Move cropBox.
      case 'all':
        left += range.x;
        top += range.y;
        break;
        
      // Move image.
      case 'move':
        image.left += range.x;
        image.top += range.y;
        this.renderImage(true);
        renderable = false;
        break;

      // Scale image.
      case 'zoom':
        this.zoom(function (x, y, x1, y1, x2, y2) {
          return (sqrt(x2 * x2 + y2 * y2) - sqrt(x1 * x1 + y1 * y1)) / sqrt(x * x + y * y);
        }(
          image.width,
          image.height,
          abs(this.startX - this.startX2),
          abs(this.startY - this.startY2),
          abs(this.endX - this.endX2),
          abs(this.endY - this.endY2)
        ));

        this.endX2 = this.startX2;
        this.endY2 = this.startY2;
        renderable = false;
        break;

      // Crop the image.
      case 'crop':
        if(range.x && range.y) {
          offset = this.$cropper.offset();
          left = this.startX - offset.left;
          top = this.startY - offset.top;
          width = cropBox.minWidth;
          height = cropBox.minHeight;
         
          // Show the cropBox if is hidden
          if(!this.cropped) {
            this.cropped = true;
            this.$cropBox.removeClass(CLASS_HIDDEN);
          }
        }

        break;

      // No default
    }

    if(renderable) {
      cropBox.width = width;
      cropBox.height = height;
      cropBox.left = left;
      cropBox.top = top;
      this.directive = directive;

      this.renderCropBox();
    }

    // Override
    this.startX = this.endX;
    this.startY = this.endY;
  };

  $.extend(Cropper.prototype, prototype);

  // Cropper default variables.
  Cropper.DEFAULTS = {
    
    // Defines the aspect ratio of the crop box.
    // Type: Number.
    aspectRatio: NaN,

    // Defines the percentage of automatic cropping area when initializes.
    // Type: Number (Must large than 0 and less than 1).
    autoCropArea: 0.8, // 80%.

    // Outputs the cropping results.
    // Type: Function.
    crop: null,

    // Add extra containers for previewing.
    // Type: String (jQuery selector).
    preview: '',

    // Toggles.
    global: true, 			// Bind the main events to the document (Only allow one global cropper per page).
    responsive: true, 		// Rebuild when resize the window.
    checkImageOrigin: true, // Check if the target image is cross origin.

    modal: true, 			// Show the black modal.
    guides: true, 			// Show the dashed lines for guiding.
    highlight: true, 		// Show the white modal to highlight the crop box.
    background: true, 		// Show the grid background.

    autoCrop: true, 		// Enable to crop the image automatically when initialize.
    dragCrop: true, 		// Enable to create new crop box by dragging over the image.
    movable: true, 			// Enable to move the crop box.
    resizable: true, 		// Enable to resize the crop box.
    rotatable: true, 		// Enable to rotate the image.
    zoomable: true, 		// Enable to zoom the image.
    touchDragZoom: true, 	// Enable to zoom the image by wheeling mouse.
    mouseWheelZoom: true, 	// Enable to zoom the image by dragging touch.

    // Dimensions.
    minCropBoxWidth: 0,
    minCropBoxHeight: 0,
    minContainerWidth: 300,
    minContainerHeight: 150,

    // Event Functions.
    build: null,
    built: null,
    dragstart: null,
    dragmove: null,
    dragend: null
  };

  // Set cropper defaults.
  Cropper.setDefaults = function (options) {
    $.extend(Cropper.DEFAULTS, options);
  };
  
  // Cropper template to display the canvas, cropbox and viewer.
  Cropper.TEMPLATE = (function (source, words) {
    words = words.split(',');
    return source.replace(/\d+/g, function (i) {
      return words[i];
    });
  })('<0 6="5-container"><0 6="5-canvas"></0><0 6="5-cropbox"><1 6="5-viewer"></1><1 6="5-8 8-h"></1><1 6="5-8 8-v"></1><1 6="5-face" 3-2="all"></1>','div,span,directive,data,point,cropper,class,line');

  // Save the other cropper.
  Cropper.other = $.fn.cropper;

  // Register as jQuery plugin.
  $.fn.cropper = function (options) {
    var args = toArray(arguments, 1),
        result;

    this.each(function () {
      var $this = $(this),
          data = $this.data('cropper'),
          fn;

      if(!data) {
        $this.data('cropper', (data = new Cropper(this, options)));
      }

      if(typeof options === 'string' && $.isFunction((fn = data[options]))) {
        result = fn.apply(data, args);
      }
    });
    return !isUndefined(result) ? result : this;
  };

  $.fn.cropper.Constructor = Cropper;
  $.fn.cropper.setDefaults = Cropper.setDefaults;

  // No conflict
  $.fn.cropper.noConflict = function () {
    $.fn.cropper = Cropper.other;
    return this;
  };

});
