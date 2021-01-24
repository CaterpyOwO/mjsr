import * as constants from "../core/constants.js";

import { create, translate, rotate, scale } from "gl-matrix/mat4";

export class Object3d {
	/**
	 * Creates a new Object3d
	 *
	 * @param {Number} [primitive=mjsr.TRIANGLES] - The primitive the object should be rendered with
	 * @param {Boolean} [materials=false] - Use materials instead of colours
	 *
	 * @returns {Object3d}
	 */
	constructor(primitive = constants.TRIANGLES, materials = false) {
		this.primitive = primitive;

		this.verts = [];
		this.edges = [];
		this.faces = [];

		this.model = create();

		this.transformations = {
			scale: [1, 1, 1],
			rotateX: 0,
			rotateY: 0,
			rotateZ: 0,
			translate: [0, 0, 0],
		};

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

	/**
	 * Scales the object
	 *
	 * @param {Number[]} vector - The vector by which the object should be scaled
	 */
	scale(vector) {
		this.transformations.scale = vector;
		this._updateModel();
		return this;
	}

	/**
	 * Rotates the object around the X axis
	 *
	 * @param {number} rad - Degrees to rotate by
	 */
	rotateX(rad) {
		this.transformations.rotateX = rad;
		this._updateModel();
		return this;
	}

	/**
	 * Rotates the object around the Y axis
	 *
	 * @param {number} rad - Degrees to rotate by
	 */
	rotateY(rad) {
		this.transformations.rotateY = rad;
		this._updateModel();
		return this;
	}

	/**
	 * Rotates the object around the Z axis
	 *
	 * @param {number} rad - Degrees to rotate by
	 */
	rotateZ(rad) {
		this.transformations.rotateZ = rad;
		this._updateModel();
		return this;
	}

	/**
	 * Translates the object
	 *
	 * @param {Number[]} vector - The vector by which the object should be translated
	 */
	translate(vector) {
		this.transformations.translate = vector;
		this._updateModel();
		return this;
	}

	_updateModel() {
		scale(this.model, create(), this.transformations.scale);

		rotate(this.model, this.model, this.transformations.rotateX, [1, 0, 0]);
		rotate(this.model, this.model, this.transformations.rotateY, [0, 1, 0]);
		rotate(this.model, this.model, this.transformations.rotateZ, [0, 0, 1]);

		translate(this.model, this.model, this.transformations.translate);
	}

	/**
	 * Creates a new instance of Object3d from a JavaScript Object
	 *
	 * @param {Object} object - The Object
	 */
	static from(object) {
		const out = new Object3d();

		const props = {
			0: ["verts", "colours", "primitive"],
			1: ["verts", "edges", "colours", "primitive"],
			2: ["verts", "faces", "colours", "primitive"],
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
