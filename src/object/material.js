import { parseColour } from "../utility/colour.js";

export class Material {
    constructor(colour, shinyness = 32.0) {
        if (typeof colour == "string") this.colour = parseColour(colour);
        else if (typeof colour == "array") this.colour = colour;
        else throw new Error(`${colour} is not a valid colour.`)
        
        this.shinyness = shinyness;
    }
}