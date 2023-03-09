//###########################################################################################################--------Video con Show Scroll

var oneTimeVideo = false;
const videoIntro = document.querySelector('.video');
var scrollDown = document.getElementById('scroll_down');
scrollDown.style.display = "none";

window.addEventListener("scroll", function() {
  let refHeight = window.innerHeight;
  let refWidth = window.innerWidth;
  var scroll = this.scrollY;

  if (scroll > refHeight * 1.9 && oneTimeVideo == false) {
    videoIntro.play();
    oneTimeVideo = true;
    disableScroll();

    const myTimeout = setTimeout(weiter, 11200);
  }

  function weiter() {
    scrollDown.style.display = "flex";
    enableScroll();
  }

})

//###########################################################################################################--------Audio Hello
var oneTimeHello = false;
var elementHello = document.getElementById('audioHello');
const bottonHello = document.getElementById('check_hello');

const bottonHello2 = document.getElementById('check_hello2');
const cancelHello1 = document.getElementById('cancel_hello1');

const bottonHello3 = document.getElementById('check_hello3');
const cancelHello2 = document.getElementById('cancel_hello2');

//////////////////////////////////////////////////////// Para iniciar el audio Hello

window.addEventListener("scroll", function() {
  var scroll = window.scrollY;
  if (scroll > 100 && oneTimeHello == false) {
    elementHello.play();
    oneTimeHello = true;
    disableScroll();
  }
})
bottonHello.addEventListener('click', function() {
  enableScroll();
  elementHello.pause();
});

//////////////////////////////////////////////////////// Segunda elección

cancelHello1.addEventListener('click', function() {
  elementHello.play();
  oneTimeHello = true;
  disableScroll();
});

bottonHello2.addEventListener('click', function() {
  enableScroll();
  elementHello.pause();
});

//////////////////////////////////////////////////////// tercera elección

cancelHello2.addEventListener('click', function() {
  elementHello.play();
  oneTimeHello = true;
  disableScroll();
});

bottonHello3.addEventListener('click', function() {
  enableScroll();
  elementHello.pause();
});

//###########################################################################################################--------Audio Transfer Complet

var oneTimeTransfer = false;
var transfer = document.getElementById('transfer');
var elementTransfer = document.getElementById('transferAudio');

window.addEventListener("scroll", function() {
  let refHeight = window.innerHeight;
  let refWidth = window.innerWidth;
  var scroll = window.scrollY;

  if (scroll > refHeight * 7 && oneTimeTransfer == false) {
    elementTransfer.play();
    oneTimeTransfer = true;
    // const myTimeout = setTimeout(weiter, 11200);
  }
})

//###########################################################################################################--------SAFETY MEASURE

var oneTimeSafety = false;
var safety = document.getElementById('safety');
var safetyAudio = document.getElementById('safetyAudio');

window.addEventListener("scroll", function() {
  let refHeight = window.innerHeight;
  let refWidth = window.innerWidth;
  var scroll = window.scrollY;

  if (scroll > refHeight * 1.9 && oneTimeSafety == false) {
    safetyAudio.play();
    oneTimeSafety = true;
    // const myTimeout = setTimeout(weiter, 11200);
  }
})

//###########################################################################################################--------check IA
const bottonIA = document.getElementById('check_ia');
const cancelIA = document.getElementById('cancel_ia');

function showIA() {
  //var scroll = this.scrollY;
  //window.scrollTo(0, sectionIA);
  //document.getElementById('section_ia').style.display = "block";
  const teilIa = document.getElementById('section_ia');
  teilIa.style.display = "block";
  teilIa.scrollIntoView({
    behavior: "smooth"
  });
}
bottonIA.addEventListener('click', function() {
  enableScroll();
  showIA();
});


// window.addEventListener("scroll", function() {
//   let refHeight = window.innerHeight;
//   let refWidth = window.innerWidth;
//   var scroll = window.scrollY;
//   console.log(window.scrollY / refHeight);
//   if (scroll > refHeight * 32) {
//     disableScroll();
//   }
// })
// cancelIA.addEventListener('click', function() {
//   enableScroll();
// });