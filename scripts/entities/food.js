import { configs } from "../../global.js";

export class Food {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    respawn(snakeBody) {
        let validPosition = false;
    
        while (!validPosition) {
            // Sorteia posição aleatória baseada no tamanho do grid
            const cols = configs.canvasWidth / configs.gridSize;
            const rows = configs.canvasHeight / configs.gridSize;
            this.x = Math.floor(Math.random() * cols) * configs.gridSize;
            this.y = Math.floor(Math.random() * rows) * configs.gridSize;
            // Verifica se bate com alguma parte da cobra
            validPosition = !snakeBody.some(part => part.x === this.x && part.y === this.y);
        }
    }

    selfDraw(ctx) {
        ctx.fillStyle = "#e74c3c"; // Vermelho
        ctx.fillRect(this.x, this.y, configs.gridSize - 1, configs.gridSize - 1);
    }
}