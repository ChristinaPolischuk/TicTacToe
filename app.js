//1.Написать игру крестики-нолики на чистом js +
//2.Управление через клавиатуру - стрелки для перемещения и Enter -
//3.Запуск приложения - появляется окно с кнопками Играть или Выйти
//4.Если нажато Играть - загружаем игру
//5.Заходим на страницу - игровое поле 3*3 человек с компьютером +
//6.Состояние игры: 1.Выигрыш, 2.Проигрыш, 3.Ничья +
//7.Выбор: сыграете еще или выйти
//8.При выборе "Сыграть еще" показывать видео-рекламу тестовую от гугл google ima sdk
//9.Разрешение 1280*720, не адаптировать, дизайн на свое усмотрение
//10.url на тестовое и архив с исходниками

// let zero = document.querySelector('circle');
// console.log(zero.getTotalLength());

var pageContent;
var videoElement;
// Define a variable to track whether there are ads loaded and initially set it to false
var adsLoaded = false;
var adContainer;
var adDisplayContainer;
var adsLoader;
var adsManager;

// On window load, attach an event to the play button click
// that triggers playback on the video element

// window.addEventListener('load', function (event) {
videoElement = document.getElementById('video-element');

initializeIMA();
videoElement.addEventListener('play', function (event) {
	loadAds(event);
});
var playButton = document.getElementById('play-button');
playButton.addEventListener('click', function (event) {
	pageContent = document.getElementById('page-content');
	pageContent.style.transform = 'scale(1.1)';
	videoElement.play();
});
// });

window.addEventListener('resize', function (event) {
	console.log("window resized");
	if (adsManager) {
		var width = videoElement.clientWidth;
		var height = videoElement.clientHeight;
		adsManager.resize(width, height, google.ima.ViewMode.NORMAL);
	}
});

function initializeIMA() {
	console.log("initializing IMA");
	adContainer = document.getElementById('ad-container');
	adContainer.addEventListener('click', adContainerClick);
	adDisplayContainer = new google.ima.AdDisplayContainer(adContainer, videoElement);
	adsLoader = new google.ima.AdsLoader(adDisplayContainer);

	adsLoader.addEventListener(
		google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
		onAdsManagerLoaded,
		false);
	adsLoader.addEventListener(
		google.ima.AdErrorEvent.Type.AD_ERROR,
		onAdError,
		false);

	// Let the AdsLoader know when the video has ended
	videoElement.addEventListener('ended', function () {
		adsLoader.contentComplete();
	});

	var adsRequest = new google.ima.AdsRequest();
	adsRequest.adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads?' +
		'sz=1280x720&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&' +
		'impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&' +
		'cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=';

	// Specify the linear and nonlinear slot sizes. This helps the SDK to
	// select the correct creative if multiple are returned.
	adsRequest.linearAdSlotWidth = videoElement.clientWidth;
	adsRequest.linearAdSlotHeight = videoElement.clientHeight;
	adsRequest.nonLinearAdSlotWidth = videoElement.clientWidth;
	adsRequest.nonLinearAdSlotHeight = videoElement.clientHeight / 3;

	// Pass the request to the adsLoader to request ads
	adsLoader.requestAds(adsRequest);
}

function adContainerClick(event) {
	console.log("ad container clicked");
	if (videoElement.paused) {
		videoElement.play();
	} else {
		videoElement.pause();
	}
}

function loadAds(event) {
	// Prevent this function from running on if there are already ads loaded
	if (adsLoaded) {
		return;
	}
	adsLoaded = true;

	// Prevent triggering immediate playback when ads are loading
	event.preventDefault();

	console.log("loading ads");

	// Initialize the container. Must be done via a user action on mobile devices.
	videoElement.load();
	adDisplayContainer.initialize();

	var width = videoElement.clientWidth;
	var height = videoElement.clientHeight;
	try {
		adsManager.init(width, height, google.ima.ViewMode.NORMAL);
		adsManager.start();
	} catch (adError) {
		// Play the video without ads, if an error occurs
		console.log("AdsManager could not be started");
		videoElement.play();
	}
}

function onAdsManagerLoaded(adsManagerLoadedEvent) {
	// Instantiate the AdsManager from the adsLoader response and pass it the video element
	adsManager = adsManagerLoadedEvent.getAdsManager(
		videoElement);

	adsManager.addEventListener(
		google.ima.AdErrorEvent.Type.AD_ERROR,
		onAdError);

	adsManager.addEventListener(
		google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
		onContentPauseRequested);

	adsManager.addEventListener(
		google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
		onContentResumeRequested);

	adsManager.addEventListener(
		google.ima.AdEvent.Type.LOADED,
		onAdLoaded);
}

function onAdLoaded(adEvent) {
	var ad = adEvent.getAd();
	if (!ad.isLinear()) {
		videoElement.play();
	}
}

function onAdError(adErrorEvent) {
	// Handle the error logging.
	console.log(adErrorEvent.getError());
	if (adsManager) {
		adsManager.destroy();
	}
}

function onContentPauseRequested() {
	videoElement.pause();
}

function onContentResumeRequested() {
	videoElement.play();
}

let
	startGameBtn = document.querySelector('.js-game-menu-btn'),
	game = document.querySelector('#game'),
	result = document.querySelector('#result'),
	btnContainer = document.querySelector('.js-game-menu-container'),
	// playAgain = document.querySelector('#play-again'),
	exitGame = document.querySelector('#exit-game'),
	fields = Array.from(document.querySelectorAll(".js-game-field")),
	count = 0,
	zero = `<svg class="zero"><circle r="45" cx="58" cy="58" stroke="red" stroke-width="10" fill="none" stroke-linecap="round"/></svg>`,
	cross = `<svg class="cross"><line class="cross__first" x1="15" y1="15" x2="100" y2="100" stroke="blue" stroke-width="10" fill="none" stroke-linecap="round"/><line class="cross__last" x1="100" y1="15" x2="15" y2="100" stroke="blue" stroke-width="10" fill="none" stroke-linecap="round"/></svg>`;

function startGame() {
	let buttonId = startGameBtn.getAttribute('id');
	let gameMenuContainer = document.querySelector('#game-menu-container');

	gameMenuContainer.removeAttribute('class');
	gameMenuContainer.classList.add(buttonId);
	document.body.classList.remove('modal-active');
}

function exit() {
	let gameMenuContainer = document.querySelector('#game-menu-container');

	gameMenuContainer.classList.add('out');
	document.body.classList.remove('modal-active');
}

function AIPlay() {
	let emptyFields = fields.filter(el => el.innerHTML === '');
	let random_index = Math.floor(Math.random() * emptyFields.length);

	if (count !== 9) {
		emptyFields[random_index].innerHTML = zero;
		emptyFields[random_index].classList.add('o');
		let zeroAudio = new Audio('audio/zero.mp3');
		zeroAudio.play();
		count++;
	}

};

function stepCross(target) {
	target.innerHTML = cross;
	target.classList.add('x');
	let crossAudio = new Audio('audio/cross.mp3');
	crossAudio.play();
	count++;
}

function win() {
	let comb = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	for (let i = 0; i < comb.length; i++) {

		if (fields[comb[i][0]].classList.contains('x') && fields[comb[i][1]].classList.contains('x') && fields[comb[i][2]].classList.contains('x')) {
			setTimeout(() => {
				fields[comb[i][0]].classList.add('active');
				fields[comb[i][1]].classList.add('active');
				fields[comb[i][2]].classList.add('active');
				result.innerText = 'You won';
				btnContainer.classList.add('show');
			}, 1500);
			game.removeEventListener('click', init);
		}
		else if (fields[comb[i][0]].classList.contains('o') && fields[comb[i][1]].classList.contains('o') && fields[comb[i][2]].classList.contains('o')) {
			setTimeout(() => {
				fields[comb[i][0]].classList.add('active');
				fields[comb[i][1]].classList.add('active');
				fields[comb[i][2]].classList.add('active');
				result.innerText = 'You lose';
				btnContainer.classList.add('show');
			}, 1500);
			game.removeEventListener('click', init);
		}
		else if (count == 9) {
			setTimeout(() => {
				result.innerText = 'Noone is winner';
				btnContainer.classList.add('show');
				game.removeEventListener('click', init);
			}, 1500);
		}
	}
}

function init(e) {
	stepCross(e.target);
	AIPlay();
	win();
}

function newGame() {
	count = 0;
	result.innerText = '';
	fields.forEach(el => {
		el.innerHTML = '';
		el.classList.remove('x', 'o', 'active');
	});
	btnContainer.classList.remove('show');
	game.addEventListener('click', init);
}

document.body.addEventListener('keydown', (e) => {
	if (e.key == "Enter") {
		startGame();
	}
});
startGameBtn.addEventListener('click', startGame);
game.addEventListener('click', init);
playButton.addEventListener('click', newGame);
exitGame.addEventListener('click', exit);