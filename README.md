# saveSvgAsPng

## Installation

```
npm install save-svg-as-png
```

## Prerequisites

SaveSvgAsPng relies on JavaScript promises, so any browsers that don't natively support the standard `Promise` object will need to have a polyfill.

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

If you just want a dataURI for an SVG, you can call `svgAsDataUri`, which returns a promise:

```javascript
svgAsDataUri(document.getElementById("diagram"), options).then(uri => ...);
```

If you want a dataURI of a PNG generated from an SVG, you can call `svgAsPngUri`, which also returns a promise:

```javascript
svgAsPngUri(document.getElementById("diagram"), options).then(uri => ...);
```

Compatible with [browserify](http://browserify.org/) and [requirejs](http://requirejs.org).

If you want to use TypeScript, necessary [type definitions](https://github.com/martianov/typed-save-svg-as-png) are available in [Typings](https://github.com/typings/typings) [public registry](https://github.com/typings/registry).

### Options

- `backgroundColor` — Creates a PNG with the given background color. Defaults to transparent.
- `canvg` - If canvg is passed in, it will be used to write svg to canvas. This will allow support for Internet Explorer
- `encoderOptions` - A Number between 0 and 1 indicating image quality. The default is 0.8
- `encoderType` - A DOMString indicating the image format. The default type is image/png.
- `fonts` - A list of `{text, url, format}` objects the specify what fonts to inline in the SVG. Omitting this option defaults to auto-detecting font rules.
- `height` - Specify the image's height. Defaults to the viewbox's height if given, or the element's non-percentage height, or the element's bounding box's height, or the element's CSS height, or the computed style's height, or 0.
- `left` - Specify the viewbox's left position. Defaults to 0.
- `modifyCss` - A function that takes a CSS rule's selector and properties and returns a string of CSS. Supercedes `selectorRemap` and `modifyStyle`. Useful for modifying properties only for certain CSS selectors.
- `modifyStyle` - A function that takes a CSS rule's properties and returns a string of CSS. Useful for modifying properties before they're inlined into the SVG.
- `scale` — Changes the resolution of the output PNG. Defaults to `1`, the same dimensions as the source SVG.
- `selectorRemap` — A function that takes a CSS selector and produces its replacement in the CSS that's inlined into the SVG. Useful if your SVG style selectors are scoped by ancestor elements in your HTML document.
- `top` - Specify the viewbox's top position. Defaults to 0.
- `width` - Specify the image's width. Defaults to the viewbox's width if given, or the element's non-percentage width, or the element's bounding box's width, or the element's CSS width, or the computed style's width, or 0.
- `excludeUnusedCss` - Exclude CSS rules that don't match any elements in the SVG.
- `excludeCss` - Exclude all CSS rules

### Testing

run tests with [tape](https://www.npmjs.com/package/tape)
```bash
npm test
```

## Support

[Chrome limits data URIs to 2MB](http://stackoverflow.com/questions/695151/data-protocol-url-size-limitations/41755526#41755526), so you may have trouble generating PNGs beyod a certain size.

Internet Explorer will only work if [canvg](https://github.com/canvg/canvg) is passed in, otherwise it will throw a `SecurityError` when calling `toDataURL` on a canvas that's been written to. [canvg](https://github.com/canvg/canvg) may have it's own issues with SVG support, so make sure to test the output.
