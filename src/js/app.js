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
	return document.querySelector(element);
}

// most of evnets are written in this function
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

	/**
	 * section landing js
	**/
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

	/**
	 * section onground js
	**/
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

  /**
   * section phase 1 js
  **/
  // get section phase 1 elements
	let secPhase1H2 = $select('#section-phase1-h2');
	let secPhase1P = $select('#section-phase1-p');

  // control secPhase1H2 movements
	switch (true) {
		case wScrollY < 4600 || wScrollY > 5400:
			$addClsls(secPhase1H2, 'sec-phase1-h2-offset');
			break;
		case wScrollY > 4600 && wScrollY < 5400:
			$rmClsls(secPhase1H2, 'sec-phase1-h2-offset');
			break;
		default:
	}

  // control secPhase1P movements
	switch (true) {
		case wScrollY < 4750 || wScrollY > 5600:
			$addClsls(secPhase1P, 'sec-phase1-p-offset');
			break;
		case wScrollY > 4750 && wScrollY < 5600:
			$rmClsls(secPhase1P, 'sec-phase1-p-offset');
			break;
		default:
	}


	/**
	 * section colonise js
	**/
  // get section colony elements
	let secColonyH1 = $select('#section-colony-h1');
	let secColonyH2 = $select('#section-colony-h2');
  // control section colony h1 h2 movements
	switch (true) {
		case wScrollY < 5600:
			$addClsls(secColonyH1, 'sec-colony-h-offset');
			setTimeout( () => {
				$addClsls(secColonyH2, 'sec-colony-h-offset');
			}, 200)
			break;
		case wScrollY > 5600:
			$rmClsls(secColonyH1, 'sec-colony-h-offset');
			setTimeout( () => {
				$rmClsls(secColonyH2, 'sec-colony-h-offset');
			}, 200)
			break;
		default:
	}

  // get section colnoy ul
	let secColonyul = $select('#section-colony-ul')
  // control section colony ul movements
	switch (true) {
		case wScrollY < 5700:
			$addClsls(secColonyul, 'sec-colony-ul-offset');
			break;
		case wScrollY > 5700:
			$rmClsls(secColonyul, 'sec-colony-ul-offset');
			break;
		default:
	}

	/**
	 * section phase 1.5 js
	**/
  // get section phase 1.5 h2 and p
	let secPhasePt5H2 = $select('#section-phase1-5-h2');
	let secPhasePt5P = $select('#section-phase1-5-p');
	let pt5 = $select('#pt5');

  // control section phase1.5 h2
	switch (true) {
		case wScrollY < 6000:
			$addClsls(secPhasePt5H2, 'sec-phase1-5-h2-offset');
			break;
		case wScrollY > 6000:
			$rmClsls(secPhasePt5H2, 'sec-phase1-5-h2-offset');
			break;
		default:
	}
  // control span#pt5 movements
	if (wScrollY > 6150) {
		$rmClsls(pt5, 'pt5-offset');
	} else if (wScrollY < 6150) {
		$addClsls(pt5, 'pt5-offset');
	}
  // control section phase1.5 p movements
	switch (true) {
		case wScrollY < 6200:
			$addClsls(secPhasePt5P, 'sec-phase1-5-p-offset');
			break;
		case wScrollY > 6200:
			$rmClsls(secPhasePt5P, 'sec-phase1-5-p-offset');
			break;
		default:
	}

  // control section phase 1.5 all to hide when enter next section
	switch (true) {
		case wScrollY > 7050:
			$addClsls(secPhasePt5P, 'sec-phase1-5-p-offset');
			break;
		case wScrollY > 6850:
			$addClsls(secPhasePt5H2, 'sec-phase1-5-h2-offset');
			$addClsls(pt5, 'pt5-offset');
			break;
		default:
	}

  /**
   * section city underground js
  **/
  // get city underground elements
	let secUnderH1 = $select('#section-underground-h1');
	let secUnderH2 = $select('#section-underground-h2');
	let secUnderUl = $select('#section-underground-ul');

  // control section city underground h1 h2
	switch (true) {
		case wScrollY > 7100:
			$rmClsls(secUnderH1, 'sec-under-h1-offset');
			setTimeout( () => {
				$rmClsls(secUnderH2, 'sec-under-h2-offset');
			}, 200)
			break;
		case wScrollY < 7100:
			$addClsls(secUnderH1, 'sec-under-h1-offset');
			setTimeout( () => {
				$addClsls(secUnderH2, 'sec-under-h2-offset');
			}, 200)
			break;
		default:
	}

  // control section city underground ul li
	switch (true) {
		case wScrollY > 7200:
			$rmClsls(secUnderUl, 'sec-under-ul-offset');
			break;
		case wScrollY < 7200:
			$addClsls(secUnderUl, 'sec-under-ul-offset');
			break;
		default:
	}

	/**
	 * section phase 2 js
	**/
  // get section phase 2 elements
	let secPhase2H1Trigger = 7550;
	let secPhase2PTrigger = 7700;
	let secPhase2H1 = $select('#section-phase2-h1');
	let secPhase2P = $select('#section-phase2-p');
	let secPhase2Offset = 'sec-phase2-offset';
	// function for section phase to reuse
	function sectionPhase(selectEle, eleClass, indexNum) {
		switch (indexNum) {
			case 0:
				$addClsls(selectEle, eleClass);
				break;
			case 1:
				$rmClsls(selectEle, eleClass);
				break;
			default:
		}
	}
  // check if true to show #section-phase2-h1
	if (wScrollY > secPhase2H1Trigger) {
		sectionPhase(secPhase2H1, secPhase2Offset, 1)
	} else if (wScrollY < secPhase2H1Trigger) {
		sectionPhase(secPhase2H1, secPhase2Offset, 0)
	}
	// check if true to show #section-phase2-p
	if (wScrollY > secPhase2PTrigger) {
		sectionPhase(secPhase2P, secPhase2Offset, 1)
	} else if (wScrollY < secPhase2PTrigger) {
		sectionPhase(secPhase2P, secPhase2Offset, 0)
	}




	// console.log(wScrollY);

}


// listen window scroll event
window.addEventListener('scroll', debounce(checkScroll, 12, true))
