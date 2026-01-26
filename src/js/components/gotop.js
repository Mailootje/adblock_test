export function gotop() {
	var el = this
	el.gt = document.getElementById('gt-link')
	el.scrollToTop = function () {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth'
		})
	}
	el.listeners = function () {
		var ticking = false
		var lastKnownState = null
		window.addEventListener(
			'scroll',
			function () {
				if (!ticking) {
					window.requestAnimationFrame(function () {
						var y = window.scrollY || window.pageYOffset
						var shouldShow = y > 0
						// Only update DOM if state changed
						if (shouldShow !== lastKnownState) {
							if (shouldShow) {
								el.gt.classList.remove('hidden')
							} else {
								el.gt.classList.add('hidden')
							}
							lastKnownState = shouldShow
						}
						ticking = false
					})
					ticking = true
				}
			},
			{ passive: true }
		)
		el.gt.onclick = function (e) {
			e.preventDefault()
			if (
				document.documentElement.scrollTop ||
				document.body.scrollTop > 0
			) {
				el.scrollToTop()
			}
		}
	}
	if (el.gt) {
		el.listeners()
	}
}
