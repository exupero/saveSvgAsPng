var test = require('tape');

test('Is loadable using requirejs', function (assert) {
	var requirejs = require('requirejs');
	requirejs(['./saveSvgAsPng'], function(saveSvgAsPng) {
		assert.ok(saveSvgAsPng, 'Loads saveSvgAsPng module.');

		var contract = {
			'svgAsDataUri': 'function',
			'svgAsPngUri': 'function',
			'saveSvgAsPng': 'function',
			'download': 'function',
			'prepareSvg': 'function',
			'saveSvg': 'function',
		};

		for (var property in saveSvgAsPng) {
			if (saveSvgAsPng.hasOwnProperty(property)) {
				var expectedType = contract[property];
				var message = 'Has ' + property + ' of type ' + expectedType;
				assert.equals(typeof saveSvgAsPng[property], expectedType, message);	
			}
		}

		assert.end();
	});
});
