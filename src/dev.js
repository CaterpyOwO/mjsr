import { mjsr } from "./mjsr.js";
const { Renderer, Screen, Camera, Input } = mjsr;

const r = new Renderer(
	new Screen().fullscreen(),
	new Camera([0, -2, -8], [0, 0, 0]),
	new Input.FirstPerson(),
	{ mono: false, lighting: mjsr.BLINN_PHONG, culling: false }
);

let teapot = new mjsr.OBJLoader(
	"./geometry/teapot.obj",
	mjsr.CLOCKWISE,
	new mjsr.Material("#faa", 64)
);

let cube = mjsr.Object3d.from({
	coords: [0, 0, 0],
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

(async () => {
	let scene = [await teapot.load()];
	let scene2 = [cube];

	r.setup(scene, scene2);

	requestAnimationFrame(frame);
})();

function frame(now) {
	r.draw();
	r.update(now);

	requestAnimationFrame(frame);
}

window.addEventListener("keydown", (event) => event.key == "l" && (r.scene = 1));
