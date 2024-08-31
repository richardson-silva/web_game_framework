import { configs } from "../global.js";
import { PomoDourado } from "./entities/pomo_dourado/pomo_dourado.js";
import { Particles } from "./entities/particles/particles.js";

//pomo dourado
let pomoDourado = new PomoDourado(configs.canvasWidth/2, configs.canvasHeight/2, 20, 20, "../../scripts/entities/pomo_dourado/pomo_dourado.svg");
console.log("criado pomo_dourado", pomoDourado)
//pomo_dourado_particles
let pomo_dourado_particles = [];

// Function to create particles
function createParticles() {
	pomo_dourado_particles.forEach(particle => {
		if (particle.life_time <= 0){
			pomo_dourado_particles.splice(pomo_dourado_particles.indexOf(particle), 1);
		}
	});

    for (let i = 0; i < configs.pomoDouradoParticlesQuantity; i++) {
        pomo_dourado_particles.push(new Particles(
            pomoDourado.x + pomoDourado.w/2,
            pomoDourado.y + pomoDourado.h/2,
            0.1,
            1,
            "random",
            5
        ));
    }
    console.log("particles:", pomo_dourado_particles);
}

window.onload = function () {
	console.log("CHAMANDO ON LOADED")
	_init();
}

//initialize datas
function _init() {
	let canvas = document.getElementById("game-canvas");
	if (!canvas) {
        console.error("Canvas element not found");
        return;
    }
	// Set canvas size
	canvas.width = configs.canvasWidth;
	canvas.height = configs.canvasHeight;
	console.log("canvas size: " + canvas.width + ", " + canvas.height)

	const ctx = canvas.getContext("2d");

	_gameLoop(ctx);
}

//update informations
function _update() {
	pomoDourado.move();
	createParticles();
	pomo_dourado_particles.forEach(particle => {
		particle.move()
	});
}

//render
function _draw(ctx) {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	pomoDourado.selfDraw(ctx)
	pomo_dourado_particles.forEach(particle => particle.selfDraw(ctx));
}

function _gameLoop(ctx) {
	_update();
    _draw(ctx);
    requestAnimationFrame(() => _gameLoop(ctx));
}

