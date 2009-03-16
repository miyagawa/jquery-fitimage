(function($) {
  $.fn.fitimage = function(options) {
    if (!options) options = {};
    var defaults = {
      placeholder: "data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAEBMgA7"
    };
    
    this.each(function(){
      var $el = $(this);

      // Swap the img@src with the placeholder
      var src = $el.attr('src');
      $el.attr('src', options.placeholder || defaults.placeholder);

      var width  = options.width  || $el.width();
      var height = options.height || $el.height();

      var img = new Image();
      img.onerror = function() {
        alert("error");
      };
      img.onload = function() {
        // Check if the loaded image is wide or tall
        var is_tall = this.height > this.width * height / width;
        if (is_tall) {
          size = height * this.width / this.height;
          margin = (width - size) / 2;
        } else {
          size = width * this.height / this.width;
          margin = (height - size) / 2;
        }
        if (margin < 0) margin = 0;

        // Adjust margin-* with the current value
        var adjuster = function(name, margin) {
          var current = $el.css(name);
          if (current && current.match(/^(\d+)px$/)) {
            return parseInt(RegExp.$1) + margin;
          }
          return margin;
        };

        // Update margin and width/height CSS properties
        if (is_tall) {
          $el.css({
            height: height,
            width:  size,
            "margin-left": adjuster("margin-left", margin),
            "margin-right": adjuster("margin-right", margin)
          });
        } else {
          $el.css({
            width:  width,
            height: size,
            "margin-top": adjuster("margin-top", margin),
            "margin-bottom": adjuster("margin-bottom", margin)
          });
        }

        // Finally shoves the loaded img@src
        $el.attr("src", this.src);
      };

      // load the target image and fire the callbacks
      img.src = src;
    });
  };
})(jQuery);
