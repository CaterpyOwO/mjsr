import { Screen } from "./screen.js";
import { Camera } from "./camera.js";
import { default as input } from "./input.js";

import { parseColour, distance, shadeColour, normalize, crossProduct, dotProduct } from "./math.js";

import { default as webglu } from "./webgl.js";

export class Renderer {
	constructor(
		screen = new Screen(),
		camera = new Camera(),
		inputHandler = new input.FirstPerson()
	) {
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
			const props = ["coords", "verts", "faces", "colours"];

			for (let prop of props)
				if (typeof object[prop] !== "object")
					throw new Error(`Object doesn't have required property ${prop}.`);

			let mesh = {
				position: [],
				colour: [],
				normal: [],
			};

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

            // uniform mat4 u_projection;
            
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
                v_normal = normal;

                vec3 projected = project(position.xyz);
				gl_Position = vec4(projected.xyz, 1.0);
				
				v_surfaceLight = light.xyz - position.xyz;
            }
        `);

		w.frag(`
            precision mediump float;

            varying vec4 v_normal;
			varying vec4 v_colour;

			varying vec3 v_surfaceLight;
			
			vec4 lightd = vec4(0.0, 5.0, 5.0, 1.0);

            void main() {
				// float lum = (v_colour.r + v_colour.g + v_colour.b) / 3.0;
				// vec2 monoColour = vec2(lum, v_colour.a);

				gl_FragColor = v_colour;

				float light = dot(normalize(v_normal.xyz), normalize(v_surfaceLight));
				gl_FragColor.rgb *= clamp(light, 0.3, 1.0);
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
			this.w.buffers(mesh, { colour: 4 });
			gl.drawArrays(gl.TRIANGLES, 0, mesh.position.length / 3);
		}

		gl.useProgram(null);
	}

	// #region Experimantal
	setup2d(scene) {
		this.scene = scene;
		this.input.setupMovement();
	}

	draw2d() {
		// const {context: c, canvas: canvasElement} = cam.rcanvas;
		const { c, canvas } = this.screen;

		c.clearRect(0, 0, canvas.width, canvas.height);

		this.scene.sort(
			(a, b) => distance(this.camera.pos, b.coords) - distance(this.camera.pos, a.coords)
		);

		for (let object of this.scene) {
			if (!object.faces || object.faces.length == 0) {
				for (let edge of object.edges) {
					c.lineWidth = 1;

					c.beginPath();

					c.moveToD(this.camera.projectVertex2d(object.verts[edge[0]], canvas));
					c.lineToD(this.camera.projectVertex2d(object.verts[edge[1]], canvas));

					c.strokeStyle = "#111";

					c.stroke();
					c.closePath();
				}

				for (let vert of object.verts) {
					let [x, y] = this.camera.projectVertex2d(vert, canvas);
					let dst = distance(this.camera.pos, vert);

					c.beginPath();
					c.arc(x, y, 30 / dst, 0, 2 * Math.PI, false);
					c.closePath();

					c.fillStyle = "#ff00ff";
					c.strokeStyle = "#111";

					c.fill();
					c.stroke();
				}
			} else {
				let facesSorted = object.faces;
				facesSorted.sort((a, b) => {
					let za =
							this.camera.projectVertex2d(object.verts[a[0]], canvas)[2] +
							this.camera.projectVertex2d(object.verts[a[1]], canvas)[2] +
							this.camera.projectVertex2d(object.verts[a[2]], canvas)[2] / 3,
						zb =
							this.camera.projectVertex2d(object.verts[b[0]], canvas)[2] +
							this.camera.projectVertex2d(object.verts[b[1]], canvas)[2] +
							this.camera.projectVertex2d(object.verts[b[2]], canvas)[2] / 3;

					return zb - za;
				});

				for (let triangle of facesSorted) {
					let normal = crossProduct([
						object.verts[triangle[0]],
						object.verts[triangle[1]],
						object.verts[triangle[2]],
					]);

					if (
						normal[0] * (object.verts[triangle[0]][0] - this.camera.pos[0]) +
							normal[1] * (object.verts[triangle[0]][1] - this.camera.pos[1]) +
							normal[2] * (object.verts[triangle[0]][2] - this.camera.pos[2]) >
						0
					) {
						c.lineWidth = 1;

						c.beginPath();

						c.moveToD(this.camera.projectVertex2d(object.verts[triangle[0]], canvas));
						c.lineToD(this.camera.projectVertex2d(object.verts[triangle[1]], canvas));
						c.lineToD(this.camera.projectVertex2d(object.verts[triangle[2]], canvas));

						c.closePath();

						if (object.lighting) {
							let light = normalize(object.lighting);
							let dp = dotProduct(normal, light);

							let colour = shadeColour(object.colours[triangle[3]], -dp);
							(c.strokeStyle = colour), (c.fillStyle = colour);
						} else
							(c.strokeStyle = object.colours[triangle[3]]),
								(c.fillStyle = object.colours[triangle[3]]);

						c.fill();
						c.stroke();

						c.strokeStyle = "#111";
						c.fillStyle = "#111";
					}
				}
			}
		}
	}
	// #endregion

	update(now) {
		this.dt = this.last - now;
		this.last = now;

		this.input.update(this.dt);
	}
}
