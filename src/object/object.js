export class Object3d {
	constructor(coords, primitive, materials = false) {
		this.coords = coords;
		this.primitive = primitive;

		this.verts = [];

		switch (primitive) {
			case "triangles":
				this.faces = [];
				materials ? (this.materials = []) : (this.colours = []);
				break;
			case "lines":
				this.edges = [];
				this.colours = [];
				break;
			case "points":
				this.colours = [];
				break;
			default:
				throw new Error(`The primitive ${primitive} is not a valid primitive`);
		}
	}
}
