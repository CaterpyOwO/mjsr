class FirstPerson {
	constructor() {
		this.keys = [];
	}

	setAttributes(screen, camera) {
		this.screen = screen;
		this.camera = camera;
	}

	setupMovement() {
		let { canvas } = this.screen;

		window.addEventListener("keydown", (event) => (this.keys[event.key.toLowerCase()] = true));
		window.addEventListener("keyup", (event) => (this.keys[event.key.toLowerCase()] = false));

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

export { FirstPerson };