import { parseColour } from "../utility/colour.js";

export class Material {
	constructor(colour, shinyness = 32.0) {
		if (typeof colour == "string") this.colour = parseColour(colour);
		// oh for fucks sake the lgtm alert isn't going away
		else if (Array.isArray(colour)) this.colour = colour;
		else throw new Error(`${colour} is not a valid colour.`);

		this.shinyness = shinyness;
	} 
}