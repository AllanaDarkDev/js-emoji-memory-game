const emojis = [
  "❤️",
  "❤️",
  "💀",
  "💀",
  "✨",
  "✨",
  "🌻",
  "🌻",
  "🕷️",
  "🕷️",
  "🍝",
  "🍝",
  "🧪",
  "🧪",
  "❄️",
  "❄️",
];

let openCards = [];

let battleMusic = new Audio(`src/sounds/battle.mp3`);
let isPlayingBattleMusic = false;

function playBattleMusic() {
  if (!isPlayingBattleMusic) {
    battleMusic.currentTime = 0;
    battleMusic.loop = true;
    battleMusic.play();
    isPlayingBattleMusic = true;
  }
}

function stopBattleMusic() {
  if (isPlayingBattleMusic) {
    battleMusic.pause();
    battleMusic.loop = false;
    isPlayingBattleMusic = false;
  }
}

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5) ? 2 : -1)

for (let i = 0; i < emojis.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  box.innerHTML = shuffleEmojis[i];
  box.onclick = handleClick;
  document.querySelector(".game").appendChild(box);
}

function handleClick() {
  if (openCards.length < 2) {
    this.classList.add("boxOpen");
    openCards.push(this);
    if (openCards.length === 1) {
      playBattleMusic();
    }
  }
  if (openCards.length == 2) {
    setTimeout(() => {
      checkMatch();
      if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        playVictorySound();
        stopBattleMusic();
      }
    }, 500);
  }
}

function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("boxMatch")
    openCards[1].classList.add("boxMatch")
  } else {
    openCards[0].classList.remove("boxOpen")
    openCards[1].classList.remove("boxOpen")
  }
  openCards = [];
}

function playVictorySound() {
  let audio = new Audio(`src/sounds/victory.mp3`);
  audio.play();
}