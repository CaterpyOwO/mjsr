const { Renderer, Screen, Camera, Input } = mjsr;
const r = new Renderer(
	new Screen({}, document.querySelector(".parent")).fillParent(),
	new Camera([3.3, -3, -6.3], [0.35, 5.83, 0])
);

class Nice {
	constructor(coords) {
		let [x, y, z] = coords;
		this.coords = [x + 1.75, y, z];

		this.primitive = "lines";

		this.verts = [
			[x, y, z],
			[x, y - 1.5, z],
			[x + 1, y, z],
			[x + 1, y - 1.5, z], // N

			[x + 1.5, y, z],
			[x + 1.5, y - 1, z], // i
			[x + 1.5, y - 1.5, z],

			[x + 2.5, y, z],
			[x + 2, y - 0.3, z],
			[x + 2, y - 0.7, z],
			[x + 2.5, y - 1, z], // c

			[x + 3.5, y, z],
			[x + 3, y - 0.3, z],

			[x + 3, y - 0.7, z],
			[x + 3.4, y - 1, z],
			[x + 3.8, y - 0.7, z], //e
		];

		this.edges = [
			[0, 1, 0],
			[1, 2, 0],
			[2, 3, 0], //N

			[4, 5, 0], // i

			[7, 8, 0],
			[8, 9, 0],
			[9, 10, 0], //c

			[11, 12, 0],
			[12, 13, 0],
			[13, 14, 0],
			[14, 15, 0],

			[15, 13, 0], //e
		];

		this.colours = ["#000"];
	}
}

let scene = [
	new Nice([-1.75, 0, 0]),
	new mjsr.Geometry.Plane([1, 0.3, 0]),
	new mjsr.Geometry.Plane([-1, 0.3, 0]),
];
r.setup(scene);

function frame(now) {
	requestAnimationFrame(frame);

	r.draw();
	r.update(now);
}

requestAnimationFrame(frame);
