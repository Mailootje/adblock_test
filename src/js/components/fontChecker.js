export function fontChecker() {
	var baseFonts = ['monospace', 'sans-serif', 'serif']
	var testString = 'abcdefghilmnopqrstuvz'
	var testSize = '72px'
	var h = document.getElementsByTagName('body')[0]
	var defaultWidth = {}
	var defaultHeight = {}

	// Create all test spans at once to batch DOM operations
	var spans = {}
	var fragment = document.createDocumentFragment()
	var container = document.createElement('div')

	// Hide container to prevent visual flash, but keep it measurable
	container.style.cssText =
		'position:absolute;left:-9999px;top:-9999px;visibility:hidden;'

	for (var i = 0; i < baseFonts.length; i++) {
		var span = document.createElement('span')
		span.style.fontSize = testSize
		span.style.fontFamily = baseFonts[i]
		span.innerHTML = testString
		spans[baseFonts[i]] = span
		container.appendChild(span)
	}

	fragment.appendChild(container)
	h.appendChild(fragment)

	// Read all measurements in one batch (single reflow)
	for (var j = 0; j < baseFonts.length; j++) {
		var font = baseFonts[j]
		defaultWidth[font] = spans[font].offsetWidth
		defaultHeight[font] = spans[font].offsetHeight
	}

	h.removeChild(container)

	this.detect = function (fontToTest) {
		var detected = false
		var testContainer = document.createElement('div')
		testContainer.style.cssText =
			'position:absolute;left:-9999px;top:-9999px;visibility:hidden;'

		var testSpans = {}

		// Create all test spans
		for (var k = 0; k < baseFonts.length; k++) {
			var testSpan = document.createElement('span')
			testSpan.style.fontSize = testSize
			testSpan.style.fontFamily = fontToTest + ',' + baseFonts[k]
			testSpan.innerHTML = testString
			testSpans[baseFonts[k]] = testSpan
			testContainer.appendChild(testSpan)
		}

		h.appendChild(testContainer)

		// Read all measurements in one batch
		for (var m = 0; m < baseFonts.length; m++) {
			var baseFont = baseFonts[m]
			var matched =
				testSpans[baseFont].offsetWidth != defaultWidth[baseFont] ||
				testSpans[baseFont].offsetHeight != defaultHeight[baseFont]
			detected = detected || matched
		}

		h.removeChild(testContainer)
		return detected
	}
}
