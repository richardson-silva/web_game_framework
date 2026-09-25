import { configs } from "../../global.js";

export class Snake {
    constructor() {
        this.reset();
    }

    reset() {
        // Garante que o centro da tela seja arredondado para um múltiplo do gridSize
        const startX = Math.floor((configs.canvasWidth / 2) / configs.gridSize) * configs.gridSize;
        const startY = Math.floor((configs.canvasHeight / 2) / configs.gridSize) * configs.gridSize;
        this.body = [
            { x: startX, y: startY }
        ];
        // Vetor de direção (dx, dy)
        this.direction = { x: configs.gridSize, y: 0 }; 
        this.nextDirection = { x: configs.gridSize, y: 0 };
    }

    move() {
        // Aplica a próxima direção desejada
        this.direction = this.nextDirection;
        
        // Calcula a posição da nova cabeça
        const head = { 
            x: this.body[0].x + this.direction.x, 
            y: this.body[0].y + this.direction.y 
        };

        // Adiciona a nova cabeça no início do Array
        this.body.unshift(head);
        
        // A MÁGICA ACONTECE AQUI: 
        // Em vez de só jogar o rabo fora com pop(), nós o guardamos "no bolso"
        this.lastTail = this.body.pop(); 
    }

    grow() {
        // Se a cobra comeu, nós simplesmente pegamos aquele rabo 
        // que guardamos "no bolso" no move() e colamos de volta no corpo!
        if (this.lastTail) {
            this.body.push(this.lastTail);
        }
    }

    changeDirection(dx, dy) {
        // Evita que a cobra vire 180 graus de uma vez
        if (this.direction.x === -dx || this.direction.y === -dy) return;
        this.nextDirection = { x: dx, y: dy };
    }

    checkCollision() {
        const head = this.body[0];
        // Colisão com as bordas da tela
        if (head.x < 0 || head.x >= configs.canvasWidth || 
            head.y < 0 || head.y >= configs.canvasHeight) {
            return true;
        }
        // Colisão com o próprio corpo
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }
        return false;
    }

    selfDraw(ctx) {
        this.body.forEach((part, index) => {
            ctx.fillStyle = index === 0 ? "#2ecc71" : "#27ae60";
            // deixa um vão entre os blocos da cobra
            ctx.fillRect(part.x, part.y, configs.gridSize - 1, configs.gridSize - 1);
        });
    }
}