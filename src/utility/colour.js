import { clamp } from "./math.js";

export function parseColour(colour) {
	if (!colour.charAt(0) == "#") throw new Error(`${colour} is not a HEX colour.`);
	colour = colour.substr(1);

	if (colour.length == 3) colour = colour.split("").reduce((r, e) => r.push(e + e) && r, []);
	else colour = colour.match(/.{1,2}/g);

	return [...colour.map((c) => clamp(parseInt(c, 16) / 255, 0.0, 1.0)), 1.0];
}

export function shadeColour(colour, dp) {
	if (!colour.charAt(0) == "#") throw new Error(`${colour} is not a HEX colour.`);
	colour = colour.substr(1);

	if (colour.length == 3) colour = colour.split("").reduce((r, e) => r.push(e + e) && r, []);
	else colour = colour.match(/.{1,2}/g);

	return [
		"#",
		...colour.map((c) =>
			Renderer.Math.clamp(Math.floor(parseInt(c, 16) * ((dp + 1) * 0.5)), 25, 255).toString(
				16
			)
		),
	].join("");
}
