export function carousel() {
	var t = this
	t.slides = document.querySelectorAll('.slide')
	t.next = document.querySelector('.next-btn')
	t.prev = document.querySelector('.prev-btn')
	t.dots = document.querySelectorAll('.dot')
	t.index = 1
	t.next.addEventListener('click', function () {
		t.showSlides((t.index += 1))
	})
	t.prev.addEventListener('click', function () {
		t.showSlides((t.index += -1))
	})
	t.dots.forEach(function (element, idx) {
		element.addEventListener('click', function () {
			t.showSlides(idx + 1)
		})
	})
	t.showSlides = function (n) {
		if (n > t.slides.length) t.index = 1
		if (n < 1) t.index = t.slides.length
		var targetIndex = t.index - 1

		// Batch all DOM writes together
		for (var i = 0; i < t.slides.length; i++) {
			if (i === targetIndex) {
				t.slides[i].style.display = 'block'
				t.dots[i].classList.add('active')
			} else {
				t.slides[i].style.display = 'none'
				t.dots[i].classList.remove('active')
			}
		}
	}
	t.showSlides(t.index)
}
