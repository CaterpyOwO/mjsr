import { Object3d } from "../object/object.js";
import { Material } from "../object/material.js";
import * as constants from "../core/constants.js";

export class OBJLoader {
	/**
	 *
	 * @param {String} url - The URL of the .obj file
	 * @param {Number} [normals=mjsr.CLOCKWISE] - The order of the normals
	 * @param {Object3d} [object=new Object3d([0, 0, 0], constants.TRIANGLES, true)] - The object to which the data should be appended
	 * @param {Material} [material=new Material("#fff", 128)] - The material that should be used to draw the object
	 *
	 * @returns {OBJLoader}
	 */
	constructor(
		url,
		normals = constants.CLOCKWISE,
		object = new Object3d([0, 0, 0], constants.TRIANGLES, true),
		material = new Material("#fff", 128)
	) {
		this.url = url;
		this.object = object;
		this.normals = normals;

		this.object.materials.push(material);
	}

	/**
	 * Load and parse the .obj
	 *
	 *  @returns {Object3d}
	 */
	async load() {
		let obj = (await this.loadFile()).split(/\n/);

		for (let line of obj) {
			line = line.trim().split(/\s/);
			let ltype = line.shift();

			switch (ltype) {
				case "#":
					break;
				case "v":
					this.object.verts.push(
						line.map((v, i) => parseFloat(v) + this.object.coords[i])
					);
					break;
				case "f":
					line = line.map((v) => parseInt(v.split(/\//)[0]) - 1);
					if (this.normals == constants.CLOCKWISE)
						this.object.faces.push([line[0], line[1], line[2], 0]);
					else this.object.faces.push([line[2], line[1], line[0], 0]);
					break;
			}
		}

		return this.object;
	}

	async loadFile() {
		try {
			return await (await fetch(this.url)).text();
		} catch (error) {
			throw error;
		}
	}
}