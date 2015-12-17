# saveSvgAsPng

## Installation

```
npm install save-svg-as-png
```

## Usage

To save a PNG, include the script `saveSvgAsPng.js` in your page, then call the `saveSvgAsPng` function with an SVG node and a filename:

```javascript
saveSvgAsPng(document.getElementById("diagram"), "diagram.png");
```

The filename is the preferred filename when saving the image to the file system. The browser may change the name of the file if there is already a file by that name in the target directory.

If you want to scale the image up or down, you can pass a scale factor in an options object:

```javascript
saveSvgAsPng(document.getElementById("diagram"), "diagram.png", {scale: 0.5});
```

Other options are documented below.

If you just want a dataURI for an SVG, you can call `svgAsDataUri` with an SVG node, options, and a callback:

```javascript
svgAsDataUri(document.getElementById("diagram"), {}, function(uri) {
  ...
});
```

If you want a dataURI of a PNG generated from an SVG, you can call `svgAsPngUri` with an SVG node, options, and a callback:

```javascript
svgAsPngUri(document.getElementById("diagram"), {}, function(uri) {
  ...
});
```

Compatible with [browserify](http://browserify.org/) and [requirejs](http://requirejs.org).

### Options

- `backgroundColor` — Creates a PNG with the given background color. Defaults to transparent.
- `left` - Specify the viewbox's left position. Defaults to 0.
- `height` - Specify the image's height. Defaults to the viewbox's height if given, or the element's non-percentage height, or the element's bounding box's height, or the element's CSS height, or the computed style's height, or 0.
- `scale` — Changes the resolution of the output PNG. Defaults to `1`, the same dimensions as the source SVG.
- `selectorRemap` — A function that takes a CSS selector and produces its replacement in the CSS that's inlined into the SVG. Useful if your SVG style selectors are scoped by ancestor elements in your HTML document.
- `top` - Specify the viewbox's top position. Defaults to 0.
- `width` - Specify the image's width. Defaults to the viewbox's width if given, or the element's non-percentage width, or the element's bounding box's width, or the element's CSS width, or the computed style's width, or 0.

## Support

Internet Explorer is not supported due to the `SecurityError` it throws when calling `toDataURL` on a canvas that's been written to.
