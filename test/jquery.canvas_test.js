/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('jQuery#canvas', {
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', 1, function() {
    // Not a bad test to run on collection methods.
    strictEqual(this.elems.canvas(), this.elems, 'should be chaninable');
  });
  
  test('functions are accessible', 7, function() {
    var data = this.elems.canvas().data('canvas');
    
    strictEqual(typeof data.addSquare,   'function', 'add square function should be available');
    strictEqual(typeof data.addCircle,   'function', 'add circle function should be available');
    strictEqual(typeof data.addTriangle, 'function', 'add triangle function should be available');
    strictEqual(typeof data.clear,       'function', 'clear function should be available');
    strictEqual(typeof data.setAnim,     'function', 'set animation function should be available');
    strictEqual(typeof data.startAnim,   'function', 'start animation function should be available');
    strictEqual(typeof data.stopAnim,    'function', 'stop animation function should be available');
  });

  test('animation starts and stops', 3, function() {
    var data = this.elems.canvas().data('canvas');
    data.setAnim(function() { });

    strictEqual(data.animating, false, 'should not be animating');
    data.startAnim();
    strictEqual(data.animating, true, 'should start animating');
    data.stopAnim();
    strictEqual(data.animating, false, 'should stop animating');
  });
  
  module('jQuery.canvas');

}(jQuery));
