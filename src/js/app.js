const css = require('../css/app.scss');

// listen window scroll event
window.addEventListener('scroll', () => {

	/**
	*  Header section javascript
	**/
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

	// check if true to add|remove .h1SlideRight .pSlideRight
	if( wScrollY >= triggerHeight ) {
		headerH1.classList.add(h1SlideRight);
		headerP.classList.add(pSlideRight);
	} else {
		headerH1.classList.remove(h1SlideRight);
		headerP.classList.remove(pSlideRight);
	}

  // check if true to fade out #header-arrow
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
	* Aside section javascript
	**/
 	let asideSection2 = document.querySelector('#aside-section-2');
	let asideSection3 = document.querySelector('#aside-section-3');
	let asideTriggerPoint = 300;
	let asideDelay = 200;
  // check if true to show aside content
	if (wScrollY > asideTriggerPoint) {
		asideSection2.classList.remove('set-to-left');
		setTimeout( () => {
			asideSection3.classList.remove('set-to-right');
		}, asideDelay)
	}

	/**
	*  main section javascript
	**/

	// set trigger point and get #main-p
	let mainWrapper = document.querySelector('#main-wrapper');
	let mainPtoShow = 900;
	let mainPtoHide = 1650;
	let mainP = document.querySelector('#main-p');
  // check conditions to show/hide main-p
	switch (true) {
		// control #main-p show/hide
		case wScrollY > mainPtoShow && wScrollY < mainPtoHide:
			mainP.classList.remove('main-p-offsetY', 'main-p-offsetY-up');
			break;
		case wScrollY < mainPtoShow:
			mainP.classList.add('main-p-offsetY');
			break;
		case wScrollY > mainPtoHide:
			mainP.classList.add('main-p-offsetY-up');
			break;
		default:
	}

	// set trigger point and get #main-h1
	let mainH1toShow = 1000;
	let mainH1toPushUp = 1700;
	let mainH1toHide = 2100;
	let mainH1 = document.querySelector('#main-h1');
  // check conditions to show/hide main-h1
	switch (true) {
		// controll #main-h1 show/hide/pushup
		case wScrollY > mainH1toShow && wScrollY < mainH1toPushUp:
			mainH1.classList.remove('main-h1-offsetY', 'main-h1-pushup');
			break;
		case wScrollY < mainH1toShow:
			mainH1.classList.add('main-h1-offsetY');
			break;
		case wScrollY > mainH1toPushUp && wScrollY < mainH1toHide:
			mainH1.classList.add('main-h1-pushup');
			mainH1.classList.remove('main-h1-hide');
			break;
		case wScrollY > mainH1toHide:
			mainH1.classList.add('main-h1-hide');
			break;
		default:
	}



	// console.log(wScrollY);
})
