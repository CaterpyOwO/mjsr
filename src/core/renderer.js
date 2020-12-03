import { Screen } from "./screen.js";
import { Camera } from "./camera.js";
import { Input } from "../input/input.js";

import { crossProduct } from "../utility/math.js";
import { parseColour } from "../utility/colour.js";

import { Webglu } from "../utility/webgl.js";

import { default as vertex } from "./shaders/vert.js";
import { default as fragment } from "./shaders/frag.js";

export class Renderer {
	constructor(screen = new Screen(), camera = new Camera(), inputHandler = new Input.None()) {
		this.screen = screen;
		this.camera = camera;

		inputHandler.setAttributes(screen, camera);
		this.input = inputHandler;

		(this.dt = 0), (this.last = 0);

		return this;
	}

	setup(scene) {
		this.scene = scene;
		this.meshes = [];

		this.primitives = new Set();
		this.shaders = {};

		for (let object of this.scene) {
			if (typeof object !== "object") throw new Error(`Invalid object in scene.`);

			const props = {
				0: ["coords", "verts", "colours", "primitive"],
				1: ["coords", "verts", "edges", "colours", "primitive"],
				2: ["coords", "verts", "faces", "colours", "primitive"],
			};

			const primitives = ["points", "lines", "triangles"];
			let primitive = -1;

			if (
				typeof object.primitive === "string" &&
				primitives.includes(object.primitive) !== undefined
			)
				primitive = primitives.indexOf(object.primitive);
			else throw new Error("No primitive type supplied.");

			for (let prop of props[primitive])
				if (object[prop] === undefined) {
					if (prop == "colours" && object["materials"]) continue;
					throw new Error(`Object doesn't have required property ${prop}.`);
				}

			let mesh = {
				position: [],
				colour: [],
				normal: [],
				shinyness: [],
				primitive,
			};

			switch (primitive) {
				case 0:
					for (let vert of object.verts) {
						let colour = parseColour(object.colours[vert[3]]);

						mesh.position.push(vert[0], vert[1], vert[2]);
						mesh.colour.push(...colour);
					}
					break;
				case 1:
					for (let edge of object.edges) {
						let colour = parseColour(object.colours[edge[2]]);

						mesh.position.push(...object.verts[edge[1]], ...object.verts[edge[0]]);

						mesh.colour.push(...colour, ...colour);
					}
					break;
				case 2:
					for (let triangle of object.faces) {
						let cross = crossProduct([
							object.verts[triangle[0]],
							object.verts[triangle[1]],
							object.verts[triangle[2]],
						]);

						let colour = [],
							shinyness = 32;
						if (object.materials) {
							colour = object.materials[triangle[3]].colour;
							shinyness = object.materials[triangle[3]].shinyness;
						} else colour = parseColour(object.colours[triangle[3]]);

						mesh.position.push(
							...object.verts[triangle[2]],
							...object.verts[triangle[1]],
							...object.verts[triangle[0]]
						);

						mesh.colour.push(...colour, ...colour, ...colour);
						mesh.shinyness.push(shinyness, shinyness, shinyness);
						mesh.normal.push(...cross, ...cross, ...cross);
					}
					break;
				default:
					throw new Error("Invalid primitive");
			}

			this.primitives.add(primitive);
			this.meshes.push(mesh);
		}

		const { gl } = this.screen;

		for (let primitive of this.primitives) {
			let shader = new Webglu(gl);

			let mode = (primitive == 2) ? 2 : 0;

			shader.vert(vertex({ mode, primitive }));
			shader.frag(fragment({ mode, primitive, mono: false }));

			shader.program();

			this.shaders[primitive] = shader;
		}

		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);

		this.input.setupMovement();
	}

	draw() {
		const { gl } = this.screen;
		let primitives = [gl.POINTS, gl.LINES, gl.TRIANGLES];

		gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		for (let sh in this.shaders) {
			let shader = this.shaders[sh];

			gl.useProgram(shader.glprogram);

			gl.uniform3fv(gl.getUniformLocation(shader.glprogram, "u_pos"), this.camera.pos);
			gl.uniform2fv(gl.getUniformLocation(shader.glprogram, "u_resolution"), [
				gl.drawingBufferWidth,
				gl.drawingBufferHeight,
			]);

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
			const primitive = mesh.primitive;
			const shader = this.shaders[primitive];

			gl.useProgram(shader.glprogram);

			// gl.uniform1i(gl.getUniformLocation(shader.glprogram, "u_primitive"), primitive);

			let buffers = {
				position: mesh.position,
				colour: mesh.colour,
				shinyness: mesh.shinyness,
			};
			if (mesh.primitive == 2) buffers.normal = mesh.normal;

			shader.buffers(buffers, { colour: 4, shinyness: 1 });

			gl.drawArrays(primitives[primitive], 0, mesh.position.length / (primitive + 1));

			gl.useProgram(null);
		}
	}

	update(now) {
		this.dt = this.last - now;
		this.last = now;

		this.input.update(this.dt);
	}
}
