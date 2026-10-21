import riddles from "./riddles.json" with { type: "json" };

const music = {
  a: new Audio("./assets/arpmedia-retro-arcade-game-music-577821.mp3"),
  b: new Audio("./assets/tatamusic-game-game-music-599001.mp3"),
  c: new Audio("./assets/miksmusic.mp3")
}

let rounds = 1;

const elMenu = document.getElementById("menu");
const elJustRiddles = document.getElementById("just-riddles");

const rng = (size) => Math.floor(Math.random() * size);

const modes = ["easy", "normal", "hard"];

const elCanvas = document.getElementById("canvas");
const elNumber = document.getElementById("number");
const elRounds = document.getElementById("rounds");
const elMusic = document.getElementById("music");
const elGame = document.getElementById("game");
const elBack = document.getElementById("back");
const elSkip = document.getElementById("skip");
const elBody = document.getElementById("body");
const urlParams = new URLSearchParams(window.location.search);

// riddles that were skipped or played
const discarded = [];

function RiddleMeThis({ next = false, back = false, current = -1 }) {
  elBody.addEventListener("keyup", () => RiddleMeThis({ next: true }));

  if (back && discarded.length > 1) {
    discarded.pop();
    current = discarded[discarded.length - 1];
  }
  else if (back) {
    return;
  }
  else if (urlParams.size != 0 && rounds == 1) {
    current = Number(urlParams.get("riddle"));
    discarded.push(current);
  }
  else if (!back && next) {
    do {
  		current = rng(riddles.length);
  	} while (discarded.includes(current));
    discarded.push(current);
  }
  else {
    discarded.push(current);
  }

	let riddle = riddles[current];
	elNumber.innerHTML = `Riddle #${current}`;

	// elGame.querySelector("#hint").classList.remove('easy', 'hard', 'normal');
  const mode = modes[rng(modes.length)];

	if (next) {
		elNumber.classList.add("animate__flash");
		elGame.classList.add("animate__backOutDown");
  }
  if (back) {
    elNumber.classList.add("animate__flash");
		elGame.classList.add("animate__backInDown");
	}
	elGame.style.setProperty("--animate-duration", "1200ms");
  elGame.querySelector("#hint").innerText = riddle[mode].hint;
  elGame.querySelector("#hint").classList.add(mode);
	elGame.querySelector("#riddle").innerText = riddle[mode].riddle;
	elGame.querySelector("#answer").innerText = riddle[mode].answer;

  elRounds.innerHTML = `Round ${rounds}`;

  if (!back) {
    rounds++;
  }

  urlParams.set('riddle', current);
  history.replaceState({}, null, '?'+urlParams);
}

window.onload = init();

function init() {
  if (urlParams.size == 0) {
    elCanvas.classList.add("hidden");
    elJustRiddles.addEventListener("click", () => {
      elMenu.classList.add("hidden");
      elCanvas.classList.remove("hidden");
      RiddleMeThis({current: rng(riddles.length)})
    })
  } else {
    elMenu.classList.add("hidden");
    elCanvas.classList.remove("hidden");
    RiddleMeThis({});
  }
}

document.getElementById("next").addEventListener("click", () => RiddleMeThis({ next: true }));
elSkip.addEventListener("click", () => RiddleMeThis({ next: true }));

elBack.addEventListener("click", () => RiddleMeThis({ back: true }));


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


// wobble innerText
const wobblers = document.querySelectorAll('.wobble');

// Iterate through each "wobble"
wobblers.forEach(el => {
  // Get the text content of the element
  let text = el.textContent;
  // Create an array of separate letters
  text = text.split("");
  // Iterate through each letter and give it its own span element and individual animation delay offset
  const textCode = text.map((x, idx) => {
    let delay = (idx + 1) * 120;
    return `<span style="animation-delay: ${delay}ms">${x}</span>`;
  })
  // replace the element's html with our dynamically created html
  el.innerHTML = textCode.join(" ");
});
