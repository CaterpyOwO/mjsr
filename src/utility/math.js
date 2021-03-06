export function crossProduct(triangle) {
	try {
		let line1 = [
				triangle[1][0] - triangle[0][0],
				triangle[1][1] - triangle[0][1],
				triangle[1][2] - triangle[0][2],
			],
			line2 = [
				triangle[2][0] - triangle[0][0],
				triangle[2][1] - triangle[0][1],
				triangle[2][2] - triangle[0][2],
			];
		let normal = [
			line1[1] * line2[2] - line1[2] * line2[1],
			line1[2] * line2[0] - line1[0] * line2[2],
			line1[0] * line2[1] - line1[1] * line2[0],
		];

		return normalize(normal);
	} catch (error) {
		throw error;
	}
}

export function dotProduct(vec1, vec2) {
	return vec1[0] * vec2[0] + vec1[1] * vec2[1] + vec1[2] * vec2[2];
}

export function distance(p0, p1) {
	return Math.sqrt(
		Math.pow(p1[0] - p0[0], 2) + Math.pow(p1[1] - p0[1], 2) + Math.pow(p1[2] - p0[2], 2)
	);
}

export function normalize(vec) {
	let v = Math.sqrt(vec[0] ** 2 + vec[1] ** 2 + vec[2] ** 2);
	return [(vec[0] /= v), (vec[1] /= v), (vec[2] /= v)];
}

export function clamp(number, min, max) {
	return Math.max(Math.min(number, max), min);
}

export function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

// export { crossProduct, normalize, clamp, parseColour, shuffle, distance, shadeColour, dotProduct };
