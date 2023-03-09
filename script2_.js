//###############################################################################--------Scroll event (control enable/disable)
var oneTimeVideo = false;
var oneTimeHello = false;
var oneTimeTransfer = false;
var oneTimeSafety = false;

var safety = document.getElementById('safety');
var safetyAudio = document.getElementById('safetyAudio');

var transfer = document.getElementById('transfer');
var elementTransfer = document.getElementById('transferAudio');

const videoIntro = document.querySelector('.video');
var scrollDown = document.getElementById('scroll_down');
scrollDown.style.display = "none"; //Dont show scroll bar
var refHeight = window.innerHeight;
var refWidth = window.innerWidth;

var elementHello = document.getElementById('audioHello');
const bottonHello = document.getElementById('check_hello');
const bottonHello2 = document.getElementById('check_hello2');
const cancelHello1 = document.getElementById('cancel_hello1');
const bottonHello3 = document.getElementById('check_hello3');
const cancelHello2 = document.getElementById('cancel_hello2');
//--------------------------------------------------Event for pressing Hello Button -/ INTERACTION
bottonHello.addEventListener('click', function() {
  enableScroll();
  elementHello.pause();
});
///////////////////////////////////////////////////////// second choice
cancelHello1.addEventListener('click', function() {
  elementHello.play();
  oneTimeHello = true;
  disableScroll();
});
bottonHello2.addEventListener('click', function() {
  enableScroll();
  elementHello.pause();
});
//////////////////////////////////////////////////////// third choice
cancelHello2.addEventListener('click', function() {
  elementHello.play();
  oneTimeHello = true;
  disableScroll();
});

bottonHello3.addEventListener('click', function() {
  enableScroll();
  elementHello.pause();
});

//----------------------thresholds
var intro_thr = 1.9;
var hello_thr = 0.9;
var transfer_thr = 6.85;
var safety_thr = 45;
var ia_thr = 40;

//--------------------------------------------------------------------------------- Scroll control
window.addEventListener("scroll", function() {
  let scroll = window.scrollY;
  //--------------------------------------Keep going - function
  function weiter() {
    scrollDown.style.display = "flex";
    enableScroll();
  }
  //###############################################################################--------Video Show Scroll (listen to my story...)
  if (scroll > refHeight * intro_thr && oneTimeVideo == false) {
    videoIntro.play();
    oneTimeVideo = true;
    disableScroll();
    const myTimeout = setTimeout(weiter, 11200);
  }
  //###############################################################################-------Hello_audio
  if (scroll > refHeight * hello_thr && oneTimeHello == false) {
    elementHello.play();
    oneTimeHello = true;
    disableScroll();
  }
  //################################################################################---------Transfer completed
  if (scroll > refHeight * transfer_thr && oneTimeTransfer == false) {
    elementTransfer.play();
    oneTimeTransfer = true;
    // const myTimeout = setTimeout(weiter, 11200);
  }
  //###############################################################################----------Safety Measure
  if (scroll > refHeight * safety_thr && oneTimeSafety == false) {
    safetyAudio.play();
    oneTimeSafety = true;
    // const myTimeout = setTimeout(weiter, 11200);
  }
  ///////////////////////////////////////////////////---------AI Disabling Scroll
  console.log(window.scrollY / refHeight);
  if (scroll > refHeight * ia_thr) {
    disableScroll();
  }
});

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
cancelIA.addEventListener('click', function() {
  enableScroll();
});