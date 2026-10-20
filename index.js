import riddles from "./riddles.json" with { type: "json" };

const music = {
  a: new Audio("./assets/arpmedia-retro-arcade-game-music-577821.mp3"),
  b: new Audio("./assests/tatamusic-game-game-music-599001.mp3")
}

let roundes = 1;

const modes = ["easy", "normal", "hard"];

const elNumber = document.getElementById("number");
const elRounds = document.getElementById("rounds");
const elMusic = document.getElementById("music");
const elGame = document.getElementById("game");
const elBack = document.getElementById("back");
const elSkip = document.getElementById("skip");
const elBody = document.getElementById("body");

// riddles that were skipped or played
const discarded = [];

// @TODO: Fix back button, maybe put it in url so it's easier ?
function RiddleMeThis({shuffle = false, back = false}) {
	let current = 0;

  if (back && discarded.length > 0) {
    current = discarded.pop()
  } else {
    do {
  		current = Math.floor(Math.random() * riddles.length);
  	} while (discarded.includes(current));
    discarded.push(current);
	}

	// console.log(discarded);
	let riddle = riddles[current];
	elNumber.innerHTML = `Riddle #${current}`;

  const mode = modes[Math.floor(Math.random() * modes.length)];

	if (shuffle) {
		elNumber.classList.add("animate__flash");
		elGame.classList.add("animate__backOutDown");
  }
  if (back) {
    elNumber.classList.add("animate__flash");
		elGame.classList.add("animate__backInDown");
	}
	elGame.style.setProperty("--animate-duration", "1200ms");
	elGame.querySelector("#hint").innerText = riddle[mode].hint;
	elGame.querySelector("#riddle").innerText = riddle[mode].riddle;
	elGame.querySelector("#answer").innerText = riddle[mode].answer;

  elRounds.innerHTML = `Round ${roundes}`;

  if (!back) {
    roundes++;
  }
}

window.onload = init();

function init() {
  RiddleMeThis({});
}

// document.getElementById("shuffle").addEventListener("click", () => RiddleMeThis(true));
elSkip.addEventListener("click", () => RiddleMeThis({ shuffle: true }));

if (discarded.length > 0) {
  elBack.addEventListener("click", () => RiddleMeThis({ back: true }));
}

elBody.addEventListener("keyup", () => RiddleMeThis({ shuffle: true }));

// remove animation classes so new animation can begin
elGame.addEventListener("animationend", () => {
  elGame.classList.remove("animate__backOutDown");
});
elNumber.addEventListener("animationend", () => {
	elNumber.classList.remove("animate__flash");
});
elRounds.addEventListener("animationend", () => {
	elRounds.classList.remove("animate__backInDown");
});
