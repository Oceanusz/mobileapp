"use strict";
let n = " ";
let nBefore = " ";

window.addEventListener("DOMContentLoaded",
  function () {

    $("header").textillate({
      loop: false,
      minDisplayTime: 2000,
      initialDelay: 2000,
      autoStart: true,
      in: {
        effect: "fadeInLeftBig",
        delayScale: 1.5,
        delay: 50,
        sync: false,
        shuffle: true
      }
    });
    $(function () {
      ScrollReveal().reveal("#btn1", { duration: 9000 });
    });

    this.setTimeout(
      function () {
        let popMessage = "おみくじだよん草~";
        this.window.alert(popMessage);
      },
      "5000"
    );
  }, false
);

let soundEndflag = "0"; // sound control
// Button
const btn1 = document.getElementById("btn1");
const omikujiText = document.getElementById("omikujiText");
const omikujiTextImage = document.getElementById("omikujiTextImage"); 
btn1.addEventListener("click", function () {
  if (soundEndflag === "1") {
    soundControl("end", "");
  }

 
  let resultText = [
    "images/daikichi.png",
    "images/chukichi.png",
    "images/syokichi.png",
    "images/suekichi.png",
    "images/daikyo.png"
  ];
  let resultMaxSpeed = [10, 10, 8, 5, 5];
  let resultMaxSize = [30, 30, 30, 40, 30];
  let resultImage = [
    "images/star.png",
    "images/sakura_hanabira.png",
    "images/water1.png",
    "images/redLeaves4.png",
    "images/snowflakes.png"
  ];
  let resultSound = [
    "sound/omikuji_sound1.mp3",
    "sound/omikuji_sound2.mp3",
    "sound/omikuji_sound3.mp3",
    "sound/omikuji_sound4.mp3",
    "sound/omikuji_sound5.mp3"
  ];

  let n = Math.floor(Math.random() * resultText.length);

while (n === nBefore) {
    n = Math.floor(Math.random() * resultText.length);
}
nBefore = n;

  omikujiTextImage.src = resultText[n];
  omikujiTextImage.classList.add("omikujiPaper");
  omikujiTextImage.addEventListener("animationed",
  function() {
    omikujiTextImage.classList.remove("omikujiPaper");
  }, false
  );
 
  w_sound = resultSound[n];
  soundControl("start", w_sound);
  soundEndflag = "1";



  // snowfall stop
  $(document).snowfall("clear");
  // jQueryのsnowfall
  $(document).ready(function () {
    $(document).snowfall({
      maxSpeed: resultMaxSpeed[n],
      minSpeed: 1,
      maxSize: resultMaxSize[n],
      minSize: 1,
      image: resultImage[n]
    });
  });

}, false
);

// sound control
let w_sound
let music
function soundControl(status, w_sound) {
  if (status === "start") {
    music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();
  } else if (status === "end") {
    music.pause();
    music.currentTime = 0;
  }
}