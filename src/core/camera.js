import * as mat4 from "../utility/gl-matrix/mat4.js";

export class Camera {
	constructor(position = [0, 0, 0], rotation = [0, 0, 0], fov = 6) {
		this.pos = position;
		this.rot = rotation;

		this.model = mat4.create();
		this.view = mat4.create();
		this.projection = mat4.create();

		return this;
	}

	vp(canvas) {
		let projection = mat4.perspective(
			mat4.create(),
			45 * (Math.PI / 180),
			canvas.width / canvas.height,
			0.1,
			100.0
		);

		// let view = mat4.translate(mat4.create(), mat4.create(), [0,0,-7])
		let view = mat4.create();
		mat4.rotateX(view, view, this.rot[0]);
		mat4.rotateY(view, view, this.rot[1]);
		mat4.translate(view, view, this.pos);

		return mat4.multiply(mat4.create(), projection, view);
	}

	modelit() {
		let model = this.model;
		mat4.invert(model, model);
		mat4.transpose(model, model);

		return model;
	}
	// projectVertex(coords, canvas) {
	//     let [x, y, z] = coords;

	// 	x -= this.pos[0];
	// 	y -= this.pos[1];
	// 	z -= this.pos[2];
	// 	[x, z] = this.rotateVertex2d([x, z], this.rot[1]);
	// 	[y, z] = this.rotateVertex2d([y, z], this.rot[0]);

	// 	let f = this.fov / Math.max(0.0, z);
	// 	x *= f;
	//     y *= f;

	//     let rect = canvas.getBoundingClientRect();
	// 	return [(x - rect.left) / canvas.width * 2, 0 - (y - rect.top) / canvas.height * 2, z / 100];
	// }
}
