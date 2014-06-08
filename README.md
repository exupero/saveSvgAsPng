saveSvgAsPng
============

To save a PNG, include the script `saveSvgAsPng.js` in your page, then call the `saveSvgAsPng` function with an SVG node, a filename, and an optional scaling factor:

```javascript
saveSvgAsPng(document.getElementById("diagram"), "diagram.png", 3);
```

If you just want a dataURI for an SVG, you can call `svgAsDataUri` with an SVG node, a scaling factor, and a callback:

```javascript
svgAsDataUri(document.getElementById("diagram"), 1, function(uri) {
  ...
});
```

Compatible with browserify.
