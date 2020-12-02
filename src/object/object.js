export class Object3d {
	constructor(coords, primitive, materials = false) {
		this.coords = coords;
		this.primitive = primitive;

		this.verts = [];
		this.edges = [];
		this.faces = [];

		switch (primitive) {
			case "triangles":
				materials ? (this.materials = []) : (this.colours = []);
				break;
			case "lines":
			case "points":
				this.colours = [];
				break;
			default:
				throw new Error(`The primitive ${primitive} is not a valid primitive`);
		}
	}
}
