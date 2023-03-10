var bird = document.getElementById('birds');
//---------------------------------Random
//Taken from :https://stackoverflow.com/questions/2450954/
//		      how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }

  return array;
}
//---------------------------------Bilder
for (let i = 0; i < 30; i++) {
  var dumi = document.createElement("div");
  dumi.classList.add('cuadrados');
  document.getElementById('check_list').appendChild(dumi);
}
var cuadrados = document.getElementsByClassName('cuadrados');

function mouseEnter(a, c) {
  a.style.backgroundColor = "black";
  //bird.style.backgroundImage = "url('uploads/pajaros_" + c + ".jpg')";
  bird.style.backgroundImage = "url('https://raw.githubusercontent.com/keinRoboter/VirtualExistence/main/uploads/pajaros_" + c + ".jpg')";
  // bird.style.backgroundImage = "url(img/pajaros_ " + c + ".jpg)";
  bird.style.backgroundSize = "cover";
}

function mouseLeave(b, d) {
  if (d > 15) {
    b.style.backgroundColor = "rgba(" + 0 + "," + 0 + "," + 0 + "," + 0.1 + ")";
  }
  bird.style.backgroundImage = "";
}

var randomValue = Array(30).fill().map((element, index) => index)
// console.log(randomValue);
randomValue = shuffle(randomValue);
// console.log(randomValue);

for (let i = 0; i < cuadrados.length; i++) {
  cuadrados[i].addEventListener("mouseenter",
    function() {
      mouseEnter(cuadrados[i], randomValue[i]);
    }, false);

  cuadrados[i].addEventListener("mouseleave",
    function() {
      mouseLeave(cuadrados[i], randomValue[i]);
    }, false);
}