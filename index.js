function handleFileSelect(evt) {
  const $el = $('#filereader');
  const files = evt.target.files;
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      $el.find('.load-target').html(e.target.result);
      svgAsPngUri($el.find('.load-target svg')[0], null, uri => {
        $el.find('input').hide()
        $el.find('.preview').html('<img src="' + uri + '" />');
      });
      $el.find('.save').click(() => saveSvgAsPng($el.find('.load-target svg')[0], 'test.png'));
    };
    reader.readAsText(f);
  });
}

if (window.File && window.FileReader && window.FileList && window.Blob) {
  document.getElementById('file').addEventListener('change', handleFileSelect, false);
}

function inlineTest(title, $el, saveOptions, testOptions) {
  const svg = $el.html();
  const template = $('#inline-template').html();
  const row = $el.html(template);
  row.find('h2').text(title);
  row.find('.canvas').html(svg);

  const canvas = row.find(testOptions && testOptions.selector || 'svg')[0];
  svgAsPngUri(canvas, saveOptions)
    .then(uri => row.find('.preview').html('<img src="' + uri + '" />'));

  row.find('.save').click(() => saveSvgAsPng(canvas, 'test.png', saveOptions));
}

inlineTest('Directly in the HTML', $('#inline'));
inlineTest('With linked PNG image', $('#embedded-png'));
inlineTest('With linked SVG image', $('#embedded-svg'));
inlineTest('Sized with pixels', $('#sized-with-pixels'));
inlineTest('Sized with style', $('#sized-with-style'));
inlineTest('Sized with CSS', $('#sized-with-css'));
inlineTest('At a higher resolution', $('#scaling'), {scale: 2});
inlineTest('When CSS styling selectors are prefixed', $('#selectors-prefixed'), {
  selectorRemap: s => s.replace('#selectors-prefixed ', '')
});
inlineTest('Modifying the style', $('#modified-style'), {
  modifyStyle: s => s.replace('green', 'red')
});
inlineTest('Modifying the whole CSS rule', $('#modified-css'), {
  modifyCss: (selector, properties) => {
    selector = selector.replace('#selectors-prefixed ', '');
    properties = properties.replace('green', 'blue');
    return selector + '{' + properties + '}';
  }
});
inlineTest('Exporting a group within an SVG', $('#group'), null, {
  selector: '#sub-group'
});
inlineTest('Percentage Height and Width', $('#percentage-size'));
inlineTest('Background color', $('#background-color'), {backgroundColor: 'lightblue'});
inlineTest('Pan and Zoom', $('#pan-and-zoom'), {
  left: -50,
  top: -50,
  width: 300,
  height: 300
});
inlineTest('With Unicode characters', $('#unicode'));
inlineTest('With gradients', $('#gradient'));
inlineTest('With foreign objects', $('#foreign-object'));
inlineTest('With opacity', $('#opacity'));
inlineTest('When setting xmlns on foreign object children', $('#xmlns-override'));
inlineTest('When using HTML entites', $('#entities'));
inlineTest('Transformed text', $('#transformed-text'));
inlineTest('With custom fonts', $('#custom-font'));

const $sandbox = $('#sandbox');
$sandbox.find('.render').click(() => {
  $sandbox.find('.error').hide().text('');
  $sandbox.find('.load-target').html($('#sandbox textarea').val());
  const canvas = $sandbox.find('.load-target svg')[0];
  try {
    svgAsPngUri(canvas, null, uri => $sandbox.find('.preview').html('<img src="' + uri + '" />'));
    $sandbox.find('.save').unbind('click').click(() => saveSvgAsPng(canvas, 'test.png'));
  } catch(err) {
    $sandbox.find('.error').show().text(err.message);
    $sandbox.find('.preview').html('');
  }
});
