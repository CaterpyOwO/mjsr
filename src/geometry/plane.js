export default class {
	constructor(coords = [0, 0, 0]) {
		this.coords = coords;
		let [x, y, z] = coords;

		this.primitive = "triangles";

		this.verts = [
			[x - 1, y, z - 1],
			[x - 1, y, z + 1],
			[x + 1, y, z + 1],
			[x + 1, y, z - 1],
		];

		this.faces = [
			[0, 1, 2, 0],
			[2, 3, 0, 0],
			[2, 1, 0, 1],
			[0, 3, 2, 1],
		];

		this.colours = ["#faf", "#aff"];
	}
}
