export class Screen {
	constructor(size = { width: 640, height: 480 }, parent = document.body, canvas) {
		if (canvas instanceof HTMLCanvasElement) this.canvas = canvas;
		else this.canvas = document.createElement("canvas");

		this.canvas.width = size.width;
		this.canvas.height = size.height;

		this.gl = this.canvas.getContext("webgl");

		if (parent instanceof HTMLElement) parent.appendChild(this.canvas);

		return this;
	}

	fullscreen() {
		this.canvas.width = innerWidth;
		this.canvas.height = innerHeight;

		window.onresize = () => (this.canvas.width = innerWidth, this.canvas.height = innerHeight);

		let style = document.createElement("style");
		style.innerText = `html,body{margin:0;overflow:hidden}`;

		document.head.appendChild(style);

		return this;
	}

	square(dimens) {
		this.canvas.width = dimens;
		this.canvas.height = dimens;

		return this;
	}

	rect(w, h) {
		this.canvas.width = w;
		this.canvas.height = h;

		return this;
	}
}

export class Screen2d {
	constructor(data = { width: 640, height: 480, appendTo: document.body }) {
		this.canvas = document.createElement("canvas");
		this.canvas.width = data.width;
		this.canvas.height = data.height;

		this.c = this.canvas.getContext("2d");

		this.c.moveToD = (pos) => this.c.moveTo(pos[0], pos[1]);

		this.c.lineToD = (pos) => this.c.lineTo(pos[0], pos[1]);

		data.appendTo.appendChild(this.canvas);

		return this;
	}

	fullscreen() {
		this.canvas.width = innerWidth;
		this.canvas.height = innerHeight;

		(window.onresize = () => (this.canvas.width = innerWidth)),
			(this.canvas.height = innerHeight);

		let style = document.createElement("style");
		style.innerText = `html,body{margin:0;overflow:hidden}`;

		document.head.appendChild(style);

		return this;
	}

	square(dimens) {
		this.canvas.width = dimens;
		this.canvas.height = dimens;

		return this;
	}

	rect(w, h) {
		this.canvas.width = w;
		this.canvas.height = h;

		return this;
	}
}
