export default class {
	constructor(coords = [0, 0, 0]) {
		let [x, y, z] = coords;

		this.coords = coords;

		this.primitive = "triangles";

		this.verts = [
			[x - 1, y - 1, z - 1],
			[x + 1, y - 1, z - 1],
			[x + 1, y + 1, z - 1],
			[x - 1, y + 1, z - 1],
			[x - 1, y - 1, z + 1],
			[x + 1, y - 1, z + 1],
			[x + 1, y + 1, z + 1],
			[x - 1, y + 1, z + 1],
		];

		this.edges = [
			[0, 1],
			[1, 2],
			[2, 3],
			[3, 0],
			[4, 5],
			[5, 6],
			[6, 7],
			[7, 4],
			[0, 4],
			[1, 5],
			[2, 6],
			[3, 7],
		];

		this.faces = [
			[0, 1, 2, 0],
			[2, 3, 0, 0],

			[1, 5, 6, 1],
			[6, 2, 1, 1],

			[4, 5, 1, 2],
			[1, 0, 4, 2],

			[6, 5, 4, 3],
			[4, 7, 6, 3],

			[7, 4, 0, 4],
			[0, 3, 7, 4],

			[2, 6, 7, 5],
			[7, 3, 2, 5],
		];

		this.colours = ["#0ff", "#0f0", "#f0f", "#00f", "#ff0", "#f00"];
	}
}
