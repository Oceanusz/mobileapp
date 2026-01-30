"use strict";
/* set flag */
let flag ="cat-flag";

/* turn & counter */
let counter = 9;

// class="square" を取得
const square = document.getElementsByClassName("square");

//Array change
const squareArray = Array.from(square);

// squaresの要素を取得
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

// class="level" を取得
const levels = document.querySelectorAll(".level");

// levelの要素を取得　レベル設定エリア
const level_1 = document.getElementById("level_1");
const level_2 = document.getElementById("level_2");
const level_3 = document.getElementById("level_3");

// NewGame button
const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");


// Win or Lose Judgment Line
const line1 = JudgLine(squareArray, ["a_1", "a_2", "a_3"]);
const line2 = JudgLine(squareArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgLine(squareArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgLine(squareArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgLine(squareArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgLine(squareArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgLine(squareArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgLine(squareArray, ["a_3", "b_2", "c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];
let winningLine = null;

const lineRandom = cornerLine(squareArray, ["a_1", "a_3", "c_1", "c_3"]);

// CORNER LINE
function cornerLine(targetArray, idArray) {
  return targetArray.filter(function (e) {
    return (
      e.id === idArray[0] ||
      e.id === idArray[1] ||
      e.id === idArray[2] ||
      e.id === idArray[3]
    );
  });
}


// MESSAGE
const msgtxt1 = '<p class="image"><img src ="img/cat.jpg" width=61px height=61px></p><p class="text">Cat Turn! (Your turn) </p>';
const msgtxt2 = '<p class="image"><img src ="img/dog.jpg" width=61px height=61px></p><p class="text">Dog Turn! (Computer turn) </p>';
const msgtxt3 = '<p class="image"><img src ="img/cat.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInRight">Cat Win!</p>';
const msgtxt4 = '<p class="image"><img src ="img/dog.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInLeft">Dog Win!</p>';
const msgtxt5 =
  '<p class="image"><img src="img/cat.jpg" width="61" height="61">' +
  '<img src="img/dog.jpg" width="61" height="61"></p>' +
  '<p class="text animate__animated animate__bounceIn">Draw!!</p>';
let gameSound = ["sound/click_sound1.mp3","sound/click_sound2.mp3","sound/catwin.mp3","sound/dogwin_sound.mp3","sound/draw_sound.mp3"];


//************************************ */
window.addEventListener("DOMContentLoaded",
function() {
    // msg
    setMessage("cat-turn");
    // check square can click or not
    squareArray.forEach(function(square) {
      square.classList.add("js-clickable");
    });

    LevelSetting(0);
  }, false
);

// **********************************************
// レベル設定
// **********************************************
let index; //クリックした要素のインデックスを格納する変数
levels.forEach((level) => {
  level.addEventListener("click", () => {
    index = [].slice.call(levels).indexOf(level);
    LevelSetting(index);
  });
});

function LevelSetting(index) {
  // レベル設定ボタン　スタイルクリア
  level_1.classList.remove("level-selected");
  level_2.classList.remove("level-selected");
  level_3.classList.remove("level-selected");
  level_1.classList.remove("level-non-selected");
  level_2.classList.remove("level-non-selected");
  level_3.classList.remove("level-non-selected");

  // セッションストレージにkeyがある場合は初回ではない
  if (sessionStorage.getItem("tic_tac_toe_access")) {
    switch (index) {
      case 0:
        sessionStorage.setItem("tic_tac_toe_access", "1");
        level_1.classList.add("level-selected");
        level_2.classList.add("level-non-selected");
        level_3.classList.add("level-non-selected");
        break;
      case 1:
        sessionStorage.setItem("tic_tac_toe_access", "2");
        level_1.classList.add("level-non-selected");
        level_2.classList.add("level-selected");
        level_3.classList.add("level-non-selected");
        break;
      case 2:
        sessionStorage.setItem("tic_tac_toe_access", "3");
        level_1.classList.add("level-non-selected");
        level_2.classList.add("level-non-selected");
        level_3.classList.add("level-selected");
        break;
      default:
        level_1.classList.add("level-selected");
        level_2.classList.add("level-non-selected");
        level_3.classList.add("level-non-selected");
        break;
    }
  } else {
    // keyがない場合は初回
    sessionStorage.setItem("tic_tac_toe_access", "1");
    level_1.classList.add("level-selected");
    level_2.classList.add("level-non-selected");
    level_3.classList.add("level-non-selected");
  }
}



//************************************ */
// Win or Lose Judment Line Click
squareArray.forEach(function (square) {
  square.addEventListener('click', () => {

    if (counter === 9) {
      const levelBox = document.getElementById("levelBox");
      levelBox.classList.add("js-unclickable"); // ゲーム途中でlevelBoxをクリックできない
    }

    let gameOverFlg = isSelect(square); //gameStatus

    if (gameOverFlg === "0") {
      const squaresBox = document.getElementById("squaresBox");
      squaresBox.classList.add("js-unclickable");
      setTimeout(function () {
        dogTurn();
      }, 2000);
    }
  });
});



//JavaScript filter
function JudgLine(targetArray, idArray) {
  return targetArray.filter(function(e) {
       return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
  });
}

// Who is Winner
function isWinner(symbol) {
  const result = lineArray.some(function (line) {
    const subResult = line.every(function (square) {
      if (symbol === "cat") {
        return square.classList.contains("js-cat-checked");
      } else if (symbol === "dog") {
        return square.classList.contains("js-dog-checked");
      }
      return false;
    });

    if (subResult) {
      winningLine = line; // lưu line thắng (để bài sau vẽ line nếu cần)
    }
    return subResult;
  });

  return result;
}


//****************************************** */
// click square then cat and dog appear
function isSelect(selectSquare) {
  let gameOverFlg = "0";
    // Cat turn
    if (flag === "cat-flag") {
    //click sound cat
    let music = new Audio(gameSound[0]);
    music.currentTime = 0;
    music.play();

      selectSquare.classList.add("js-cat-checked");   // hiện cat
      selectSquare.classList.add("js-unclickable");   // khóa ô
      selectSquare.classList.remove("js-clickable");

    if (isWinner("cat")) {
      setMessage("cat-win");
      gameOver("cat");
      return gameOverFlg = "1";
    }
      flag = "dog-flag";                              // đổi lượt
      setMessage("dog-turn");                         // đổi message


    } else {
      //click sound dog
      let music = new Audio(gameSound[1]);
      music.currentTime = 0;
      music.play();

      // Dog turn
      selectSquare.classList.add("js-dog-checked");   // hiện dog
      selectSquare.classList.add("js-unclickable");   // khóa ô
      selectSquare.classList.remove("js-clickable");
      if (isWinner("dog")) {
        setMessage("dog-win");
        gameOver("dog");
        return gameOverFlg = "1";
      }
      flag = "cat-flag";                              // đổi lượt
      setMessage("cat-turn");                         // đổi message
    }
  
    // giảm counter
    counter--;

    //Draw
    if (counter === 0) {
      setMessage("draw");
      gameOver("draw");
      return gameOverFlg = "1";
    }
  
    return gameOverFlg = "0"
  }

//****************************************** */  
/* message change */
function setMessage(id) {
  switch (id) {
    case "cat-turn":
      document.getElementById("msgtext").innerHTML = msgtxt1;
      break;
    case "dog-turn":
      document.getElementById("msgtext").innerHTML = msgtxt2;
      break;
    case "cat-win":
      document.getElementById("msgtext").innerHTML = msgtxt3;
      break;
    case "dog-win":
      document.getElementById("msgtext").innerHTML = msgtxt4;
      break;
    case "draw":
      document.getElementById("msgtext").innerHTML = msgtxt5;
      break;
    default:
      document.getElementById("msgtext").innerHTML = msgtxt1;
  }
}

/* Handle gameOver */
function gameOver(status) {
  // GameOver sound
  let w_sound;
  switch (status) {
    case "cat" :
      w_sound = gameSound[2];
      break;
    case "dog" :
      w_sound = gameSound[3];
      break;
    case "draw" :
      w_sound = gameSound[4];
      break;
  }
  
// ✅ play win/draw sound
  let music = new Audio(w_sound);
  music.currentTime = 0;
  music.play();

  // all squares unclickable
  // squareArray.forEach(function (square) {
  //  square.classList.add("js-unclickable");
  // });
  const squaresBox = document.getElementById("squaresBox");
  squaresBox.classList.add("js-unclickable");

  newgamebtn_display.classList.remove("js-hidden");


  if (status === "cat") {
    // highlight cat (nhớ class phải tồn tại trong CSS)
    if (winningLine) {
      winningLine.forEach(function (square) {
        square.classList.add("js-cat_highLight");
      });
    }

    // 🐱 Cat: snowflake ❄ (theme xanh)
    startEffect({
      emoji: "❄",
      color: "rgb(173, 216, 230)", // xanh trời nhạt
      intervalMs: 90,
      sizeMin: 14,
      sizeMax: 30
    });

  } else if (status === "dog") {
    // highlight dog
    if (winningLine) {
      winningLine.forEach(function (square) {
        square.classList.add("js-dog_highLight"); // chú ý đúng chính tả highLight
      });
    }

    // 🐶 Dog: yellow leaves 🍂
    startEffect({
      emoji: "🍂",
      color: "rgb(255, 215, 100)", // vàng
      intervalMs: 120,
      sizeMin: 16,
      sizeMax: 34
    });

  } else if (status === "draw") {
    // 🤝 Draw: momiji 🍁
    startEffect({
      emoji: "🍁",
      color: "rgb(220, 20, 60)", // đỏ (emoji vốn đã đỏ, color có thể ít tác dụng)
      intervalMs: 120,
      sizeMin: 18,
      sizeMax: 36
    });
  }
}

// ===== Emoji Falling Effect (no jQuery needed) =====
let _fxTimer = null;
let _fxStyleAdded = false;

function stopEffect() {
  if (_fxTimer) {
    clearInterval(_fxTimer);
    _fxTimer = null;
  }
  const layer = document.getElementById("fx-layer");
  if (layer) layer.remove();
}

function startEffect({ emoji = "❄", color = "#fff", intervalMs = 120, sizeMin = 14, sizeMax = 28 } = {}) {
  stopEffect();

  if (!_fxStyleAdded) {
    const style = document.createElement("style");
    style.textContent = `
      #fx-layer{
        position: fixed;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
        z-index: 9999;
      }
      .fx-item{
        position: absolute;
        top: -40px;
        will-change: transform, top, opacity;
        user-select: none;
        text-shadow: 0 0 6px rgba(0,0,0,0.2);
        animation: fx-fall linear forwards;
      }
      @keyframes fx-fall{
        to { transform: translate(var(--dx), 110vh) rotate(var(--rot)); opacity: 0.2; }
      }
    `;
    document.head.appendChild(style);
    _fxStyleAdded = true;
  }

  const layer = document.createElement("div");
  layer.id = "fx-layer";
  document.body.appendChild(layer);

  _fxTimer = setInterval(() => {
    const el = document.createElement("span");
    el.className = "fx-item";
    el.textContent = emoji;

    const size = rand(sizeMin, sizeMax);
    const left = rand(0, window.innerWidth);
    const duration = rand(3500, 7000); // ms
    const dx = rand(-80, 80) + "px";
    const rot = rand(-540, 540) + "deg";

    el.style.left = left + "px";
    el.style.fontSize = size + "px";
    el.style.color = color; // works for ❄, less effect on multi-color emoji like 🍁/🍂
    el.style.setProperty("--dx", dx);
    el.style.setProperty("--rot", rot);
    el.style.animationDuration = duration + "ms";

    layer.appendChild(el);

    // cleanup
    setTimeout(() => el.remove(), duration + 200);
  }, intervalMs);
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Clear Effect */
function clearEffects() {
  // nếu đang dùng snowfall
  if (window.jQuery && typeof $(document).snowfall === "function") {
    $(document).snowfall("clear");
  }
  // nếu có hiệu ứng tự viết
  if (typeof stopEffect === "function") {
    stopEffect();
  }
}


/* NEW GAME CLICK EFFECT */
newgamebtn.addEventListener("click", function () {

  // reset flag & counter
  flag = "cat-flag";
  counter = 9;
  winningLine = null;

  // reset all squares
  squareArray.forEach(function (square) {
    square.classList.remove("js-cat-checked");
    square.classList.remove("js-dog-checked");
    square.classList.remove("js-unclickable");
    square.classList.remove("js-cat_highLight");
    square.classList.remove("js-dog_highLight");
    square.classList.add("js-clickable");
  });
  const squaresBox = document.getElementById("squaresBox");
  squaresBox.classList.remove("js-unclickable");

    // ✅ mở lại chọn level
    const levelBox = document.getElementById("levelBox");
    levelBox.classList.remove("js-unclickable");
  

  // reset message
  setMessage("cat-turn");

  // hide New Game button
  newgamebtn_display.classList.add("js-hidden");

  // stop effects (snow / leaf / momiji)
  clearEffects();
});

// REACH
//************************************************************
function isReach(status) {
  let dogTurnEnd = "0";

  lineArray.some(function (line) {
    let dogCheckCnt = 0;
    let catCheckCnt = 0;

    line.forEach(function (square) {
      if (square.classList.contains("js-dog-checked")) dogCheckCnt++;
      if (square.classList.contains("js-cat-checked")) catCheckCnt++;
    });

    // Dog reach (attack): dog=2, cat=0
    if (status === "dog" && dogCheckCnt === 2 && catCheckCnt === 0) {
      dogTurnEnd = "1";
    }

    // Cat reach (defense): dog=0, cat=2
    if (status === "cat" && dogCheckCnt === 0 && catCheckCnt === 2) {
      dogTurnEnd = "1";
    }

    if (dogTurnEnd === "1") {
      line.some(function (square) {
        if (square.classList.contains("js-clickable")) {
          isSelect(square);
          return true; // break line.some
        }
      });
      return true; // break lineArray.some
    }
  });

  return dogTurnEnd;
}



// DOG TURN
//*********************************************************** 
function dogTurn() {
  // ✅ lấy level từ sessionStorage
  let level = sessionStorage.getItem("tic_tac_toe_access");

  let dogTurnEnd = "0";
  let gameOverFlg = "0";

  while (dogTurnEnd === "0") {

    // Level1/2/3: ưu tiên Dog thắng nếu có
    if (level === "1" || level === "2" || level === "3") {
      dogTurnEnd = isReach("dog");
      if (dogTurnEnd === "1") {
        gameOverFlg = "1";
        break;
      }
    }

    // Level2/3: chặn Cat nếu Cat sắp thắng
    if (level === "2" || level === "3") {
      dogTurnEnd = isReach("cat");
      if (dogTurnEnd === "1") {
        break;
      }
    }

    // Level2/3: ưu tiên đánh giữa b_2 nếu còn trống
    if (level === "2" || level === "3") {
      if (b_2.classList.contains("js-clickable")) {
        gameOverFlg = isSelect(b_2);
        dogTurnEnd = "1";
        break;
      }
    }

    // Level3: ưu tiên góc theo thứ tự a_1 → a_3 → c_1 → c_3
    if (level === "3") {
      for (let sq of lineRandom) {
        if (sq.classList.contains("js-clickable")) {
          gameOverFlg = isSelect(sq);
          dogTurnEnd = "1";
          break;
        }
      }
      if (dogTurnEnd === "1") break;
    }

    // còn lại: random
    const dogSquare = squareArray.filter(function (sq) {
      return sq.classList.contains("js-clickable");
    });
    let n = Math.floor(Math.random() * dogSquare.length);
    gameOverFlg = isSelect(dogSquare[n]);
    break;
  }

  // If not GameOver -> mở click lại cho user
  if (gameOverFlg === "0") {
    const squaresBox = document.getElementById("squaresBox");
    squaresBox.classList.remove("js-unclickable");
  }
}


