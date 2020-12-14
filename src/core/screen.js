export class Screen {
	/**
	 * Creates a new Screen that handles canvas resizing
	 *
	 * @constructor
	 *
	 * @param {Object} size - The size of the canvas to create
	 * @param {Number} [size.width=640] - The width of the canvas in pixels
	 * @param {Number} [size.height=480] - The height of the canvas in pixels
	 *
	 * @param {HTMLElement} [parent=document.body] - The parent  to which the canvas should be attached to.
	 *
	 * @param {HTMLCanvasElement} [canvas=document.createElement("canvas")] - The canvas
	 * @returns {Screen}
	 */
	constructor(
		size = { width: 640, height: 480 },
		parent = document.body,
		canvas = document.createElement("canvas")
	) {
		this.canvas = canvas;

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
