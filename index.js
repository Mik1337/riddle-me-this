import riddles from "./riddles.json" with {type: 'json'};

let roundes = 1;

const modes = ["easy", "normal", "hard"];

const elNumber = document.getElementById("number");
const elRounds = document.getElementById("rounde");

const discarded = [];

function RiddleMeThis(shuffle = false) {
	let current = 0;

	do {
		current = Math.floor(Math.random() * riddles.length);
	} while (discarded.includes(current));

	discarded.push(current);

	console.log(discarded)
	let riddle = riddles[current];
	elNumber.innerHTML = `#${current}`;

	modes.forEach((mode, index) => {
		const el = document.getElementById(mode);
		if (shuffle) {
			elNumber.classList.add("animate__flash");	
			el.classList.remove("animate__fadeIn")
			el.classList.add("animate__flipOutX");
			el.classList.add("animate__flipInX");

		}
		el.style.setProperty('--animate-duration', `${350 * (index + 1 * 4)}ms`);
		el.querySelector("#hint").innerText = riddle[mode].hint;
		el.querySelector("#riddle").innerText = riddle[mode].riddle;
		el.querySelector("#answer").innerText = riddle[mode].answer;
	});

	elRounds.innerHTML = `Round ${roundes}`;
	roundes++;
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
elNumber.addEventListener('animationend', () =>{
	elNumber.classList.remove("animate__flash");
})
elRound.addEventListener('animationend', () =>{
	elRound.classList.remove("animate__flash");
})