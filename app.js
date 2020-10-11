//1.Написать игру крестики-нолики на чистом js
//2.Управление через клавиатуру - стрелки для перемещения и Enter
//3.Запуск приложения - появляется окно с кнопками Играть или Выйти
//4.Если нажато Играть - загружаем игру
//5.Заходим на страницу - игровое поле 3*3 человек с компьютером
//6.Состояние игры: 1.Выигрыш, 2.Проигрыш, 3.Ничья
//7.Выбор: сыграете еще или выйти
//8.При выборе "Сыграть еще" показывать видео-рекламу тестовую от гугл google ima sdk
//9.Разрешение 1280*720, не адаптировать, дизайн на свое усмотрение
//10.url на тестовое и архив с исходниками

// let zero = document.querySelector('circle');
// console.log(zero.getTotalLength());

let game = document.querySelector('#game'),
	result = document.querySelector('#result'),
	btnNewGame = document.querySelector('#new-game'),
	fields = Array.from(document.querySelectorAll(".js-game-field")),
	// step = false,
	count = 0,
	zero = `<svg class="zero"><circle r="45" cx="58" cy="58" stroke="red" stroke-width="10" fill="none" stroke-linecap="round"/></svg>`,
	cross = `<svg class="cross"><line class="cross__first" x1="15" y1="15" x2="100" y2="100" stroke="blue" stroke-width="10" fill="none" stroke-linecap="round"/><line class="cross__last" x1="100" y1="15" x2="15" y2="100" stroke="blue" stroke-width="10" fill="none" stroke-linecap="round"/></svg>`;

// function stepZero(target) 
// 	target.innerHTML = zero;
// 	target.classList.add('o');
// 	let zeroAudio = new Audio('audio/zero.mp3');
// 	zeroAudio.play();
// 	count++;
// }

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
	}, 1500)

};

function stepCross(target) {
	target.innerHTML = cross;
	target.classList.add('x');
	let crossAudio = new Audio('audio/cross.mp3');
	crossAudio.play();
	count++;
}

// function init(e) {
// 	if (!step) stepCross(e.target);
// 	else stepZero(e.target);
// 	step = !step;
// 	win();
// }

function init(e) {
	stepCross(e.target);
	AIPlay();
	// step = !step;
	win();
}

function newGame() {
	// step = false;
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
		if (fields[comb[i][0]].classList.contains('x') && fields[comb[i][1]].classList.contains('x') && fields[comb[i][2]].classList.contains('x')) {
			setTimeout(() => {
				fields[comb[i][0]].classList.add('active');
				fields[comb[i][1]].classList.add('active');
				fields[comb[i][2]].classList.add('active');
				result.innerText = 'Выиграли X';
			}, 1500);
			game.removeEventListener('click', init);
		}
		else if (fields[comb[i][0]].classList.contains('o') && fields[comb[i][1]].classList.contains('o') && fields[comb[i][2]].classList.contains('o')) {
			setTimeout(() => {
				fields[comb[i][0]].classList.add('active');
				fields[comb[i][1]].classList.add('active');
				fields[comb[i][2]].classList.add('active');
				result.innerText = 'Выиграли 0';
			}, 1500);
			game.removeEventListener('click', init);
		}
		else if (count == 9) {
			setTimeout(() => {
				result.innerText = 'Ничья';
				game.removeEventListener('click', init);
			}, 1500);
		}

	}
}

btnNewGame.addEventListener('click', newGame);
game.addEventListener('click', init);