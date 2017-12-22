const css = require('../css/app.scss');

const btnView = document.getElementById('btn-view');
const btnViewClose = document.getElementsByClassName('closebtn')[0]


function showShoe() {
	let hidenShoe = document.getElementsByClassName('slide-in')[0];
	hidenShoe.classList.add('active');
}

function hideShoe() {
	let shownShoe = document.getElementsByClassName('active')[0];
	shownShoe.classList.remove('active');
}


// header view btn click function to show Shoe
btnView.addEventListener('click', showShoe);

// header close btn click function to close Shoe
btnViewClose.addEventListener('click', hideShoe);
