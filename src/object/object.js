import * as constants from "../core/constants.js";

export class Object3d {
	/**
	 *
	 * @param {Object[3]} [coords=[0,0,0]] - The position of the object.
	 * @param {Number} [primitive=mjsr.TRIANGLES] - The primitive the object should be rendered with
	 * @param {Boolean} [materials=false] - Use materials instead of colours
	 *
	 * @returns {Object3d}
	 */
	constructor(coords = [0, 0, 0], primitive = constants.TRIANGLES, materials = false) {
		this.coords = coords;
		this.primitive = primitive;

		this.verts = [];
		this.edges = [];
		this.faces = [];

		switch (primitive) {
			case constants.TRIANGLES:
				materials ? (this.materials = []) : (this.colours = []);
				break;
			case constants.LINES:
			case constants.POINTS:
				this.colours = [];
				break;
			default:
				throw new Error(`The primitive ${primitive} is not a valid primitive`);
		}
	}
}
