import {
	create,
	perspective,
	rotateX,
	rotateY,
	translate,
	invert,
	transpose,
	multiply,
} from "gl-matrix/mat4";

export class Camera {
	/**
	 * Creates a new Camera
	 *
	 * @constructor
	 *
	 * @param {Number[]} [position=[0,0,0]] - The position of the camera in world space
	 * @param {Number[]} [rotation=[0,0,0]] - The rotation of the camera
	 * @param {Number} [fov=45] - The field of view of the camera
	 * @returns {Camera}
	 */
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
}
