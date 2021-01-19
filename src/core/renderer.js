import { Screen } from "./screen.js";
import { Camera } from "./camera.js";
import { Input } from "../input/input.js";

import { Webglu } from "../utility/webglu.js";

import { default as vertex } from "./shaders/vert.js";
import { default as fragment } from "./shaders/frag.js";

import { Object3d } from "../object/object.js";

import * as constants from "../core/constants.js";

import { create, scale } from "../utility/gl-matrix/mat4.js";

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

		this.lighting = {
			colour: [1, 1, 1],
			position: [0, -2, -5],
		};

		this.posterization = {
			colours: 5,
			gamma: 1,
		};

		this.screen = screen;
		this.camera = camera;

		if (
			assert(
				inputHandler.setAttributes,
				"Input handler doesn't have a .setAttributes() method."
			)
		)
			inputHandler.setAttributes(screen, camera);

		assert(inputHandler.setupMovement, "Input handler doesn't have a .setupMovement() method.");
		assert(inputHandler.update, "Input handler doesn't have a .update() method.");

		this.input = inputHandler;

		this.dt = 0;
		this.last = 0;

		return this;
	}

	/**
	 * Setup the renderer's scene
	 *
	 * @param {Object[]} scene - An array of Objects
	 */
	setup(...scenes) {
		this.scenes = [];
		this._scene = 0;

		this.primitives = new Set();
		this.shaders = {};

		for (let s in scenes) {
			let scene = scenes[s];
			let sceneMeshes = [];

			assert(scene.length, `Scene ${s} has no objects.`);

			for (let object of scene) {
				assert(typeof object == "object", "Invalid object in scene.");

				if (!object.generateMesh) object = Object3d.from(object);

				let meshes = object.generateMesh(),
					primitive = meshes[0].data.primitive;

				this.primitives.add(primitive);
				console.log();
				sceneMeshes.push(...meshes);
			}

			this.scenes.push(sceneMeshes);
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

			shader.uniform3fv("u_pos", this.camera.pos);

			shader.uniformMatrix4fv("u_modelit", false, this.camera.modelit());
			shader.uniformMatrix4fv("u_model", false, this.camera.model);
			shader.uniformMatrix4fv("u_vp", false, this.camera.vp(this.screen.canvas));

			if (this.options.lighting !== constants.NONE) {
				shader.uniform3fv("light.position", this.lighting.position);
				shader.uniform3fv("light.colour", this.lighting.colour);
			}

			if (this.options.posterization) {
				shader.uniform1f("p_gamma", this.posterization.gamma);
				shader.uniform1f("p_colours", this.posterization.colours);
			}
			// GLuint loc = glGetUniformLocation(shader_program_id, "Light[0].Type");
			// glUniform1i(loc, value);

			gl.useProgram(null);
		}

		for (let mesh of this.scenes[this._scene]) {
			const primitive = mesh.data.primitive;
			const shader = this.shaders[primitive];

			gl.useProgram(shader.glprogram);

			shader.uniform1f("u_shinyness", mesh.material.shinyness);
			shader.uniform3fv("u_colour", mesh.material.colour);

			shader.uniformMatrix4fv("u_modelobj", false, scale(create(), create(), [3,2,1]));

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
		assert(typeof now == "number", "Invalid timestamp.");

		this.dt = this.last - now;
		this.last = now;

		this.input.update(this.dt);
	}

	get scene() {
		return this._scene;
	}

	set scene(index) {
		if (assert(typeof index == "number" && this.scenes[index], "Invalid scene index."))
			this._scene = index;
	}
}

function assert(condition, message) {
	if (!condition) throw new Error("Assertion failed: " + message);
	else return true;
}
