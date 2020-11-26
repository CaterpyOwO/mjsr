export class Screen {
	constructor(size = { width: 640, height: 480 }, parent = document.body, canvas) {
		if (canvas instanceof HTMLCanvasElement) this.canvas = canvas;
		else this.canvas = document.createElement("canvas");

		this.canvas.width = size.width;
		this.canvas.height = size.height;

		this.gl = this.canvas.getContext("webgl");

		this.parent = parent;

		if (parent instanceof HTMLElement) parent.appendChild(this.canvas);

		return this;
	}

	fullscreen() {
		this.canvas.width = innerWidth;
		this.canvas.height = innerHeight;

		window.addEventListener("resize", () => {
			this.canvas.width = innerWidth;
			this.canvas.height = innerHeight;
		});

		let style = document.createElement("style");
		style.innerText = `html,body{margin:0;overflow:hidden}`;

		document.head.appendChild(style);

		return this;
	}

	fillParent() {
		this.canvas.width = this.parent.clientWidth;
		this.canvas.height = this.parent.clientHeight;

		window.addEventListener("resize", () => {
			this.canvas.width = this.parent.clientWidth;
			this.canvas.height = this.parent.clientHeight;
		});

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
