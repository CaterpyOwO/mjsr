import { rotateY } from "../utility/gl-matrix/mat4.js";

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
		movement[0] *= 0.01;

		rotateY(this.camera.model, this.camera.model, movement[0])
	}

	update() {}
}

export { ModelRotate };
