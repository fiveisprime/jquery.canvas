/*
 * jquery.canvas
 * https://github.com/fiveisprime/jquery.canvas
 *
 * Copyright (c) 2012 Matt Hernandez
 * Licensed under the MIT, GPL licenses.
 */

(function($, window) {
  'use strict';
  
  /**
   * Initializes a new canvas object using the specified canvas element and
   * options.
   * @param {object} element The element containing the canvas/
   * @param {object} options The options object for setting up this canvas.
   *
   * @constructor
   * @name jQuery.canvas.Canvas
   */
  var Canvas = function(element, options) {
    /**
     * The canvas HTML element.
     * @name jQuery.canvas.Canvas#canvas
     */
    this.canvas = element;
    
    /**
     * The 2D context for this canvas.
     * @name jQuery.canvas.Canvas#context
     */
    this.context = this.canvas.getContext('2d');
    
    
    /**
     * Value indicating whether this canvas is animating.
     * @name jQuery.canvas.Canvas#animating
     */
    this.animating = false;
    
    /**
     * The width of the canvas area.
     * @name jQuery.canvas.Canvas#width
     */
    this.width = this.canvas.width;
    
    /**
     * The height of the canvas area.
     * @name jQuery.canvas.Canvas#height
     */
    this.height = this.canvas.height;
    
    /* Private members
     * ------------------------------ */
    
    this._timeInterval = 0;
    this._frame        = 0;
    this._options      = options;
    
    /* Global configuration
     * ------------------------------ */
    
    this.context.globalAlpha   = this._options.alpha;
    this.context.shadowColor   = this._options.shadowColor;
    this.context.shadowBlur    = this._options.shadowBlur;
    this.context.shadowOffsetX = this._options.shadowOffsetX;
    this.context.shadowOffsetY = this._options.shadowOffsetY;
    
    window.AnimationFrame = (function(callback) {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
          // fallback to 60 FPS.
          window.setTimeout(callback, 1000 / 60);
        };
    }());
  };
  
  Canvas.prototype = {
      /**
       * Adds a circle with the specified size and color to the canvas area.
       * @param {object} pos The position to place the circle within the canvas area.
       * @param {number} size The size of the circle to add.
       * @param {string} color The color of the circle.
       * @param {number} lineWidth The width of the outline for the circle.
       * @param {string} strokeStyle The color of the stroke (outline).
       *
       * @example $.canvas().addCircle({x: 5, y: 5}, 20, 'purple', 2, 'black');
       *
       * @method
       * @name jQuery.canvas.Canvas#addCircle
       */
      addCircle: function(pos, size, color, lineWidth, strokeStyle) {
        this.context.beginPath();
        this.context.arc(pos.x, pos.y, size, 0, 2 * Math.PI, false);
        this.context.fillStyle = color || 'cyan';
        this.context.fill();
        this.context.lineWidth = lineWidth || 2;
        this.context.strokeStyle = strokeStyle || 'black';
        this.context.stroke();
        
        return this;
      }
      /**
       * Adds a square with the specified size and color to the canvas area.
       * @param {object} pos The position to place the circle within the canvas area.
       * @param {object/number} size The size of the square to add. Accepts a number or
       * and object containing width and width values.
       * @param {string} color The color of the square.
       * @param {number} lineWidth The width of the outline for the square.
       * @param {string} strokeStyle The color of the stroke (outline).
       *
       * @example
       * $.canvas().addSquare({x: 5, y: 5}, 20, 'purple', 2, 'black');
       * $.canvas().addSquare({x: 5, y: 5}, { height: 20, width: 10 }, 'purple', 2, 'black');
       *
       * @method
       * @name jQuery.canvas.Canvas#addSquare
       */
    , addSquare: function(pos, size, color, lineWidth, strokeStyle) {
        if (typeof size === 'number') { size = { height: size, width: size }; }
        this.context.beginPath();
        this.context.rect(pos.x, pos.y, size.width, size.height);
        this.context.fillStyle = color || 'cyan';
        this.context.fill();
        this.context.lineWidth = lineWidth || 2;
        this.context.strokeStyle = strokeStyle || 'black';
        this.context.stroke();
        
        return this;
      }
      /**
       * Adds a triangle with the specified size and color to the canvas area.
       * @param {object} pos The position to place the triangle within the canvas area.
       * @param {object/number} size The size of the triangle to add. Accepts a number or
       * and object containing width and width values.
       * @param {string} color The color of the triangle.
       * @param {number} lineWidth The width of the outline for the triangle.
       * @param {string} strokeStyle The color of the stroke (outline).
       *
       * @example
       * $.canvas().addTriangle({x: 5, y: 5}, 20, 'blue', 2, 'black');
       * $.canvas().addTriangle({x: 5, y: 5}, { height: 20, width: 10 }, 'blue', 2, 'black');
       *
       * @method
       * @name jQuery.canvas.Canvas#addTriangle
       */
    , addTriangle: function(pos, size, color, lineWidth, strokeStyle) {
        if (typeof size === 'number') { size = { height: size, width: size }; }
        this.context.beginPath();
        this.context.moveTo(pos.x, pos.y);
        this.context.lineTo(pos.x + size.width / 2, pos.y + size.height);
        this.context.lineTo(pos.x - size.width / 2, pos.y + size.height);
        this.context.closePath();
        this.context.fillStyle = color || 'cyan';
        this.context.fill();
        this.context.lineWidth = lineWidth || 2;
        this.context.strokeStyle = strokeStyle || 'black';
        this.context.stroke();
      }
      /**
       * This function is called on each frame and calls the anim function.
       * @method
       * @private
       * @name jQuery.canvas.Canvas#animationLoop
       */
    , animationLoop: function() {
        var that = this
          , thisTime = new Date().getTime();
      
        this._frame++;
        this._timeInterval = thisTime - this.lastTime;
        this.lastTime = thisTime;
      
        this.anim && this.anim();
        if (this.animating) {
          window.AnimationFrame(function() {
            that.animationLoop();
          });
        }

        return this;
      }
      /**
       * Sets the animation function that will be called for each animation
       * cycle.
       * @param {function} func The animation function.
       *
       * @method
       * @name jQuery.canvas.Canvas#setAnim
       */
    , setAnim: function(func) {
        this.anim = func;
        return this;
      }
      /**
       * Clears the canvas area.
       *
       * @method
       * @name Canvas#clear
       */
    , clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return this;
      }
      /**
       * Starts the animation loop which runs the animation function on each
       * frame.
       *
       * @method
       * @name jQuery.canvas.Canvas#startAnim
       */
    , startAnim: function() {
        this.animating = true;
        this.startTime = new Date().getTime();
        this.lastTime = this.startTime;
      
        // Update the anim then start the animation loop.
        this.anim && this.anim();
        this.animationLoop();
        return this;
      }
      /**
       * Stops the animation loop.
       *
       * @method
       * @name jQuery.canvas.Canvas#stopAnim
       */
    , stopAnim: function() {
      this.animating = false;
      return this;
    }
  };

  /* Plugin definition
   * ------------------------------ */
   
  /**
   * This plugin augments John Resig's JavaScript library.
   * @namespace jQuery
   */
   
  /**
   * Plugin for handling common tasks with the HTML5 canvas element.
   * @namespace jQuery.canvas
   */
  $.fn.canvas = function(option) {
    return this.each(function() {
      var $this = $(this)
        , data = $this.data('canvas')
        , options = $.extend({}, $.fn.canvas.defaults, typeof option === 'object' && option);
      
      if (!$this.is('canvas')) { throw new Error('requires a canvas element'); }
      
      if (!data) {
        $this.data('canvas', (data = new Canvas(this, options)));
      }
    });
  };
  
  /**
   * Default options for the canvas plugin.
   * @name jQuery.canvas#options
   * @default
   * {
   *     alpha: 1
   *   , shadowBlur: 0
   *   , shadowColor: 'gray'
   *   , shadowOffsetX: 0
   *   , shadowOffsetY: 0
   * }
   */
  $.fn.canvas.defaults = {
      alpha: 1
    , shadowBlur: 0
    , shadowColor: 'gray'
    , shadowOffsetX: 0
    , shadowOffsetY: 0
  };
  
  $.fn.canvas.constructor = Canvas;

}(jQuery, window));
