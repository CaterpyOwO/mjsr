const Input = {};

Input.None = class {
	update() {}
	setAttributes() {}
	setupMovement() {}
};

Input.FirstPerson = class {
	constructor() {
		this.keys = [];
	}

	setAttributes(screen, camera) {
		this.screen = screen;
		this.camera = camera;
	}

	setupMovement() {
		let { canvas } = this.screen;

		window.addEventListener("keydown", (event) => (this.keys[event.key] = true));
		window.addEventListener("keyup", (event) => (this.keys[event.key] = false));

		let movement = (event) => {
			if (Math.abs(event.movementX) > 50 || Math.abs(event.movementY) > 50) return;
			else return this.mouseRotation([event.movementX, event.movementY]);
		};

		canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
		document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

		canvas.onclick = () => canvas.requestPointerLock();

		let lock = () => {
			if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas)
				canvas.onmousemove = movement;
			else canvas.onmousemove = null;
		};

		document.addEventListener("pointerlockchange", lock);
		document.addEventListener("mozpointerlockchange", lock);
	}

	mouseRotation(movement, sensitivity = 3) {
		let [x, y] = movement;

		sensitivity *= 100;

		x /= sensitivity;
		y /= sensitivity;

		if (this.camera.rot[0] + y < Math.PI / 2 && this.camera.rot[0] + y > -(Math.PI / 2))
			this.camera.rot[0] += y;
		this.camera.rot[1] += x;
	}

	update(dt) {
		let { canvas } = this.screen;

		if (document.pointerLockElement == canvas || document.mozPointerLockElement == canvas) {
			let s = dt / 160;

			if (this.keys["q"] || this.keys[" "]) this.camera.pos[1] += s; // q, shift
			if (this.keys["e"] || this.keys["Shift"]) this.camera.pos[1] -= s; // e, space

			let x = s * Math.sin(this.camera.rot[1]),
				y = s * Math.cos(this.camera.rot[1]);

			if (this.keys["w"]) (this.camera.pos[0] -= x), (this.camera.pos[2] -= y); // w
			if (this.keys["s"]) (this.camera.pos[0] += x), (this.camera.pos[2] += y); // s

			if (this.keys["a"]) (this.camera.pos[0] += y), (this.camera.pos[2] -= x); // a
			if (this.keys["d"]) (this.camera.pos[0] -= y), (this.camera.pos[2] += x); // d
		}
	}
};

Input.ModelRotate = class {
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

export default Input;
