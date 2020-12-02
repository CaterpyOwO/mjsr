import { clamp } from "./math.js";

export function parseColour(colour, type) {
	colour = colour.trim();

	if (!type) {
		if (/rgb\([^\)]*\)/.test(colour)) type = "rgb";
		else if (/(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b/i.test(colour)) type = "hex";
		else throw new Error(`${colour} is not a valid colour.`);
	}

	switch (type) {
		case ("hex"): 
			colour = colour.substr(1);
			if (colour.length == 3) colour = colour.split("").reduce((r, e) => r.push(e + e) && r, []);
			else colour = colour.match(/.{1,2}/g);

			return [...colour.map((c) => clamp(parseInt(c, 16) / 255, 0.0, 1.0)), 1.0];
		case "rgb":
			colour = colour.substr(4).slice(0, -1);
			colour = colour.split(",");

			return [...colour.map((c) => clamp(parseInt(c) / 255, 0.0, 1.0)), 1.0];

		default:
			throw new Error(`${type} is not a valid colour type.`)
	}	

	
}