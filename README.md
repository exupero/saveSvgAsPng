saveSvgAsPng
============

To save a PNG, include the script `saveSvgAsPng.js` in your page, then call the `saveSvgAsPng` function with an SVG node, a filename, and an optional scaling factor:

```javascript
saveSvgAsPng(document.getElementById("diagram"), "diagram.png", 3);
```

The filename is the preferred filename when saving the image to the file system. The browser may change the name of the file if there is already a file by that name in the target directory.

If you just want a dataURI for an SVG, you can call `svgAsDataUri` with an SVG node, a scaling factor, and a callback:

```javascript
svgAsDataUri(document.getElementById("diagram"), 1, function(uri) {
  ...
});
```

Compatible with browserify.

Browser Support
---------------

saveSvgAsPng relies on the canvas element's `toDataURL`, which throws a SecurityError in IE. 
