import { Screen } from "./screen.js";
import { Camera } from "./camera.js";
import { default as input } from "./input.js";

import { parseColour, distance, shadeColour, normalize, crossProduct, dotProduct } from "./math.js";

import { default as webglu } from "./webgl.js";

export class Renderer {
	constructor(screen = new Screen(), camera = new Camera(), inputHandler = new input.None()) {
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

		for (let object of this.scene) {
			if (typeof object !== "object") throw new Error(`Invalid object in scene.`);

			const props = {
				0: ["coords", "verts", "colours", "primitive"],
				1: ["coords", "verts", "edges", "colours", "primitive"],
				2: ["coords", "verts", "faces", "colours", "primitive"],
			};

			const primitives = ["points", "lines", "triangles"];
			let primitive;

			if (
				typeof object.primitive === "string" &&
				primitives.includes(object.primitive) !== undefined
			)
				primitive = primitives.indexOf(object.primitive);
			else throw new Error("No primitive type supplied.");

			for (let prop of props[primitive])
				if (object[prop] === undefined)
					throw new Error(`Object doesn't have required property ${prop}.`);

			let mesh = {
				position: [],
				colour: [],
				normal: [],
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
						let colour = parseColour(object.colours[triangle[3]]);

						mesh.position.push(
							...object.verts[triangle[2]],
							...object.verts[triangle[1]],
							...object.verts[triangle[0]]
						);

						mesh.colour.push(...colour, ...colour, ...colour);
						mesh.normal.push(...cross, ...cross, ...cross);
					}
					break;
			}

			this.meshes.push(mesh);
		}

		const { gl } = this.screen;

		const w = new webglu(gl);
		this.w = w;

		w.vert(`
			precision mediump float;

            attribute vec4 position;
            attribute vec4 colour;
            attribute vec4 normal;

			uniform int u_primitive;
			// varying int v_primitive;
            
            varying vec4 v_colour;
            varying vec4 v_normal;

            uniform vec3 u_pos;
            uniform vec3 u_rot;

			uniform vec2 u_canvas;			
			
			varying vec3 v_surfaceLight;


            vec2 rotate2d(vec2 pos, float rad) {
                float s = sin(rad);
                float c = cos(rad);
        
                return vec2(pos.x * c - pos.y * s, pos.y * c + pos.x * s);
            }


            vec3 project(vec3 vertex) {
                vertex.x -= u_pos.x;
                vertex.y -= u_pos.y;
                vertex.z -= u_pos.z;
                
                vertex.xz = rotate2d(vertex.xz, u_rot.y);
                vertex.yz = rotate2d(vertex.yz, u_rot.x);
                
                float f = 600.0 / max(0.0, vertex.z);
                vertex.x *= f;
                vertex.y *= f;

                return vec3(vertex.x / u_canvas.x * 2.0, -(vertex.y / u_canvas.y * 2.0), vertex.z / 1000.0);
			}


			vec4 light = vec4(0.0, 5.0, 5.0, 1.0);

			void main() {
				v_colour = colour;
				// v_primitive = u_primitive;

				if (u_primitive == 2) {
					v_surfaceLight = light.xyz - position.xyz;
					v_normal = normal;
				} else if (u_primitive == 0) gl_PointSize = 5.0;


                vec3 projected = project(position.xyz);
				gl_Position = vec4(projected.xyz, 1.0);
				
            }
        `);

		w.frag(`
            precision mediump float;

            varying vec4 v_normal;
			varying vec4 v_colour;

			uniform highp int u_primitive;

			varying vec3 v_surfaceLight;
			
			vec4 lightd = vec4(0.0, 5.0, 5.0, 1.0);

            void main() {
				// float lum = (v_colour.r + v_colour.g + v_colour.b) / 3.0;
				// vec2 monoColour = vec2(lum, v_colour.a);

				gl_FragColor = v_colour;

				if (u_primitive == 2) {
					float light = dot(normalize(v_normal.xyz), normalize(v_surfaceLight));
					gl_FragColor.rgb *= clamp(light, 0.3, 1.0);
				}
            }
		`);

		this.program = w.program();

		gl.clearColor(1.0, 1.0, 1.0, 1.0);
		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);

		this.input.setupMovement();
	}

	draw() {
		const { gl } = this.screen;

		gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// console.log(gl.drawingBufferWidth)

		gl.useProgram(this.program);

		gl.uniform3fv(gl.getUniformLocation(this.program, "u_pos"), this.camera.pos);
		gl.uniform3fv(gl.getUniformLocation(this.program, "u_rot"), this.camera.rot);

		gl.uniform2fv(gl.getUniformLocation(this.program, "u_canvas"), [
			gl.drawingBufferWidth,
			gl.drawingBufferHeight,
		]);

		for (let mesh of this.meshes) {
			let primitive = mesh.primitive;

			gl.uniform1i(gl.getUniformLocation(this.program, "u_primitive"), primitive);

			this.w.buffers(
				{ position: mesh.position, normal: mesh.normal, colour: mesh.colour },
				{ colour: 4 }
			);

			let primitives = [gl.POINTS, gl.LINES, gl.TRIANGLES];

			gl.drawArrays(primitives[primitive], 0, mesh.position.length / (primitive + 1));
		}

		gl.useProgram(null);
	}

	update(now) {
		this.dt = this.last - now;
		this.last = now;

		this.input.update(this.dt);
	}
}
