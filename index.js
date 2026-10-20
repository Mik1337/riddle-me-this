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


// riddles that were skipped or played
const discarded = [];

function RiddleMeThis(shuffle = false) {
	let current = 0;

	do {
		current = Math.floor(Math.random() * riddles.length);
	} while (discarded.includes(current));

	discarded.push(current);

	console.log(discarded);
	let riddle = riddles[current];
	elNumber.innerHTML = `Riddle #${current}`;

  const mode = modes[Math.floor(Math.random() * modes.length)];

  const elGame = document.getElementById("game");
	if (shuffle) {
		elNumber.classList.add("animate__flash");
		elGame.classList.remove("animate__fadeIn");
		elGame.classList.add("animate__flipOutX");
		elGame.classList.add("animate__flipInX");
	}
	elGame.style.setProperty("--animate-duration", "3000ms");
	elGame.querySelector("#hint").innerText = riddle[mode].hint;
	elGame.querySelector("#riddle").innerText = riddle[mode].riddle;
	elGame.querySelector("#answer").innerText = riddle[mode].answer;


	elRounds.innerHTML = `Round ${roundes}`;
	roundes++;
}

window.onload = init();

function init() {
  RiddleMeThis();
}

// document.getElementById("shuffle").addEventListener("click", () => RiddleMeThis(true));
document.getElementById("skip").addEventListener("click", () => RiddleMeThis(true));

document.getElementById("body").addEventListener("keyup", () => RiddleMeThis(true));

const el = document.getElementById("game");
el.addEventListener("animationend", () => {
	el.classList.remove("animate__flipOutX");
});

elNumber.addEventListener("animationend", () => {
	elNumber.classList.remove("animate__flash");
});
elRounds.addEventListener("animationend", () => {
	elRounds.classList.remove("animate__flash");
});
