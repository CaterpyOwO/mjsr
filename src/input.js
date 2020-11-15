const input = {};

input.FirstPerson = class {
    constructor() {
        this.keys = [];
    }

    setAttributes(screen, camera) {
        this.screen = screen;
        this.camera = camera;
    }

    setupMovement() {
		let { canvas } = this.screen;

		window.onkeydown = (event) => (this.keys[event.keyCode] = true);
		window.onkeyup = (event) => (this.keys[event.keyCode] = false);

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

		document.onpointerlockchange = () => lock();
		document.onmozpointerlockchange = () => lock();
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
		let s = dt / 160;

		if (this.keys[81] || this.keys[16]) this.camera.pos[1] += s; // q, shift
		if (this.keys[69] || this.keys[32]) this.camera.pos[1] -= s; // e, space

		let x = s * Math.sin(this.camera.rot[1]),
			y = s * Math.cos(this.camera.rot[1]);

		if (this.keys[87]) (this.camera.pos[0] -= x), (this.camera.pos[2] -= y); // w
		if (this.keys[83]) (this.camera.pos[0] += x), (this.camera.pos[2] += y); // s

		if (this.keys[65]) (this.camera.pos[0] += y), (this.camera.pos[2] -= x); // a
		if (this.keys[68]) (this.camera.pos[0] -= y), (this.camera.pos[2] += x); // d
	}
}

input.CenterRotate = class {
    constructor() {
        this.keys = [];
    }

    setAttributes(screen, camera) {
        this.screen = screen;
        this.camera = camera;
    }

    setupMovement() {
        let { canvas } = this.screen;
        
        const mouse = event => this.mouseRotation([event.movementX, event.movementY]);

        canvas.onmousedown = () => canvas.onmousemove = mouse;
        canvas.onmouseup = () => canvas.onmousemove = null;
    }

    mouseRotation(movement) {
        let { pos } = this.camera;

        movement[0] *= .01;
        movement[1] *= .01;

        this.camera.pos = this.rotate2d(pos, movement[0], [0, 2]);
        this.camera.rot[1] -= movement[0];
    }
    
	rotate2d(pos, rad, axes) {
        let [a0, a1] = axes;
        let [x, y] = [pos[a0], pos[a1]];

        let s = Math.sin(rad),
            c = Math.cos(rad);

        pos[a0] = (x * c - y * s);
        pos[a1] = (y * c + x * s);
    
        return pos;
	}

    update() {}

    // mouseRotation
}

export default input;