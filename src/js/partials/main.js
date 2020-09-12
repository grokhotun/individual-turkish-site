!!include('./partials/polyfills.js');
!!include('./partials/common.js');

document.addEventListener("DOMContentLoaded", function (event) {
    inputsFilter();
	inputMasking();
	imgToBackground();
	sliders();
	burgerMenu('burger-menu');
	popups();
	formValidation();
	preloader();
	svg4everybody();
	htmlMover();
});