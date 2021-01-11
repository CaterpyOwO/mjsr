import * as constants from "../core/constants.js";

import { crossProduct } from "../utility/math.js";

import { Material } from "./material.js";

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

	generateMesh() {
		const primitives = ["points", "lines", "triangles"];
		let primitive = -1;

		if (typeof this.primitive === "string" && primitives.includes(this.primitive) !== undefined)
			primitive = primitives.indexOf(this.primitive);
		else if (typeof this.primitive == "number") primitive = this.primitive;
		else throw new Error("No primitive type supplied.");

		let meshes = [];

		if (this.materials) {
			for (let m in this.materials) {
				meshes[m] = {
					material: this.materials[m],
					data: {
						position: [],
						normal: [],
						primitive,
					},
				};
			}
		} else {
			for (let c in this.colours) {
				meshes[c] = {
					material: new Material(this.colours[c]),
					data: {
						position: [],
						normal: [],
						primitive,
					},
				};
			}
		}

		switch (primitive) {
			case 0:
				for (let vert of this.verts) {
					meshes[vert[3]].data.position.push(vert[0], vert[1], vert[2]);
				}
				break;
			case 1:
				for (let edge of this.edges) {
					meshes[edge[2]].data.position.push(
						...this.verts[edge[1]],
						...this.verts[edge[0]]
					);
				}
				break;
			case 2:
				for (let triangle of this.faces) {
					let cross = crossProduct([
						this.verts[triangle[0]],
						this.verts[triangle[1]],
						this.verts[triangle[2]],
					]);

					meshes[triangle[3]].data.position.push(
						...this.verts[triangle[2]],
						...this.verts[triangle[1]],
						...this.verts[triangle[0]]
					);

					meshes[triangle[3]].data.normal.push(...cross, ...cross, ...cross);
				}
				break;
			default:
				throw new Error("Invalid primitive");
		}

		return meshes;
	}

	/**
	 * Creates a new instance of Object3d from a JavaScript Object
	 *
	 * @param {Object} object - The Object
	 */
	static from(object) {
		const out = new Object3d();

		const props = {
			0: ["coords", "verts", "colours", "primitive"],
			1: ["coords", "verts", "edges", "colours", "primitive"],
			2: ["coords", "verts", "faces", "colours", "primitive"],
		};

		const primitives = ["points", "lines", "triangles"];
		let primitive = -1;

		if (
			typeof object.primitive === "string" &&
			primitives.includes(object.primitive) !== undefined
		)
			primitive = primitives.indexOf(object.primitive);
		else if (typeof object.primitive == "number") primitive = object.primitive;
		else throw new Error("No primitive type supplied.");

		for (let prop of props[primitive]) {
			if (object[prop] === undefined) {
				if (prop == "colours" && object["materials"]) continue;
				throw new Error(`Object doesn't have required property ${prop}.`);
			}

			out[prop] = object[prop];
		}

		out.primitive = primitive;

		return out;
	}
}
