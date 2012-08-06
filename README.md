## Overview

Plugin for handling common tasks with the HTML5 canvas element.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/fiveisprime/jquery.canvas/master/dist/jquery.canvas.min.js
[max]: https://raw.github.com/fiveisprime/jquery.canvas/master/dist/jquery.canvas.js

In your web page:

    <script src="jquery.js"></script>
    <script src="dist/jquery.canvas.min.js"></script>
    <script>
      var canvas = $('#my-canvas').canvas().data('canvas');
      canvas.addSquare({ x: 5, y: 5 }, 10, 'red', 1, 'black');
    </script>


## Documentation
Class documentation is available [here](http://fiveisprime.github.com/jquery.canvas/docs/).

_Generated using [docco-husky](https://github.com/mbrevoort/docco-husky) because it's super awesome_

## Examples
Working examples are [here](http://fiveisprime.github.com/jquery.canvas) and [here](http://fiveisprime.github.com/jquery.canvas/fixed-anim.html).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Matt Hernandez  
Licensed under the MIT, GPL licenses.
