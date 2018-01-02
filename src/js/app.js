const css = require('../css/app.scss');

// listen window scroll event
window.addEventListener('scroll', () => {

	/**
	 *  Header section javascript
	 */
	// get window scrollY value
	let wScrollY = window.top.scrollY;
	// set event trigger value
	let triggerHeight = 200;
	// get #header h1 and .header-h1-slide-right
	let headerH1 = document.querySelector('#header-h1');
	let h1SlideRight = 'header-h1-slide-right';

	// get #header-p and .header-p-slide-right
	let headerP = document.querySelector('#header-p');
	let pSlideRight = 'header-p-slide-right';

  // get #header-arrow and arrow and arrow-animation
	let headerArrow = document.querySelector('.header-arrow');
	let arrowFadeOut = 'header-arrow-fade-out'
	let arrowAnimation = 'arrow-animation'

	// check if wScroll >|< triggerHeight to add|remove .h1SlideRight .pSlideRight
	if( wScrollY >= triggerHeight ) {
		headerH1.classList.add(h1SlideRight);
		headerP.classList.add(pSlideRight);
	} else {
		headerH1.classList.remove(h1SlideRight);
		headerP.classList.remove(pSlideRight);
	}

  // check if wScroll > arrowTriggerHeight to fade out #header-arrow
	if ( wScrollY >= triggerHeight / 2  ) {
		headerArrow.classList.add(arrowFadeOut);
	} else {
		headerArrow.classList.remove(arrowFadeOut);
	}

  // check if true to stop arrow animation before arrow fadeout
	if (wScrollY >= triggerHeight / 2.1 ) {
		headerArrow.classList.remove(arrowAnimation);
	} else {
		headerArrow.classList.add(arrowAnimation);
	}

	/**
	 *	Aside section javascript
	 */
 	let asideSection2 = document.querySelector('#aside-section-2');
	let asideSection3 = document.querySelector('#aside-section-3');
	let asideTriggerPoint = 300;
	let asideDelay = 200;

	if (wScrollY > asideTriggerPoint) {
		asideSection2.classList.remove('set-to-left');
		setTimeout( () => {
			asideSection3.classList.remove('set-to-right');
		}, asideDelay)
	}

	console.log(wScrollY);
})
