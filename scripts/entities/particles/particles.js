export class Particles {

	x = 0;
	y = 0;
	vx = 0;  // Velocidade horizontal
    vy = 0;  // Velocidade vertical
	gravity = 0.1;
	max_size = 5;
	color = "random";
	life_time = 2.5;

	constructor(x, y, gravity, max_size, color, life_time) {
		this.x = x;
		this.y = y;
		this.vx = Math.random() * 2 - 1;  // Velocidade horizontal aleatória
        this.vy = Math.random() * 2 - 1;  // Velocidade vertical aleatória
		this.gravity = gravity;
		this.max_size = max_size;
		this.color = this.color == "random"? `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)` : color
		this.life_time = life_time;
	}

	move(){
		this.vy += this.gravity;  // Aplica a gravidade à velocidade vertical
		this.x += this.vx;  // Atualiza a posição horizontal
        this.y += this.vy;  // Atualiza a posição vertical
		this.life_time -= 0.1
	}

	selfDraw = function (ctx){
		if (this.life_time <= 0) {
            return;  // Não desenha se a partícula expirou
        }
        let size = Math.max(1, this.life_time * 2);  // Calcula o tamanho da partícula
        if (size > this.max_size) size = this.max_size;  // Limita o tamanho máximo
        ctx.fillStyle = this.color;  // Define a cor da partícula
        ctx.fillRect(this.x, this.y, size, size);  // Desenha a partícula
	}

}