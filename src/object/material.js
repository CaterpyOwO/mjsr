import { parseColour } from "../utility/colour.js";

export class Material {
	/**
	 *
	 * @constructor
	 *
	 * @param {String} colour - The colour of the material
	 * @param {Number} [shinyness=32.0] - The shinyness of the material
	 *
	 * @returns {Material}
	 */
	constructor(colour, shinyness = 32.0) {
		if (typeof colour == "string") this.colour = parseColour(colour);
		else if (Array.isArray(colour)) this.colour = colour;
		else throw new Error(`${colour} is not a valid colour.`);

		this.shinyness = shinyness;
	}

	static from(colour, shinyness = 32) {
		return new Material(colour, shinyness);
	}
}
