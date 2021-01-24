const { Renderer, Screen, Camera, Input } = mjsr;

const r = new Renderer(
	new Screen().fullscreen(),
	new Camera([0, -3, -9], [0.3, 0, 0]),
	new Input.None(),
	{ lighting: mjsr.BLINN_PHONG, culling: false }
);

let teapot = new mjsr.OBJLoader(
	"./geometry/teapot.obj",
	mjsr.CLOCKWISE,
	new mjsr.Material("#faa", 123)
);

let cube = mjsr.Object3d.from({
	primitive: mjsr.LINES,
	verts: [
		[-1, -1, -1],
		[1, -1, -1],
		[1, 1, -1],
		[-1, 1, -1],
		[-1, -1, 1],
		[1, -1, 1],
		[1, 1, 1],
		[-1, 1, 1],
	],
	edges: [
		[0, 1, 0],
		[1, 2, 0],
		[2, 3, 1],
		[3, 0, 1],
		[4, 5, 2],
		[5, 6, 2],
		[6, 7, 3],
		[7, 4, 3],
		[0, 4, 4],
		[1, 5, 4],
		[2, 6, 5],
		[3, 7, 5],
	],
	colours: ["#0ff", "#0f0", "#f0f", "#00f", "#ff0", "#f00"],
});

let dt = document.querySelector("#dt");

teapot.load().then(obj => {
	teapot = obj;
	let scene = [teapot];
	r.setup(scene);

	requestAnimationFrame(frame);
});



function frame(now) {
	r.draw();
	r.update(now);

	teapot.rotateX(5e-4*Date.now()).rotateY(7e-4*Date.now());

	requestAnimationFrame(frame);
}