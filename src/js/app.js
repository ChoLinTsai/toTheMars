const css = require('../css/app.scss');

// for reducing scroll request
function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this,
      args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate)
        func.apply(context, args);
      };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow)
      func.apply(context, args);
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
function mapGroupItems(arrayItems, initTime, addTime, addIncrement, indexNum) {
  arrayItems.map(items => {
    setTimeout(() => {
      let [x] = [items];
      let [i, j] = x;
      sectionSwitch(i, j, indexNum);
    }, initTime + addTime);
    addTime += addIncrement;
  })
}

// most of evnets are written in this function
function checkScroll() {
  // get element move up percentage to trigger event
  function calTriggerPt(ele, percent) {
    let eleOffsetTop = ele.offsetTop;
    let calTriggerPoint = (wScrollY + window.innerHeight) > (eleOffsetTop * percent);
    // return boolean;
    return calTriggerPoint;
  }
  /**
	*  Header section javascript
	**/

  // get window scrollY value
  const wScrollY = window.scrollY;
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
  if (headerEleTrigger) {
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

  /**
	* Aside section javascript
	**/
  // get aside elements
  let asideContainer = $select('#aside-container');
  let asideSection2 = $select('#aside-section-2');
  let asideSection3 = $select('#aside-section-3');
  let asideOffsetTop = asideContainer.offsetTop;
  let asideTrigger = wScrollY > (asideOffsetTop * 0.1)
  let asideDelay = 200;
  // check if true to show aside content
  if (asideTrigger) {
    $rmClsls(asideSection2, 'set-to-left');
    setTimeout(() => {
      $rmClsls(asideSection3, 'set-to-right');
    }, asideDelay)
  }

  /**
	*  main section javascript
	**/
  // set trigger point and get #main-p
  let mainP = $select('#main-p');
  let mainH1 = $select('#main-h1');
  let articleContainer = $select('#article-container');
  let mainContenShow = calTriggerPt(articleContainer, 0.8);
  let mainContentHide = calTriggerPt(articleContainer, 1.05);

  if (mainContenShow) {
    $rmClsls(mainP, 'main-p-offsetY');
    $rmClsls(mainH1, 'main-h1-offsetY');
  } else {
    $addClsls(mainP, 'main-p-offsetY');
    $addClsls(mainH1, 'main-h1-offsetY');
  }

  /**
	 * article section js
	**/
  // set trigger point and get #article-h2
  let articleH2 = $select('#article-h2');
  let articleTriggerPt = calTriggerPt(articleContainer, 1.125);

  // if true to show/hide article h2
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
  // check if true to show/hide section begin elements
  if (secBeginShow) {
    $rmClsls(secBeginH1, 'sec-begin-h1-offset');
    $rmClsls(secBeginP, 'sec-begin-p-offset');
  } else {
    $addClsls(secBeginH1, 'sec-begin-h1-offset');
    $addClsls(secBeginP, 'sec-begin-p-offset');
  }

  /**
	 * section landing js
	**/
  // get section ladning h1
  let secLandingH2 = $select('#section-landing-h2');
  let secLandingP = $select('#section-landing-p ');
  let secLandingContainer = $select('#section-landing-container');
  let secLnadingTrigger = calTriggerPt(secLandingContainer, 1.065)
  // check if true to show/hide landing elements
  if (secLnadingTrigger) {
    $rmClsls(secLandingH2, 'sec-landing-offset');
    $rmClsls(secLandingP, 'sec-landing-offset');
  } else {
    $addClsls(secLandingH2, 'sec-landing-offset');
    $addClsls(secLandingP, 'sec-landing-offset');
  }

  /**
	 * section onground js
	**/
  // get section onground h2 and p
  let secOnGrdH2 = $select('#section-onground-h2');
  let secOnGrdP = $select('#section-onground-p');
  let secOnGroundShow = calTriggerPt(secLandingContainer, 1.25);
  let secOnGroundHide = calTriggerPt(secLandingContainer, 1.415);
  // check if true to show/hide onground elements
  if (secOnGroundShow) {
    $rmClsls(secOnGrdH2, 'sec-ongrd-h2-offset');
    $rmClsls(secOnGrdP, 'sec-ongrd-p-offset');
  } else {
    $addClsls(secOnGrdH2, 'sec-ongrd-h2-offset');
    $addClsls(secOnGrdP, 'sec-ongrd-p-offset');
  }

  /**
   * section phase 1 js
  **/
  // get section phase 1 elements
  let secPhase1H2 = $select('#section-phase1-h2');
  let secPhase1P = $select('#section-phase1-p');
  let secPhase1Container = $select('#section-phase1-container');
  let secPhase1H2Trigger = calTriggerPt(secPhase1Container, 1.05);
  let secPhase1PTrigger = calTriggerPt(secPhase1Container, 1.08);

  // control secPhase1H2 movements
  if (secPhase1H2Trigger) {
    $rmClsls(secPhase1H2, 'sec-phase1-h2-offset');
  } else {
    $addClsls(secPhase1H2, 'sec-phase1-h2-offset');
  }

  // control secPhase1P movements
  if (secPhase1PTrigger) {
    $rmClsls(secPhase1P, 'sec-phase1-p-offset');
  } else {
    $addClsls(secPhase1P, 'sec-phase1-p-offset');
  }

  /**
	 * section colonise js
	**/
  // get section colony elements
  let secColonyH1 = $select('#section-colony-h1');
  let secColonyH2 = $select('#section-colony-h2');
  let secColonyUl = $select('#section-colony-ul');
  let secColonyHOffset = 'sec-colony-h-offset';
  let secColonyUlOffset = 'sec-colony-ul-offset';
  let secColonyShow = calTriggerPt(secPhase1Container, 1.2);
  let groupColonyItems = [
    [
      secColonyH1, secColonyHOffset
    ],
    [
      secColonyH2, secColonyHOffset
    ],
    [
      secColonyUl, secColonyUlOffset
    ]
  ];
  // check if true to show/hide colony elements
  if (secColonyShow) {
    mapGroupItems(groupColonyItems, 0, 0, 200, 1);
  } else {
    mapGroupItems(groupColonyItems, 0, 0, 200, 0);
  }

  /**
	 * section phase 1.5 js
	**/
  // get section phase 1.5 h2 p offset and groupItems
  let secPt5Container = $select('#section-phase1-5-container');
  let secPhasePt5H2 = $select('#section-phase1-5-h2');
  let secPhasePt5P = $select('#section-phase1-5-p');
  let secPt5 = $select('#pt5');
  let secPt5H2Offset = 'sec-phase1-5-h2-offset';
  let secPt5POffset = 'sec-phase1-5-p-offset';
  let secPt5Offset = 'pt5-offset';
  let groupPt5Items = [
    [
      secPhasePt5H2, secPt5H2Offset
    ],
    [
      secPt5, secPt5Offset
    ],
    [
      secPhasePt5P, secPt5POffset
    ]
  ];

  // check if true to show/hide phase 1.5
  if (calTriggerPt(secPt5Container, 1.055)) {
    mapGroupItems(groupPt5Items, 0, 0, 250, 1);
  } else {
    mapGroupItems(groupPt5Items, 0, 0, 250, 0);
  }

  /**
   * section city underground js
  **/
  // get city underground elements
  let secUnderH1 = $select('#section-underground-h1');
  let secUnderH2 = $select('#section-underground-h2');
  let secUnderUl = $select('#section-underground-ul');
  let secUnderOffset = 'sec-under-offset';
  let secUnderShow = calTriggerPt(secPt5Container, 1.175);
  let groupUnderItems = [
    [
      secUnderH1, secUnderOffset
    ],
    [
      secUnderH2, secUnderOffset
    ],
    [
      secUnderUl, secUnderOffset
    ]
  ]
  // if true to show/hide underground elements
  if (secUnderShow) {
    mapGroupItems(groupUnderItems, 0, 0, 200, 1);
  } else {
    mapGroupItems(groupUnderItems, 0, 0, 200, 0);
  }

  /**
	 * section phase 2 js
	**/
  // get section phase 2 elements
  let secPhase2H1 = $select('#section-phase2-h1');
  let secPhase2P = $select('#section-phase2-p');
  let secPhase2Offset = 'sec-phase2-offset';
  let secPhase2Container = $select('#section-phase2-container');
  let secPhase2Show = calTriggerPt(secPhase2Container, 1.045);
  let groupPhase2Items = [
    [
      secPhase2H1, secPhase2Offset
    ],
    [
      secPhase2P, secPhase2Offset
    ]
  ]
  // if true to show/hide phase 2 elements
  if (secPhase2Show) {
    mapGroupItems(groupPhase2Items, 0, 0, 250, 1);
  } else {
    mapGroupItems(groupPhase2Items, 0, 0, 250, 0);
  }

  /**
   * section dome js
  **/
  // get dome elements
  let secDomeH1 = $select('#section-dome-h1');
  let secDomeP = $select('#section-dome-p');
  let secDomeOffset = 'sec-dome-offset';
  let secDomeShow = calTriggerPt(secPhase2Container, 1.125);
  let groupDomeItems = [
    [
      secDomeH1, secDomeOffset
    ],
    [
      secDomeP, secDomeOffset
    ]
  ]

  // check if true to show/hide dome content
  if (secDomeShow) {
    mapGroupItems(groupDomeItems, 0, 0, 250, 1);
  } else {
    mapGroupItems(groupDomeItems, 0, 0, 250, 0);
  }

  /**
	 * section phase 3 js
	**/
  // get section phase 3 elements
  let secPhase3H1 = $select('#section-phase3-h1');
  let secPhase3P = $select('#section-phase3-p');
  let secPhase3Offset = 'sec-phase3-offset';
  let secPhase3Container = $select('#section-phase3-container');
  let secPhase3Show = calTriggerPt(secPhase3Container, 1.04);
  let groupPhase3Items = [
    [
      secPhase3H1, secPhase3Offset
    ],
    [
      secPhase3P, secPhase3Offset
    ]
  ]

  // check if true to show/hide sectin phase 3
  if (secPhase3Show) {
    mapGroupItems(groupPhase3Items, 0, 0, 250, 1);
  } else {
    mapGroupItems(groupPhase3Items, 0, 0, 250, 0);
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
  let secImmi4Trigger = calTriggerPt(secPhase3Container, 1.1075);
  let groupItems = [
    [
      secImmi4H1, secImmiH1Offset
    ],
    [
      secImmi4H2, secImmiH2Offset
    ],
    [
      secImmi4Ul, secImmiUlOffset
    ]
  ]

  // check if true to shoe or hide immigration elements
  if (secImmi4Trigger) {
    mapGroupItems(groupItems, 0, 0, 250, 1);
  } else {
    mapGroupItems(groupItems, 0, 0, 250, 0);
  }

  /**
	 * section phase 4 js
	**/
  let secPhase4H1 = $select('#section-phase4-h1');
  let secPhase4P = $select('#section-phase4-p');
  let secPhase4Offset = 'sec-phase4-offset';
  let secPhase4Container = $select('#section-phase4-container');
  let secPhase4Show = calTriggerPt(secPhase4Container, 1.035);
  let groupPhase4Items = [
    [
      secPhase4H1, secPhase4Offset
    ],
    [
      secPhase4P, secPhase4Offset
    ]
  ]
  // if true to show/hide phase 4 elements
  if (secPhase4Show) {
    mapGroupItems(groupPhase4Items, 0, 0, 250, 1);
  } else {
    mapGroupItems(groupPhase4Items, 0, 0, 250, 0);
  }

  /**
	 * section figure js
	**/
  // get section figure elements
  let secFig1 = $select('#figure-1');
  let secFig2 = $select('#figure-2');
  let secFig3 = $select('#figure-3');
  let secFig4 = $select('#figure-4');
  let secFigDiv1 = $select('#fig-div-1');
  let secFigDiv2 = $select('#fig-div-2');
  let secFigDiv3 = $select('#fig-div-3');
  let secFigDiv4 = $select('#fig-div-4');
  let secFigOffsetRight = 'fig-offset-right';
  let secFigOffsetLeft = 'fig-offset-left';

  // if true to show/hide to the mars elements
  if (calTriggerPt(secFig1, 1.015)) {
    $rmClsls(secFigDiv1, secFigOffsetRight);
  }

  if (calTriggerPt(secFig2, 1.015)) {
    $rmClsls(secFigDiv2, secFigOffsetLeft);
  }

  if (calTriggerPt(secFig3, 1.015)) {
    $rmClsls(secFigDiv3, secFigOffsetRight);
  }

  if (calTriggerPt(secFig4, 1.015)) {
    $rmClsls(secFigDiv4, secFigOffsetLeft);
  }
}

// listen window scroll event
window.addEventListener('scroll', debounce(checkScroll, 12, true))
