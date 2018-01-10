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

// console.log
function $log(x){
	return console.log(x);
}

// get element offsetTop
function OffsetTop(x) {
	return $log(x.offsetTop);
}

// function for section phase to reuse
function sectionSwitch(selectEle, eleClass, indexNum) {
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

// function for controlling element movements
function mapGroupItems (arrayItems, initTime, addTime, addIncrement, indexNum) {
		arrayItems.map( items => {
			setTimeout( () => {
				let [ x ] = [items];
				let [ i, j ] = x;
				sectionSwitch(i, j, indexNum);
			}, initTime + addTime);
			addTime += addIncrement;
		})
}

// most of evnets are written in this function
function checkScroll() {
	/**
	*  Header section javascript
	**/
	// get window scrollY value
	let wScrollY = window.scrollY;
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
	let arrowAnimation = 'arrow-animation';

	let headerEleTrigger = wScrollY > (headerArrow.offsetTop * 0.1);

	// check if true to add|remove .h1SlideRight .pSlideRight
	if(headerEleTrigger) {
		$addClsls(headerH1, h1SlideRight);
		$addClsls(headerP, pSlideRight);
		$addClsls(headerArrow, arrowFadeOut);
		$rmClsls(headerArrow, arrowAnimation);
	} else {
		$rmClsls(headerH1, h1SlideRight);
		$rmClsls(headerP, pSlideRight);
		$rmClsls(headerArrow, arrowFadeOut);
		$addClsls(headerArrow, arrowAnimation);
	}

	// check if true to fade out #header-arrow
	// if ( wScrollY >= triggerHeight / 2  ) {
	// 	$addClsls(headerArrow, arrowFadeOut);
	// } else {
	// 	$rmClsls(headerArrow, arrowFadeOut)
	// }

	// check if true to stop arrow animation before arrow fadeout
	// if (wScrollY >= triggerHeight / 2.1 ) {
	// 	$rmClsls(headerArrow, arrowAnimation);
	// } else {
	// 	$addClsls(headerArrow, arrowAnimation);
	// }

	/**
	* Aside section javascript
	**/

	let asideContainer = $select('#aside-container');
	let asideSection2 = $select('#aside-section-2');
	let asideSection3 = $select('#aside-section-3');
	let asideOffsetTop = asideContainer.offsetTop;
	let asideTrigger = wScrollY > (asideOffsetTop * 0.1)
	let asideDelay = 200;
	// check if true to show aside content
	if (asideTrigger) {
		$rmClsls(asideSection2, 'set-to-left');
		setTimeout( () => {
			$rmClsls(asideSection3, 'set-to-right');
		}, asideDelay)
	}

	/**
	*  main section javascript
	**/
	// set trigger point and get #main-p
	let mainP = $select('#main-p');

	let mainContenShow = wScrollY > asideOffsetTop * 0.95;

	if (mainContenShow) {
		$rmClsls(mainP, 'main-p-offsetY', 'main-p-offsetY-up');
	} else {
		$addClsls(mainP, 'main-p-offsetY', 'main-p-offsetY-up');
	}

	// check if ture to show #main-wrapper(fixed-grid)
	// if (wScrollY < 850) {
	// 	$addClsls(mainWrapper, 'hidden');
	// } else if ( wScrollY > 2000 ){
	// 	$addClsls(mainWrapper, 'hidden');
	// } else {
	// 	$rmClsls(mainWrapper, 'hidden');
	// }

	//check conditions to show/hide main-p
	// switch (true) {
	// 	// control #main-p show/hide
	// 	case wScrollY > mainPtoShow && wScrollY < mainPtoHide:
	// 		$rmClsls(mainP, 'main-p-offsetY', 'main-p-offsetY-up');
	// 		break;
	// 	case wScrollY < mainPtoShow:
	// 		$addClsls(mainP, 'main-p-offsetY');
	// 		break;
	// 	case wScrollY > mainPtoHide:
	// 		$addClsls(mainP, 'main-p-offsetY-up');
	// 		break;
	// 	default:
	// }

	// set trigger point and get #main-h1
	// let mainH1toShow = 1000;
	// let mainH1toPushUp = 1800;
	// let mainH1toHide = 2000;
	let mainH1 = $select('#main-h1');
	let articleContainer = $select('#article-container');
	let articleOffsetTop = articleContainer.offsetTop;
	let mainContentHide = (wScrollY - window.innerHeight) > (articleOffsetTop * 0.25)

	if (mainContenShow) {
		$rmClsls(mainH1, 'main-h1-offsetY');
	} else {
		$addClsls(mainH1, 'main-h1-offsetY');
	}

	if (mainContentHide) {
		$addClsls(mainH1, 'main-h1-offsetY');
		$addClsls(mainP, 'main-p-offsetY', 'main-p-offsetY-up');
	}

	// check conditions to show/hide main-h1
	// switch (true) {
	// 	// control #main-h1 show/hide/pushup
	// 	case wScrollY > mainH1toShow && wScrollY < mainH1toPushUp:
	// 		$rmClsls(mainH1, 'main-h1-offsetY', 'main-h1-pushup');
	// 		break;
	// 	case wScrollY < mainH1toShow:
	// 		$addClsls(mainH1, 'main-h1-offsetY');
	// 		break;
	// 	case wScrollY > mainH1toPushUp && wScrollY < mainH1toHide:
	// 		$addClsls(mainH1, 'main-h1-pushup');
	// 		$rmClsls(mainH1, 'main-h1-hide');
	// 		break;
	// 	case wScrollY > mainH1toHide:
	// 		$addClsls(mainH1, 'main-h1-hide')
	// 		break;
	// 	default:
	// }

	/**
	 * article section js
	**/
	// set trigger point and get #article-h2
	let articleH2 = $select('#article-h2');
	// get element move up percentage to trigger event
	function calTriggerPt(ele, percent) {
		let eleOffsetTop = ele.offsetTop;
		let calTriggerPoint = (wScrollY + window.innerHeight) > (eleOffsetTop * percent);
    // return boolean;
		return calTriggerPoint;
	}
	// let calTriggerPoint = (wScrollY - window.innerHeight) > (eleOffsetTop * percent);
  //
	// $log(`article container offset top : ${eleOffsetTop}`);
	// $log(`wScrollY : ${wScrollY}`);
	// $log(wScrollY + window.innerHeight);
	// $log(window.offsetTop);


	let articleTriggerPt = calTriggerPt(articleContainer, 1.125);

	if (articleTriggerPt) {
		$addClsls(articleH2, 'article-h2-scale', 'h2-transform');
	} else {
		$rmClsls(articleH2, 'article-h2-scale', 'h2-transform');
	}

	/**
	 * section begin js
	**/
  // get section begin wrapper and h1
	let secBeginH1 = $select('#section-begin-h1');
	let secBeginP = $select('#section-begin-p');
	let secBeginShow = calTriggerPt(articleContainer, 1.35);
	let secsecBeginHide = calTriggerPt(articleContainer, 1.65);

	if (secBeginShow) {
		$rmClsls(secBeginH1, 'sec-begin-h1-offset');
		$rmClsls(secBeginP, 'sec-begin-p-offset');
	} else {
		$addClsls(secBeginH1, 'sec-begin-h1-offset');
		$addClsls(secBeginP, 'sec-begin-p-offset');
	}

	if (secsecBeginHide) {
		$addClsls(secBeginH1, 'sec-begin-h1-offset');
		$addClsls(secBeginP, 'sec-begin-p-offset');
	}
	// check if true to hide fixed wrapper
	// if (secBeginShow) {
	// 	$addClsls(secBeginWrapper, 'hidden');
	// } else if ( wScrollY > 3600 ){
	// 	$addClsls(secBeginWrapper, 'hidden');
	// } else {
	// 	$rmClsls(secBeginWrapper, 'hidden');
	// }
  // control section begin h1 movements
	// switch (true) {
	// 	case wScrollY > 2200 && wScrollY < 2450:
	// 		$rmClsls(secBeginH1, 'sec-begin-h1-offset', 'sec-begin-h1-pushup');
	// 		break;
	// 	case wScrollY < 2200:
	// 		$addClsls(secBeginH1, 'sec-begin-h1-offset');
	// 		break;
	// 	case wScrollY > 2450 && wScrollY < 2850:
	// 		$rmClsls(secBeginH1, 'sec-begin-h1-topright');
	// 		$addClsls(secBeginH1, 'sec-begin-h1-pushup');
	// 		break;
	// 	case wScrollY > 2850 && wScrollY < 3500:
	// 		$rmClsls(secBeginH1, 'sec-begin-h1-hide');
	// 		$addClsls(secBeginH1, 'sec-begin-h1-topright');
	// 		break;
	// 	case wScrollY > 3500:
	// 		$addClsls(secBeginH1, 'sec-begin-h1-hide');
	// 		break;
	// 	default:
	// }

  // get section begin p
	// let secBeginP = $select('#section-begin-p');

  // control section begin p movements
	// switch (true) {
	// 	case wScrollY < 2475:
	// 		$addClsls(secBeginP, 'sec-begin-p-offset');
	// 		break;
	// 	case wScrollY > 2475 && wScrollY < 2850:
	// 		$rmClsls(secBeginP, 'sec-begin-p-offset', 'sec-begin-p-push');
	// 		break;
	// 	case wScrollY > 2850 && wScrollY < 3100:
	// 		$addClsls(secBeginP, 'sec-begin-p-push');
	// 		$rmClsls(secBeginP, 'sec-begin-p-hide');
	// 		break;
	// 	case wScrollY > 3100:
	// 		$addClsls(secBeginP, 'sec-begin-p-hide');
	// 	default:
	// }

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
	let secPhase2H1Remove = 8350;
	let secPhase2PRemove = 8500;
	let secPhase2H1 = $select('#section-phase2-h1');
	let secPhase2P = $select('#section-phase2-p');
	let secPhase2Offset = 'sec-phase2-offset';

  // check if true to show #section-phase2-h1
	if (wScrollY > secPhase2H1Trigger) {
		sectionSwitch(secPhase2H1, secPhase2Offset, 1)
	} else if (wScrollY < secPhase2H1Trigger) {
		sectionSwitch(secPhase2H1, secPhase2Offset, 0)
	}
	// check if true to show #section-phase2-p
	if (wScrollY > secPhase2PTrigger) {
		sectionSwitch(secPhase2P, secPhase2Offset, 1)
	} else if (wScrollY < secPhase2PTrigger) {
		sectionSwitch(secPhase2P, secPhase2Offset, 0)
	}

  // check if true to remove #section-phase-2-h1
	if (wScrollY > secPhase2H1Remove) {
		sectionSwitch(secPhase2H1, secPhase2Offset, 0);
	}

  // check if true to remove #section-phase2-p
	if (wScrollY > secPhase2PRemove) {
		sectionSwitch(secPhase2P, secPhase2Offset, 0)
	}

  /**
   * section dome js
  **/
	let secDomeH1 = $select('#section-dome-h1');
	let secDomeP = $select('#section-dome-p');
	let secDomeOffset = 'sec-dome-offset';
	let secDomeTriggerOn = 8500;
	let secDomeTriggerOff = 9000;
	let secDomeDelay = 200;

  // check if true to show hide section dome elements
	if (wScrollY > secDomeTriggerOn) {
		sectionSwitch(secDomeH1, secDomeOffset, 1);
		setTimeout( () => {
			sectionSwitch(secDomeP, secDomeOffset, 1);
		}, secDomeDelay)
	} else if (wScrollY < secDomeTriggerOn) {
		sectionSwitch(secDomeH1, secDomeOffset, 0);
		setTimeout( () => {
			sectionSwitch(secDomeP, secDomeOffset, 0);
		}, secDomeDelay)
	}

	// check if true to hide section dome elements
	if (wScrollY > secDomeTriggerOff) {
		sectionSwitch(secDomeH1, secDomeOffset, 0);
		setTimeout( () => {
			sectionSwitch(secDomeP, secDomeOffset, 0);
		}, secDomeDelay)
	}

	/**
	 * section phase 3 js
	**/
  // get section phase 3 elements
	let secPhase3H1 = $select('#section-phase3-h1');
	let secPhase3P = $select('#section-phase3-p');
	let secPhase3Offset = 'sec-phase3-offset';
	let secPhase3H1Trigger = 9000;
	let secPhase3PTrigger = 9150;
	let secPhase3H1Remove = 9800;
	let secPhase3PRemove = 9950;

	if (wScrollY > secPhase3H1Trigger) {
		sectionSwitch(secPhase3H1, secPhase3Offset, 1);
	} else if (wScrollY < secPhase3H1Trigger) {
		sectionSwitch(secPhase3H1, secPhase3Offset, 0);
	}

	if (wScrollY > secPhase3PTrigger) {
		sectionSwitch(secPhase3P, secPhase3Offset, 1);
	} else if (wScrollY < secPhase3PTrigger) {
		sectionSwitch(secPhase3P, secPhase3Offset, 0);
	}

	if (wScrollY > secPhase3H1Remove) {
		sectionSwitch(secPhase3H1, secPhase3Offset, 0);
	}

	if (wScrollY > secPhase3PRemove) {
		sectionSwitch(secPhase3P, secPhase3Offset, 0);
	}

	/**
	 * section immigration js
	**/
  // get section immigration elements and set values
	let secImmi4H1 = $select('#section-immi-h1');
	let secImmi4H2 = $select('#section-immi-h2');
	let secImmi4Ul = $select('#section-immi-ul');
	let secImmiH1Offset = 'sec-immi-h1-offset';
	let secImmiH2Offset = 'sec-immi-h2-offset';
	let secImmiUlOffset = 'sec-immi-ul-offset';
	let secImmi4Trigger = 9950;
	let addTime = 0;
	let addTimeIncrement = 250
	let groupItems = [
		[secImmi4H1, secImmiH1Offset],
		[secImmi4H2, secImmiH2Offset],
		[secImmi4Ul, secImmiUlOffset]
	]

  // check if true to shoe or hide elements
	if (wScrollY > secImmi4Trigger) {
			mapGroupItems(groupItems, 0, 0, 250, 1);
	} else if (wScrollY < secImmi4Trigger) {
			mapGroupItems(groupItems, 0, 0, 250, 0);
	}

	/**
	 * section phase 4 js
	**/
	let secPhase4H1 = $select('#section-phase4-h1');
	let secPhase4P = $select('#section-phase4-p');
	let secPhase4Offset = 'sec-phase4-offset';
	let secPhase4H1trigger = 10500;
	let secPhase4Ptrigger = 10650;
	let secPhase4H1Remove = 11250;
	let secPhase4PRemove = 11450;



	if (wScrollY > secPhase4H1trigger ) {
		sectionSwitch(secPhase4H1, secPhase4Offset, 1);
	} else if (wScrollY < secPhase4H1trigger) {
		sectionSwitch(secPhase4H1, secPhase4Offset, 0);
	}

	if (wScrollY > secPhase4Ptrigger ) {
		sectionSwitch(secPhase4P, secPhase4Offset, 1);
	} else if (wScrollY < secPhase4Ptrigger) {
		sectionSwitch(secPhase4P, secPhase4Offset, 0);
	}

	if (wScrollY > secPhase4H1Remove) {
		sectionSwitch(secPhase4H1, secPhase4Offset, 0);
	}

	if (wScrollY > secPhase4PRemove) {
		sectionSwitch(secPhase4P, secPhase4Offset, 0);
	}

	/**
	 * section figure js
	**/
  // get section figure elements
	let secFigDiv1 = $select('#fig-div-1');
	let secFigDiv2 = $select('#fig-div-2');
	let secFigDiv3 = $select('#fig-div-3');
	let secFigDiv4 = $select('#fig-div-4');
	let secFigOffsetRight = 'fig-offset-right';
	let secFigOffsetLeft = 'fig-offset-left';
	let secFigDiv1Trigger = 11200;
	let secFigDiv2Trigger = 11450;
	let secFigDiv3Trigger = 12200;
	let secFigDiv4Trigger = 12700;

	if (wScrollY > secFigDiv1Trigger) {
		sectionSwitch(secFigDiv1, secFigOffsetRight, 1);
	}

	if (wScrollY > secFigDiv2Trigger) {
		sectionSwitch(secFigDiv2, secFigOffsetLeft, 1);
	}

	if (wScrollY > secFigDiv3Trigger) {
		sectionSwitch(secFigDiv3, secFigOffsetRight, 1);
	}

	if (wScrollY > secFigDiv4Trigger) {
		sectionSwitch(secFigDiv4, secFigOffsetLeft, 1);
	}







	// console.log(wScrollY);

}


// listen window scroll event
window.addEventListener('scroll', debounce(checkScroll, 12, true))
