import {
	create,
	perspective,
	rotateX,
	rotateY,
	translate,
	invert,
	transpose,
	multiply,
} from "../utility/gl-matrix/mat4.js";

export class Camera {
	constructor(position = [0, 0, 0], rotation = [0, 0, 0], fov = 45) {
		this.pos = position;
		this.rot = rotation;
		this.fov = fov;

		this.model = create();
		this.view = create();
		this.projection = create();

		return this;
	}

	vp(canvas) {
		let projection = perspective(
			create(),
			this.fov * (Math.PI / 180),
			canvas.width / canvas.height,
			0.1,
			100.0
		);

		// let view = mat4.translate(mat4.create(), mat4.create(), [0,0,-7])
		let view = create();
		rotateX(view, view, this.rot[0]);
		rotateY(view, view, this.rot[1]);
		translate(view, view, this.pos);

		return multiply(create(), projection, view);
	}

	modelit() {
		let model = this.model;
		invert(model, model);
		transpose(model, model);

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
