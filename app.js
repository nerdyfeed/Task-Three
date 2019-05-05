var colors = [];
var newmap = [];
var arr = [];
var arr2 = [];
var a = [];
var b = [];
var div = document.getElementsByClassName('row');
var clickCount = 0;
var clicks = [];


function genHex() { // Генерация цвета
	var n = 6, s = '#';
	while(n--){
		s += (Math.random() * 16 | 0).toString(16);    // random char from 0 to f
    }
    return s;
}

function genColors() { // Запись 8 случайных цветов в массив
    for(i = 0; i < 8; i++ ){
        a[i] = genHex();
    }
}

function newGame() { // Начинаем игру
    for(i = 0; i < 16 ; ++i) {
        var att = document.createAttribute("state");
        var att2 = document.createAttribute("game-item");
        att2.value = b[i];
        att.value = "0"; 
        div[i].setAttributeNode(att2);
        div[i].setAttributeNode(att);
        
        // div[i].style.background = b[i];
    }
}

function duplicate() { // Дублирование массива (temp)

for(var i = 0; i< a.length; ++i){
  b.push(a[i]);
  b.push(a[i]);
}
    b.sort(arrayRandom)
    a=b;  
    console.log(b);
    return b;
}

function arrayRandom(a, b) { // Перемешивание массива
    return Math.random() - 0.5;
}

document.body.onclick = function (e) {
        e = e || event;
        var target = e.target || e.srcElement;
        var block = target.getAttribute("game-item")
        
        if (clickCount < 2 && target.getAttribute("state") == 0) {
            target.setAttribute("style", "background:" + block + ";" );
            // target.setAttribute("state" , "1");
            target.classList.add(block);
            console.log(block)
            clickCount++
            clicks.push(block);
            console.log(clicks[0] + " " + clicks[1])
        }
    }
    

    function check() { // Проверка по времени
        if (clicks[0] != clicks[1]) {
            for (i = 0 ; i < clicks.length ; i++) {
                document.getElementsByClassName(clicks[i])[0].removeAttribute("style");
            }
            clickCount = 0;
            clicks = [];
            console.log("Сброс")
        } else if (clicks[0] == clicks[1]) {
            clickCount = 0;
            clicks = [];
            console.log("Сохранено")
        }
        if (clicks.length == b.length) {
            alert("Game Over!");
            clearInterval();
        }
    }
// Обработчик кнопки
gen.onclick = function() {
    genColors()
    duplicate();
    newGame();
    document.getElementById('gen').style.display = 'none';
    var timerId = setInterval(function() {
        check();
      }, 1500);
}