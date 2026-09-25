export class Particles {
    constructor(x, y, gravity, max_size, color, life_time) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.gravity = gravity;
        this.max_size = max_size;
        this.color = color === "random" ? `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)` : color;
        this.life_time = life_time;
    }

    move() {
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.life_time -= 0.1;
    }

    selfDraw(ctx) {
        if (this.life_time <= 0) return; 
        
        let size = Math.max(1, this.life_time * 2);
        if (size > this.max_size) size = this.max_size;
        
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, size, size);
    }
}