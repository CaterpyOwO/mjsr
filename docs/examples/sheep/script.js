class AutoRotate {
	constructor() {}

	attributes(screen, camera) {
		this.screen = screen;
		this.camera = camera;
	}

	setup() {}

	update(dt) {
		rotateY(this.camera.model, this.camera.model, dt * 0.0005);
	}
}

const r = new mjsr.Renderer(
	new mjsr.Screen().fullscreen(),
	new mjsr.Camera([0, -2, -8], [0.2, 0, 0]),
	new AutoRotate()
	// { mono: false, lighting: mjsr.BLINN_PHONG, culling: false }
);

const obj = new mjsr.OBJLoader("out.obj", mjsr.CLOCKWISE, new mjsr.Material("#FFD788", 128));

obj.load().then(obj => {
	console.log(obj);
	r.setup([obj]);

	requestAnimationFrame(frame);
});

function frame(now) {
	r.update(now);
	r.draw();

	requestAnimationFrame(frame);
}

// glMatrix
function rotateY(out, a, rad) {
	let s = Math.sin(rad);
	let c = Math.cos(rad);
	let a00 = a[0];
	let a01 = a[1];
	let a02 = a[2];
	let a03 = a[3];
	let a20 = a[8];
	let a21 = a[9];
	let a22 = a[10];
	let a23 = a[11];

	if (a !== out) {
		// If the source and destination differ, copy the unchanged rows
		out[4] = a[4];
		out[5] = a[5];
		out[6] = a[6];
		out[7] = a[7];
		out[12] = a[12];
		out[13] = a[13];
		out[14] = a[14];
		out[15] = a[15];
	}

	// Perform axis-specific matrix multiplication
	out[0] = a00 * c - a20 * s;
	out[1] = a01 * c - a21 * s;
	out[2] = a02 * c - a22 * s;
	out[3] = a03 * c - a23 * s;
	out[8] = a00 * s + a20 * c;
	out[9] = a01 * s + a21 * c;
	out[10] = a02 * s + a22 * c;
	out[11] = a03 * s + a23 * c;
	return out;
}
