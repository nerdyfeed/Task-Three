var colors = [];
var div = document.getElementsByClassName('item');
var playBtn = document.getElementById('playbtn');
var clickCount = 0;
var clicks = [];
var correctClicks = [];
var time, ClockTimer, GameTimer;

function genHex() { // Генерация цвета
	var n = 6, s = '#';
	while(n--){
		s += (Math.random() * 16 | 0).toString(16);		// Случайный символ от 0 до f
	}
	return s; // Вернуть готовый HEX-код
}

function genColors() { // Запись 8 случайных цветов в массив
	for(i = 0; i < 8; i++ ){
		colors[i] = genHex(); // Внести в массив сгенерированные цвета
	}
}

function newGame() { // Начинаем игру
	Stopwatch(); // Запускаем секундомер
	genColors(); // Записываем цвета
	duplicate(); // Клонируем и сохраняем массив
	for(i = 0; i < 16 ; ++i) { // Выдаём элементам их цветовые коды
		var game_att = document.createAttribute("game-item"); // Создать аттрибут
		game_att.value = colors[i]; // Записать в него цвет ячейки
		div[i].setAttributeNode(game_att); // выдать аттрибуты всем элементам
	}
}

function duplicate() { // Дублирование массива
	colors = colors.slice(0).concat(colors);
	colors.sort(arrayRandom); // Перемешиваем массив
}

function arrayRandom() { // Перемешивание массива
	return Math.random() - 0.5;
}

function Stopwatch() { //Секундомер для игры
	var min = "00";
	var sec = 0;
	ClockTimer = setInterval(function(){
			sec++;
			if(sec == 60) {
				parseInt(min);
				min++;
				min = "0" + min;
				sec = 0;
			}
			if(sec === 0 || sec < 10) {
				sec = "0" + sec;
			}
			time = min + ":" + sec;
			document.getElementById("timer").innerHTML = time;
	}, 1000);	
}

document.body.onclick = function (e) { // Обработка нажатий
	e = e || event;
	var target = e.target || e.srcElement;
	var block = target.getAttribute("game-item");
		
	if (clickCount < 2 && target.classList.contains("item")) { // Показ цветов ячеек
		target.setAttribute("style", "background:" + block + ";" );
		target.classList.add(block);
		clickCount++;
		clicks.push(block);
	}
}
	

function check() { // Проверка по времени
	if(clickCount > 1 && clicks.length > 1) {
		if(clicks[0] == clicks[1]) { // Если обе ячейки совпали
			clickCount = 0;
			correctClicks.push(clicks[0]);
			console.log(correctClicks.length);
			clicks = [];
			clearInterval();
		} else { // Если ошибка
			clickCount = 0;
				for (i = 0 ; i < clicks.length ; ++i) {
				document.getElementsByClassName(clicks[i])[0].removeAttribute("style");
				}
			clicks = [];
			}
		}
	if(correctClicks.length == colors.length/2) { // Победа
		alert("Вы выйграли!\nЗатраченнное время: " + time); // Вывод сообщения
		clearTimeout(ClockTimer); // Отключаем секундомер
		clearInterval(GameTimer); // Отключаем наблюдателя за игрой
		location.reload(); // Перезагружаем страницу
		}
}
// Обработчик нажатия кнопки
playBtn.onclick = function() {
	newGame(); // Начинаем игру
	playBtn.disabled = true; // Отключаем кнопку старта
	GameTimer = setInterval(function() { // Запускаем наблюдателя за игрой
		check();
	}, 100);
}