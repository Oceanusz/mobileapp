"use strict";
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
btn1.addEventListener("click", function () {
  if (soundEndflag === "1") {
    soundControl("end", "");
  }

  let resultFontFamily = ["'Sawarabi Mincho', serif"];
  let resultText = ["大吉!!!!!", "吉!!!!", "中吉!!!", "小吉!!", "末吉!", "凶。。"];
  let resultColor = ["#FFDAB9", "#66B2B2", "#D32F2F", "#A3C36D", "#FFC324", "#8E4585"];
  let resultFontSize = ["90px", "80px", "70px", "60px", "50px", "40px"];
  let resultMaxSpeed = [10, 10, 8, 5, 5, 5];
  let resultMaxSize = [30, 30, 20, 15, 20, 20];
  let resultImage = [
    "images/star.png",
    "images/sakura_hanabira.png",
    "images/sakura_hanabira.png",
    "images/sakura_hanabira.png",
    "images/leaf.png",
    "images/snowflakes.png"
  ];
  let resultSound = [
    "sound/omikuji_sound1.mp3",
    "sound/omikuji_sound2.mp3",
    "sound/omikuji_sound2.mp3",
    "sound/omikuji_sound2.mp3",
    "sound/omikuji_sound2.mp3",
    "sound/omikuji_sound3.mp3",
  ];

  let n = Math.floor(Math.random() * resultText.length);
  omikujiText.style.fontFamily = resultFontFamily[n];
  omikujiText.textContent = resultText[n];
  omikujiText.style.color = resultColor[n];
  omikujiText.style.fontSize = resultFontSize[n];
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