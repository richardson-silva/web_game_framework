export class ScoreChart {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.reset();
    }

    reset() {
        // Agora começa vazio, regista apenas quando comemos a primeira vez
        this.history = []; 
    }

    addData(value) {
        this.history.push(value);
    }

    selfDraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Precisa de pelo menos 2 pontos para desenhar uma linha
        if (this.history.length < 2) return;

        this.ctx.beginPath();
        this.ctx.strokeStyle = "#27ae60"; // Azul
        this.ctx.lineWidth = 4;
        this.ctx.lineJoin = "round";

        // Teto dinâmico (no mínimo 3 segundos, mas ajusta se passar mais)
        const maxVal = Math.max(...this.history, 3); 
        const stepX = this.canvas.width / (this.history.length - 1);

        this.history.forEach((time, index) => {
            const x = index * stepX;
            // Mapeia o tempo no eixo Y
            const y = this.canvas.height - (time / maxVal) * (this.canvas.height - 20); 
            if (index === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        });

        this.ctx.stroke();
    
        // Desenha os segundos
        this.ctx.fillStyle = "#ecf0f1";
        this.ctx.font = "bold 14px 'Courier New'";
        this.ctx.textAlign = "center";

        this.history.forEach((time, index) => {
            const x = index * stepX;
            const y = this.canvas.height - (time / maxVal) * (this.canvas.height - 30);
            // Escreve o tempo com 1 casa decimal (ex: "1.2s") um pouquinho acima da linha (y - 12)
            this.ctx.fillText(time.toFixed(1) + "s", x, y - 12);
        });
    }
}