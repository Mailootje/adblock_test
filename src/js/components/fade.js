// ** FADE OUT FUNCTION **
export function fadeOut(el, callback) {
	var duration = 200
	var called = false

	function done() {
		if (called) return
		called = true
		el.style.display = 'none'
		el.style.transition = ''
		el.style.opacity = ''
		if (callback) callback()
	}

	// Set initial state and transition
	el.style.opacity = '1'
	el.style.transition = 'opacity ' + duration + 'ms ease-out'

	// Force reflow to ensure transition runs
	void el.offsetWidth

	// Start fade
	el.style.opacity = '0'

	// Handle transition end
	el.addEventListener('transitionend', done, { once: true })

	// Fallback timeout in case transitionend doesn't fire
	setTimeout(done, duration + 50)
}

// ** FADE IN FUNCTION **
export function fadeIn(el, display) {
	var duration = 200

	function done() {
		el.style.transition = ''
	}

	// Set initial state
	el.style.opacity = '0'
	el.style.display = display || 'block'
	el.style.transition = 'opacity ' + duration + 'ms ease-in'

	// Force reflow to ensure transition runs
	void el.offsetWidth

	// Start fade
	el.style.opacity = '1'

	// Clean up after transition
	el.addEventListener('transitionend', done, { once: true })

	// Fallback timeout
	setTimeout(done, duration + 50)
}
