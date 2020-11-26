class ModelRotate {
	constructor() {
		this.keys = [];
	}

	setAttributes(screen, camera) {
		this.screen = screen;
		this.camera = camera;
	}

	setupMovement() {
		let { canvas } = this.screen;

		let lastMovement = [0, 0];

		const mouse = (event) => this.mouseRotation([event.movementX, event.movementY]);
		const touch = (event) => (
			this.mouseRotation([
				-(lastMovement[0] - event.touches[0].screenX),
				lastMovement[1] - event.touches[0].screenY,
			]),
			(lastMovement = [event.touches[0].screenX, event.touches[0].screenY])
		);

		canvas.onmousedown = () => (canvas.onmousemove = mouse);
		window.onmouseup = () => (canvas.onmousemove = null);

		canvas.addEventListener(
			"touchstart",
			(event) => (lastMovement = [event.touches[0].screenX, event.touches[0].screenY]),
			{ passive: true }
		);
		canvas.addEventListener("touchmove", touch, { passive: true });
		canvas.addEventListener(
			"touchend",
			() => ((canvas.ontouchmove = null), (lastMovement = [0, 0]))
		);
	}

	mouseRotation(movement) {
		let { pos } = this.camera;

		movement[0] *= 0.01;

		this.camera.pos = this.rotate2d(pos, -movement[0], [0, 2]);
		this.camera.rot[1] += movement[0];
	}

	rotate2d(pos, rad, axes) {
		let [a0, a1] = axes;
		let [x, y] = [pos[a0], pos[a1]];

		let s = Math.sin(rad),
			c = Math.cos(rad);

		pos[a0] = x * c - y * s;
		pos[a1] = y * c + x * s;

		return pos;
	}

	update() {}
};

export { ModelRotate };