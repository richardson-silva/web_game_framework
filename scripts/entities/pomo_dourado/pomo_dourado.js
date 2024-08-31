import {configs}from "../../../global.js"

export class PomoDourado {
	x = 0;
	y = 0;
	w = 20;
	h = 20;
	sin_cos_mov = 0 
	radius = 100
    svgImage = new Image();

	constructor(x, y, w, h, svgPath){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.svgImage.src = svgPath;

        this.svgImage.onerror = () => {
            console.error('Error loading SVG image');
        };
	};

	move =  function (){
		this.sin_cos_mov += 0.05;
		this.x = configs.canvasWidth/2 + this.radius * Math.cos(this.sin_cos_mov);
		this.y = configs.canvasHeight/2 + this.radius * Math.sin(this.sin_cos_mov);
	}

	selfDraw = function (ctx){
		ctx.drawImage(this.svgImage, this.x, this.y, this.w, this.h);
    }
}