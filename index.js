import riddles from "./riddles.json" with {type: 'json'};

const modes = ["easy", "normal", "hard"];

function RiddleMeThis(shuffle = false) {
	let current = Math.floor(Math.random() * riddles.length);
	let riddle = riddles[current];
	document.getElementById("number").innerText = `#${current}`;

	modes.forEach((mode, index) => {
		const el = document.getElementById(mode);
		if (shuffle) {
			el.classList.remove("animate__fadeIn")
			el.classList.add("animate__flipOutX");
			el.classList.add("animate__flipInX");

		}
		el.style.setProperty('--animate-duration', `${350 * (index + 1 * 4)}ms`);
		el.querySelector("#hint").innerText = riddle[mode].hint;
		el.querySelector("#question").innerText = riddle[mode].question;
		el.querySelector("#answer").innerText = riddle[mode].answer;
	});
}


RiddleMeThis();


document.getElementById("shuffle").addEventListener("click", () => RiddleMeThis(true));
document.getElementById("body").addEventListener("keyup", () => RiddleMeThis(true));
modes.forEach(mode => {
	const el = document.getElementById(mode);
	el.addEventListener('animationend', () => {
		el.classList.remove("animate__flipOutX");
	});
});
