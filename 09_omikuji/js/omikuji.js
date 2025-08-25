"use strict";
window. addEventListener("DOMContentLoaded",
function() {

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
    $(function(){
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

// Button
const btn1 = document.getElementById("btn1");
btn1.addEventListener("click", function() {
  /* let n = Math.floor(Math.random() * 3);

  switch (n) {
    case 0:
      btn1.textContent = "Very Happy!!";
      btn1.style.color = "#FFDAB9";
      btn1.style.fontFamily = "'Sawarabi Mincho', serif";
      btn1.style.fontSize = "35px";
      break;
    case 1:
      btn1.textContent = "Happy!";
      btn1.style.color = "#66B2B2";
      btn1.style.fontFamily = "'Sawarabi Mincho', serif";
      btn1.style.fontSize = "30px";
      break;
    case 2:
      btn1.textContent = "UnHappy...";
      btn1.style.color = "#8E4585";
      btn1.style.fontFamily = "'Sawarabi Mincho', serif";
      btn1.style.fontSize = "20px"; 
      break;
    }
*/

let resultText = ["大吉!!!!!", "吉!!!!", "中吉!!!", "小吉!!", "未吉!", "凶。。"];
let resultColor = ["#FFDAB9", "#66B2B2", "#D32F2F", "#A3C36D", "#FFC324", "#8E4585"];
let resultFontSize = [55, 50, 45, 40, 35, 30];
let resultMaxSpeed = [10, 10, 8, 5, 5, 5];
let resultMaxSize = [ 30, 30, 20, 15, 20, 20];
let resultImage = [
  "images/star.png",
  "images/sakura_hanabira.png",
  "images/sakura_hanabira.png",
  "images/sakura_hanabira.png",
  "images/leaf.png",
  "images/snowflakes.png"
];
let n = Math.floor(Math.random() * resultText.length);
btn1.textContent = resultText[n];
btn1.style.color = resultColor[n];
btn1.style.fontSize = resultFontSize[n];

    // snowfall stop
$(document).snowfall("clear");
// jQueryのsnowfall
$(document).ready(function(){
$(document).snowfall({
maxSpeed : resultMaxSpeed[n], 
minSpeed : 1, 
maxSize : resultMaxSize[n], 
minSize : 1, 
image : resultImage[n]
});
});

  }, false
);
