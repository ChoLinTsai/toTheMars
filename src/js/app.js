const css = require('../css/app.scss');

// for reducing scroll request
function debounce(func, wait, immediate) {
	let timeout;
	return function() {
		let context = this, args = arguments;
		let later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// set functions for addClassList and removeClassList
function $addClsls(element, ...newClass) {
	return element.classList.add(...newClass);
}
function $rmClsls(element, ...rmClass) {
	return element.classList.remove(...rmClass);
}
// set func for select elements
function $select(element) {
	return document.querySelector(element);;
}

// most of evnets written in this function
function checkScroll() {
	/**
	*  Header section javascript
	**/
	// get window scrollY value
	let wScrollY = window.top.scrollY;
	// set event trigger value
	let triggerHeight = 200;
	// get #header h1 and .header-h1-slide-right
	let headerH1 = $select('#header-h1');
	let h1SlideRight = 'header-h1-slide-right';

	// get #header-p and .header-p-slide-right
	let headerP = $select('#header-p');
	let pSlideRight = 'header-p-slide-right';

	// get #header-arrow and arrow and arrow-animation
	let headerArrow = $select('.header-arrow');
	let arrowFadeOut = 'header-arrow-fade-out'
	let arrowAnimation = 'arrow-animation'

	// check if true to add|remove .h1SlideRight .pSlideRight
	if( wScrollY >= triggerHeight ) {
		$addClsls(headerH1, h1SlideRight)
		$addClsls(headerP, pSlideRight)
	} else {
		$rmClsls(headerH1, h1SlideRight);
		$rmClsls(headerP, pSlideRight);
	}

	// check if true to fade out #header-arrow
	if ( wScrollY >= triggerHeight / 2  ) {
		$addClsls(headerArrow, arrowFadeOut);
	} else {
		$rmClsls(headerArrow, arrowFadeOut)
	}

	// check if true to stop arrow animation before arrow fadeout
	if (wScrollY >= triggerHeight / 2.1 ) {
		$rmClsls(headerArrow, arrowAnimation);
	} else {
		$addClsls(headerArrow, arrowAnimation);
	}

	/**
	* Aside section javascript
	**/
	let asideSection2 = $select('#aside-section-2');
	let asideSection3 = $select('#aside-section-3');
	let asideTriggerPoint = 300;
	let asideDelay = 200;
	// check if true to show aside content
	if (wScrollY > asideTriggerPoint) {
		$rmClsls(asideSection2, 'set-to-left');
		setTimeout( () => {
			$rmClsls(asideSection3, 'set-to-right');
		}, asideDelay)
	}

	/**
	*  main section javascript
	**/
	// set trigger point and get #main-p
	let mainWrapper = $select('#main-wrapper');
	let mainPtoShow = 900;
	let mainPtoHide = 1650;
	let mainP = $select('#main-p');
	// check if ture to show #main-wrapper(fixed-grid)
	if (wScrollY < 850) {
		$addClsls(mainWrapper, 'hidden');
	} else if ( wScrollY > 2000 ){
		$addClsls(mainWrapper, 'hidden');
	} else {
		$rmClsls(mainWrapper, 'hidden');
	}

	// check conditions to show/hide main-p
	switch (true) {
		// control #main-p show/hide
		case wScrollY > mainPtoShow && wScrollY < mainPtoHide:
			$rmClsls(mainP, 'main-p-offsetY', 'main-p-offsetY-up')
			break;
		case wScrollY < mainPtoShow:
			$addClsls(mainP, 'main-p-offsetY');
			break;
		case wScrollY > mainPtoHide:
			$addClsls(mainP, 'main-p-offsetY-up');
			break;
		default:
	}

	// set trigger point and get #main-h1
	let mainH1toShow = 1000;
	let mainH1toPushUp = 1800;
	let mainH1toHide = 2000;
	let mainH1 = $select('#main-h1');
	// check conditions to show/hide main-h1
	switch (true) {
		// control #main-h1 show/hide/pushup
		case wScrollY > mainH1toShow && wScrollY < mainH1toPushUp:
			$rmClsls(mainH1, 'main-h1-offsetY', 'main-h1-pushup');
			break;
		case wScrollY < mainH1toShow:
			$addClsls(mainH1, 'main-h1-offsetY');
			break;
		case wScrollY > mainH1toPushUp && wScrollY < mainH1toHide:
			$addClsls(mainH1, 'main-h1-pushup');
			$rmClsls(mainH1, 'main-h1-hide');
			break;
		case wScrollY > mainH1toHide:
			$addClsls(mainH1, 'main-h1-hide')
			break;
		default:
	}

	/**
	 * article section js
	**/
	// set trigger point and get #article-h2
	let articleTriggerPt = 2000;
	let articleH2 = $select('#article-h2');
	if (wScrollY > articleTriggerPt) {
		$addClsls(articleH2, 'article-h2-scale', 'h2-transform');
	} else {
		$rmClsls(articleH2, 'article-h2-scale', 'h2-transform');
	}


	/**
	 * section begin js
	**/
  // get section begin wrapper and h1
	let secBeginWrapper = $select('#section-begin-wrapper');
	let secBeginH1 = $select('#section-begin-h1');
  // check if true to hide fixed wrapper
	if (wScrollY < 2150) {
		$addClsls(secBeginWrapper, 'hidden');
	} else if ( wScrollY > 3600 ){
		$addClsls(secBeginWrapper, 'hidden');
	} else {
		$rmClsls(secBeginWrapper, 'hidden');
	}
  // control section begin h1 movements
	switch (true) {
		case wScrollY > 2200 && wScrollY < 2450:
			$rmClsls(secBeginH1, 'sec-begin-h1-offset', 'sec-begin-h1-pushup');
			break;
		case wScrollY < 2200:
			$addClsls(secBeginH1, 'sec-begin-h1-offset');
			break;
		case wScrollY > 2450 && wScrollY < 2850:
			$rmClsls(secBeginH1, 'sec-begin-h1-topright');
			$addClsls(secBeginH1, 'sec-begin-h1-pushup');
			break;
		case wScrollY > 2850 && wScrollY < 3500:
			$rmClsls(secBeginH1, 'sec-begin-h1-hide');
			$addClsls(secBeginH1, 'sec-begin-h1-topright');
			break;
		case wScrollY > 3500:
			$addClsls(secBeginH1, 'sec-begin-h1-hide');
			break;
		default:
	}

  // get section begin p
	let secBeginP = $select('#section-begin-p');

  // control section begin p movements
	switch (true) {
		case wScrollY < 2475:
			$addClsls(secBeginP, 'sec-begin-p-offset');
			break;
		case wScrollY > 2475 && wScrollY < 2850:
			$rmClsls(secBeginP, 'sec-begin-p-offset', 'sec-begin-p-push');
			break;
		case wScrollY > 2850 && wScrollY < 3100:
			$addClsls(secBeginP, 'sec-begin-p-push');
			$rmClsls(secBeginP, 'sec-begin-p-hide');
			break;
		case wScrollY > 3100:
			$addClsls(secBeginP, 'sec-begin-p-hide');
		default:
	}


  // get section ladning h1
	let secLandingH2 = $select('#section-landing-h2');
	let secLandingP = $select('#section-landing-p ');

	switch (true) {
		case wScrollY < 3150:
			$addClsls(secLandingH2, 'sec-landing-h2-offset');
			break;
		case wScrollY > 3150 && wScrollY < 3550:
  		$rmClsls(secLandingH2, 'sec-landing-h2-offset', 'sec-lading-h2-pushdown');
			$addClsls(secLandingP, 'sec-landing-p-offset');
			break;
		case wScrollY > 3550 && wScrollY < 4000:
			$addClsls(secLandingH2, 'sec-lading-h2-pushdown');
			$rmClsls(secLandingP, 'sec-landing-p-offset', 'sec-landing-p-hide');
			$rmClsls(secLandingH2, 'sec-landing-h2-hide');
			break;
		case wScrollY > 4000:
			$addClsls(secLandingH2, 'sec-landing-h2-hide');
			$addClsls(secLandingP, 'sec-landing-p-hide');
		default:

	}

  // get section onground h2 and p
	let secOnGrdH2 = $select('#section-onground-h2');
	let secOnGrdP = $select('#section-onground-p');

	switch (true) {
		case wScrollY < 4000:
			$addClsls(secOnGrdH2, 'sec-ongrd-h2-offset');
			$addClsls(secOnGrdP, 'sec-ongrd-p-offset');
			break;
		case wScrollY > 4000 && wScrollY < 4400:
			$rmClsls(secOnGrdH2, 'sec-ongrd-h2-offset');
			$rmClsls(secOnGrdP, 'sec-ongrd-p-offset');
			break;
		case wScrollY > 4400:
			$addClsls(secOnGrdH2, 'sec-ongrd-h2-offset');
			$addClsls(secOnGrdP, 'sec-ongrd-p-offset');
			break;
		default:

	}


	// console.log(wScrollY);

}


// listen window scroll event
window.addEventListener('scroll', debounce(checkScroll, 12, true))
