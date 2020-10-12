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
window.onload = function () {
	let
		startGameBtn = document.querySelector('.js-game-menu-btn'),
		game = document.querySelector('#game'),
		result = document.querySelector('#result'),
		btnNewGame = document.querySelector('#new-game'),
		playAgain = document.querySelector('#play-again'),
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

		setTimeout(() => {
			if (count !== 9) {
				emptyFields[random_index].innerHTML = zero;
				emptyFields[random_index].classList.add('o');
				let zeroAudio = new Audio('audio/zero.mp3');
				zeroAudio.play();
				count++;
			}
		}, 1000)

	};

	function stepCross(target) {
		target.innerHTML = cross;
		target.classList.add('x');
		let crossAudio = new Audio('audio/cross.mp3');
		crossAudio.play();
		count++;
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
		game.addEventListener('click', init);
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
			setTimeout(() => {
				if (fields[comb[i][0]].classList.contains('x') && fields[comb[i][1]].classList.contains('x') && fields[comb[i][2]].classList.contains('x')) {
					fields[comb[i][0]].classList.add('active');
					fields[comb[i][1]].classList.add('active');
					fields[comb[i][2]].classList.add('active');
					result.innerText = 'You won';
					game.removeEventListener('click', init);
				}
				else if (fields[comb[i][0]].classList.contains('o') && fields[comb[i][1]].classList.contains('o') && fields[comb[i][2]].classList.contains('o')) {
					fields[comb[i][0]].classList.add('active');
					fields[comb[i][1]].classList.add('active');
					fields[comb[i][2]].classList.add('active');
					result.innerText = 'You lose';
					game.removeEventListener('click', init);
				}
				else if (count == 9) {
					result.innerText = 'Noone is winner';
					game.removeEventListener('click', init);
				}
			}, 5000);
		}

	}

	startGameBtn.addEventListener('click', startGame);
	game.addEventListener('click', init);
	playAgain.addEventListener('click', newGame);
	exitGame.addEventListener('click', exit);
}