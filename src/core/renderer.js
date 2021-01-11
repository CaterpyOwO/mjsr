import { Screen } from "./screen.js";
import { Camera } from "./camera.js";
import { Input } from "../input/input.js";

import { Webglu } from "../utility/webgl.js";

import { default as vertex } from "./shaders/vert.js";
import { default as fragment } from "./shaders/frag.js";

import { Object3d } from "../object/object.js";

import * as constants from "../core/constants.js";

export class Renderer {
	/**
	 * Creates a new Renderer
	 *
	 * @constructor
	 *
	 * @param {Screen} [screen=new Screen()] - The screen to render to
	 * @param {Camera} [camera=new Camera()] - The camera
	 * @param {Object} [inputHandler=new Input.None()] - Input handler
	 *
	 * @param {Object} [options={ mono: false, lighting: constants.BLINN_PHONG, culling: true, posterization: false }] - Additional rendering options
	 * @param {Number} [options.lighting=mjsr.BLINN_PHONG] - Change lighting modes
	 * @param {Boolean} [options.culling=true] - Enable face culling
	 *
	 * @param {Boolean} [options.mono=false] - Convert image to mono
	 * @param {Boolean} [options.posterization=false] - Posterize rendered image
	 *
	 * @returns {Renderer}
	 */
	constructor(
		screen = new Screen(),
		camera = new Camera(),
		inputHandler = new Input.None(),
		options = {
			mono: false,
			lighting: constants.BLINN_PHONG,
			culling: true,
			posterization: false,
		}
	) {
		this.options = {};
		this.options.mono = options.mono ?? false;
		this.options.lighting = options.lighting ?? constants.BLINN_PHONG;
		this.options.culling = options.culling ?? true;
		this.options.posterization = options.posterization ?? false;

		this.screen = screen;
		this.camera = camera;

		inputHandler.setAttributes(screen, camera);
		this.input = inputHandler;

		(this.dt = 0), (this.last = 0);

		return this;
	}

	/**
	 * Setup the renderer's scene
	 *
	 * @param {Object[]} scene - An array of Objects
	 */
	setup(scene) {
		this.scene = scene;
		this.meshes = [];

		this.primitives = new Set();
		this.shaders = {};

		for (let object of this.scene) {
			if (typeof object !== "object") throw new Error(`Invalid object in scene.`);

			if (!object.generateMesh) object = Object3d.from(object);

			let meshes = object.generateMesh(),
				primitive = meshes[0].data.primitive;

			this.primitives.add(primitive);
			this.meshes.push(...meshes);
		}

		const { gl } = this.screen;

		for (let primitive of this.primitives) {
			let shader = new Webglu(gl);

			let mode = primitive == 2 ? this.options.lighting : 0;

			shader.vert(vertex({ mode, primitive }));
			shader.frag(
				fragment({
					mode,
					primitive,
					mono: this.options.mono,
					posterization: this.options.posterization,
				})
			);

			shader.program();

			this.shaders[primitive] = shader;
		}

		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.enable(gl.DEPTH_TEST);

		if (this.options.culling) gl.enable(gl.CULL_FACE);

		this.input.setupMovement();
	}

	/**
	 * Draws the frame
	 */
	draw() {
		const { gl } = this.screen;
		let primitives = [gl.POINTS, gl.LINES, gl.TRIANGLES];

		gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		for (let sh in this.shaders) {
			let shader = this.shaders[sh];

			gl.useProgram(shader.glprogram);

			gl.uniform3fv(gl.getUniformLocation(shader.glprogram, "u_pos"), this.camera.pos);
			// gl.uniform2fv(gl.getUniformLocation(shader.glprogram, "u_resolution"), [
			// 	gl.drawingBufferWidth,
			// 	gl.drawingBufferHeight,
			// ]);

			gl.uniformMatrix4fv(
				gl.getUniformLocation(shader.glprogram, "u_modelit"),
				false,
				this.camera.modelit()
			);
			gl.uniformMatrix4fv(
				gl.getUniformLocation(shader.glprogram, "u_model"),
				false,
				this.camera.model
			);
			gl.uniformMatrix4fv(
				gl.getUniformLocation(shader.glprogram, "u_vp"),
				false,
				this.camera.vp(this.screen.canvas)
			);

			gl.useProgram(null);
		}

		for (let mesh of this.meshes) {
			const primitive = mesh.data.primitive;
			const shader = this.shaders[primitive];

			gl.useProgram(shader.glprogram);

			gl.uniform1f(
				gl.getUniformLocation(shader.glprogram, "u_shinyness"),
				mesh.material.shinyness
			);
			gl.uniform3fv(
				gl.getUniformLocation(shader.glprogram, "u_colour"),
				mesh.material.colour
			);

			// gl.uniform1i(gl.getUniformLocation(shader.glprogram, "u_primitive"), primitive);

			let buffers = {
				position: mesh.data.position,
			};
			if (primitive == 2) buffers.normal = mesh.data.normal;

			shader.buffers(buffers);

			gl.drawArrays(primitives[primitive], 0, mesh.data.position.length / (primitive + 1));

			gl.useProgram(null);
		}
	}

	/**
	 *
	 * Update the renderer
	 *
	 * @param {DOMHighResTimeStamp} now - The timestamp
	 */
	update(now) {
		this.dt = this.last - now;
		this.last = now;

		this.input.update(this.dt);
	}
}
