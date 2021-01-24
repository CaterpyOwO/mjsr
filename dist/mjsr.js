var mjsr = (function () {
	'use strict';

	var version = "v0.9.8-beta";

	/**
	 * Common utilities
	 * @module glMatrix
	 */
	// Configuration Constants
	var EPSILON = 0.000001;
	var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
	if (!Math.hypot) Math.hypot = function () {
	  var y = 0,
	      i = arguments.length;

	  while (i--) {
	    y += arguments[i] * arguments[i];
	  }

	  return Math.sqrt(y);
	};

	/**
	 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
	 * @module mat4
	 */

	/**
	 * Creates a new identity mat4
	 *
	 * @returns {mat4} a new 4x4 matrix
	 */

	function create() {
	  var out = new ARRAY_TYPE(16);

	  if (ARRAY_TYPE != Float32Array) {
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	  }

	  out[0] = 1;
	  out[5] = 1;
	  out[10] = 1;
	  out[15] = 1;
	  return out;
	}
	/**
	 * Transpose the values of a mat4
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {ReadonlyMat4} a the source matrix
	 * @returns {mat4} out
	 */

	function transpose(out, a) {
	  // If we are transposing ourselves we can skip a few steps but have to cache some values
	  if (out === a) {
	    var a01 = a[1],
	        a02 = a[2],
	        a03 = a[3];
	    var a12 = a[6],
	        a13 = a[7];
	    var a23 = a[11];
	    out[1] = a[4];
	    out[2] = a[8];
	    out[3] = a[12];
	    out[4] = a01;
	    out[6] = a[9];
	    out[7] = a[13];
	    out[8] = a02;
	    out[9] = a12;
	    out[11] = a[14];
	    out[12] = a03;
	    out[13] = a13;
	    out[14] = a23;
	  } else {
	    out[0] = a[0];
	    out[1] = a[4];
	    out[2] = a[8];
	    out[3] = a[12];
	    out[4] = a[1];
	    out[5] = a[5];
	    out[6] = a[9];
	    out[7] = a[13];
	    out[8] = a[2];
	    out[9] = a[6];
	    out[10] = a[10];
	    out[11] = a[14];
	    out[12] = a[3];
	    out[13] = a[7];
	    out[14] = a[11];
	    out[15] = a[15];
	  }

	  return out;
	}
	/**
	 * Inverts a mat4
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {ReadonlyMat4} a the source matrix
	 * @returns {mat4} out
	 */

	function invert(out, a) {
	  var a00 = a[0],
	      a01 = a[1],
	      a02 = a[2],
	      a03 = a[3];
	  var a10 = a[4],
	      a11 = a[5],
	      a12 = a[6],
	      a13 = a[7];
	  var a20 = a[8],
	      a21 = a[9],
	      a22 = a[10],
	      a23 = a[11];
	  var a30 = a[12],
	      a31 = a[13],
	      a32 = a[14],
	      a33 = a[15];
	  var b00 = a00 * a11 - a01 * a10;
	  var b01 = a00 * a12 - a02 * a10;
	  var b02 = a00 * a13 - a03 * a10;
	  var b03 = a01 * a12 - a02 * a11;
	  var b04 = a01 * a13 - a03 * a11;
	  var b05 = a02 * a13 - a03 * a12;
	  var b06 = a20 * a31 - a21 * a30;
	  var b07 = a20 * a32 - a22 * a30;
	  var b08 = a20 * a33 - a23 * a30;
	  var b09 = a21 * a32 - a22 * a31;
	  var b10 = a21 * a33 - a23 * a31;
	  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

	  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

	  if (!det) {
	    return null;
	  }

	  det = 1.0 / det;
	  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
	  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
	  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
	  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
	  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
	  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
	  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
	  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
	  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
	  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
	  return out;
	}
	/**
	 * Multiplies two mat4s
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {ReadonlyMat4} a the first operand
	 * @param {ReadonlyMat4} b the second operand
	 * @returns {mat4} out
	 */

	function multiply(out, a, b) {
	  var a00 = a[0],
	      a01 = a[1],
	      a02 = a[2],
	      a03 = a[3];
	  var a10 = a[4],
	      a11 = a[5],
	      a12 = a[6],
	      a13 = a[7];
	  var a20 = a[8],
	      a21 = a[9],
	      a22 = a[10],
	      a23 = a[11];
	  var a30 = a[12],
	      a31 = a[13],
	      a32 = a[14],
	      a33 = a[15]; // Cache only the current line of the second matrix

	  var b0 = b[0],
	      b1 = b[1],
	      b2 = b[2],
	      b3 = b[3];
	  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	  b0 = b[4];
	  b1 = b[5];
	  b2 = b[6];
	  b3 = b[7];
	  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	  b0 = b[8];
	  b1 = b[9];
	  b2 = b[10];
	  b3 = b[11];
	  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	  b0 = b[12];
	  b1 = b[13];
	  b2 = b[14];
	  b3 = b[15];
	  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	  return out;
	}
	/**
	 * Translate a mat4 by the given vector
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {ReadonlyMat4} a the matrix to translate
	 * @param {ReadonlyVec3} v vector to translate by
	 * @returns {mat4} out
	 */

	function translate(out, a, v) {
	  var x = v[0],
	      y = v[1],
	      z = v[2];
	  var a00, a01, a02, a03;
	  var a10, a11, a12, a13;
	  var a20, a21, a22, a23;

	  if (a === out) {
	    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
	    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
	    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
	    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
	  } else {
	    a00 = a[0];
	    a01 = a[1];
	    a02 = a[2];
	    a03 = a[3];
	    a10 = a[4];
	    a11 = a[5];
	    a12 = a[6];
	    a13 = a[7];
	    a20 = a[8];
	    a21 = a[9];
	    a22 = a[10];
	    a23 = a[11];
	    out[0] = a00;
	    out[1] = a01;
	    out[2] = a02;
	    out[3] = a03;
	    out[4] = a10;
	    out[5] = a11;
	    out[6] = a12;
	    out[7] = a13;
	    out[8] = a20;
	    out[9] = a21;
	    out[10] = a22;
	    out[11] = a23;
	    out[12] = a00 * x + a10 * y + a20 * z + a[12];
	    out[13] = a01 * x + a11 * y + a21 * z + a[13];
	    out[14] = a02 * x + a12 * y + a22 * z + a[14];
	    out[15] = a03 * x + a13 * y + a23 * z + a[15];
	  }

	  return out;
	}
	/**
	 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {ReadonlyMat4} a the matrix to scale
	 * @param {ReadonlyVec3} v the vec3 to scale the matrix by
	 * @returns {mat4} out
	 **/

	function scale(out, a, v) {
	  var x = v[0],
	      y = v[1],
	      z = v[2];
	  out[0] = a[0] * x;
	  out[1] = a[1] * x;
	  out[2] = a[2] * x;
	  out[3] = a[3] * x;
	  out[4] = a[4] * y;
	  out[5] = a[5] * y;
	  out[6] = a[6] * y;
	  out[7] = a[7] * y;
	  out[8] = a[8] * z;
	  out[9] = a[9] * z;
	  out[10] = a[10] * z;
	  out[11] = a[11] * z;
	  out[12] = a[12];
	  out[13] = a[13];
	  out[14] = a[14];
	  out[15] = a[15];
	  return out;
	}
	/**
	 * Rotates a mat4 by the given angle around the given axis
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {ReadonlyMat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @param {ReadonlyVec3} axis the axis to rotate around
	 * @returns {mat4} out
	 */

	function rotate(out, a, rad, axis) {
	  var x = axis[0],
	      y = axis[1],
	      z = axis[2];
	  var len = Math.hypot(x, y, z);
	  var s, c, t;
	  var a00, a01, a02, a03;
	  var a10, a11, a12, a13;
	  var a20, a21, a22, a23;
	  var b00, b01, b02;
	  var b10, b11, b12;
	  var b20, b21, b22;

	  if (len < EPSILON) {
	    return null;
	  }

	  len = 1 / len;
	  x *= len;
	  y *= len;
	  z *= len;
	  s = Math.sin(rad);
	  c = Math.cos(rad);
	  t = 1 - c;
	  a00 = a[0];
	  a01 = a[1];
	  a02 = a[2];
	  a03 = a[3];
	  a10 = a[4];
	  a11 = a[5];
	  a12 = a[6];
	  a13 = a[7];
	  a20 = a[8];
	  a21 = a[9];
	  a22 = a[10];
	  a23 = a[11]; // Construct the elements of the rotation matrix

	  b00 = x * x * t + c;
	  b01 = y * x * t + z * s;
	  b02 = z * x * t - y * s;
	  b10 = x * y * t - z * s;
	  b11 = y * y * t + c;
	  b12 = z * y * t + x * s;
	  b20 = x * z * t + y * s;
	  b21 = y * z * t - x * s;
	  b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

	  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
	  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
	  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
	  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
	  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
	  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
	  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
	  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
	  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
	  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
	  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
	  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

	  if (a !== out) {
	    // If the source and destination differ, copy the unchanged last row
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	  }

	  return out;
	}
	/**
	 * Rotates a matrix by the given angle around the X axis
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {ReadonlyMat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */

	function rotateX(out, a, rad) {
	  var s = Math.sin(rad);
	  var c = Math.cos(rad);
	  var a10 = a[4];
	  var a11 = a[5];
	  var a12 = a[6];
	  var a13 = a[7];
	  var a20 = a[8];
	  var a21 = a[9];
	  var a22 = a[10];
	  var a23 = a[11];

	  if (a !== out) {
	    // If the source and destination differ, copy the unchanged rows
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	  } // Perform axis-specific matrix multiplication


	  out[4] = a10 * c + a20 * s;
	  out[5] = a11 * c + a21 * s;
	  out[6] = a12 * c + a22 * s;
	  out[7] = a13 * c + a23 * s;
	  out[8] = a20 * c - a10 * s;
	  out[9] = a21 * c - a11 * s;
	  out[10] = a22 * c - a12 * s;
	  out[11] = a23 * c - a13 * s;
	  return out;
	}
	/**
	 * Rotates a matrix by the given angle around the Y axis
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {ReadonlyMat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */

	function rotateY(out, a, rad) {
	  var s = Math.sin(rad);
	  var c = Math.cos(rad);
	  var a00 = a[0];
	  var a01 = a[1];
	  var a02 = a[2];
	  var a03 = a[3];
	  var a20 = a[8];
	  var a21 = a[9];
	  var a22 = a[10];
	  var a23 = a[11];

	  if (a !== out) {
	    // If the source and destination differ, copy the unchanged rows
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	  } // Perform axis-specific matrix multiplication


	  out[0] = a00 * c - a20 * s;
	  out[1] = a01 * c - a21 * s;
	  out[2] = a02 * c - a22 * s;
	  out[3] = a03 * c - a23 * s;
	  out[8] = a00 * s + a20 * c;
	  out[9] = a01 * s + a21 * c;
	  out[10] = a02 * s + a22 * c;
	  out[11] = a03 * s + a23 * c;
	  return out;
	}
	/**
	 * Generates a perspective projection matrix with the given bounds.
	 * Passing null/undefined/no value for far will generate infinite projection matrix.
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {number} fovy Vertical field of view in radians
	 * @param {number} aspect Aspect ratio. typically viewport width/height
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum, can be null or Infinity
	 * @returns {mat4} out
	 */

	function perspective(out, fovy, aspect, near, far) {
	  var f = 1.0 / Math.tan(fovy / 2),
	      nf;
	  out[0] = f / aspect;
	  out[1] = 0;
	  out[2] = 0;
	  out[3] = 0;
	  out[4] = 0;
	  out[5] = f;
	  out[6] = 0;
	  out[7] = 0;
	  out[8] = 0;
	  out[9] = 0;
	  out[11] = -1;
	  out[12] = 0;
	  out[13] = 0;
	  out[15] = 0;

	  if (far != null && far !== Infinity) {
	    nf = 1 / (near - far);
	    out[10] = (far + near) * nf;
	    out[14] = 2 * far * near * nf;
	  } else {
	    out[10] = -1;
	    out[14] = -2 * near;
	  }

	  return out;
	}

	class Camera {
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

	class Screen {
		/**
		 * Creates a new Screen that handles canvas resizing
		 *
		 * @constructor
		 *
		 * @param {Object} size - The size of the canvas to create
		 * @param {Number} [size.width=640] - The width of the canvas in pixels
		 * @param {Number} [size.height=480] - The height of the canvas in pixels
		 *
		 * @param {HTMLElement} [parent=document.body] - The parent  to which the canvas should be attached to.
		 *
		 * @param {HTMLCanvasElement} [canvas=document.createElement("canvas")] - The canvas
		 * @returns {Screen}
		 */
		constructor(
			size = { width: 640, height: 480 },
			parent = document.body,
			canvas = document.createElement("canvas")
		) {
			this.canvas = canvas;

			this.canvas.width = size.width;
			this.canvas.height = size.height;

			this.gl = this.canvas.getContext("webgl");

			this.parent = parent;

			if (parent instanceof HTMLElement) parent.appendChild(this.canvas);

			return this;
		}

		fullscreen() {
			this.canvas.width = innerWidth;
			this.canvas.height = innerHeight;

			window.addEventListener("resize", () => {
				this.canvas.width = innerWidth;
				this.canvas.height = innerHeight;
			});

			let style = document.createElement("style");
			style.innerText = `html,body{margin:0;overflow:hidden}`;

			document.head.appendChild(style);

			return this;
		}

		fillParent() {
			this.canvas.width = this.parent.clientWidth;
			this.canvas.height = this.parent.clientHeight;

			window.addEventListener("resize", () => {
				this.canvas.width = this.parent.clientWidth;
				this.canvas.height = this.parent.clientHeight;
			});

			return this;
		}

		square(dimens) {
			this.canvas.width = dimens;
			this.canvas.height = dimens;

			return this;
		}

		rect(w, h) {
			this.canvas.width = w;
			this.canvas.height = h;

			return this;
		}
	}

	class None {
		update() {}
		attributes() {}
		setup() {}
	}

	class FirstPerson {
		constructor() {
			this.keys = [];
		}

		attributes(screen, camera) {
			this.screen = screen;
			this.camera = camera;
		}

		setup() {
			let { canvas } = this.screen;

			window.addEventListener("keydown", event => (this.keys[event.key.toLowerCase()] = true));
			window.addEventListener("keyup", event => (this.keys[event.key.toLowerCase()] = false));

			let movement = event => {
				if (Math.abs(event.movementX) > 50 || Math.abs(event.movementY) > 50) return;
				else return this.mouseRotation([event.movementX, event.movementY]);
			};

			canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
			document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

			canvas.onclick = () => canvas.requestPointerLock();

			let lock = () => {
				if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas)
					canvas.onmousemove = movement;
				else canvas.onmousemove = null;
			};

			document.addEventListener("pointerlockchange", lock);
			document.addEventListener("mozpointerlockchange", lock);
		}

		mouseRotation(movement, sensitivity = 3) {
			let [x, y] = movement;

			sensitivity *= 100;

			x /= sensitivity;
			y /= sensitivity;

			if (this.camera.rot[0] + y < Math.PI / 2 && this.camera.rot[0] + y > -(Math.PI / 2))
				this.camera.rot[0] += y;
			this.camera.rot[1] += x;
		}

		update(dt) {
			let { canvas } = this.screen;

			if (document.pointerLockElement == canvas || document.mozPointerLockElement == canvas) {
				let s = dt / 160;

				if (this.keys["q"]) this.camera.pos[1] -= s; // q, shift
				if (this.keys["e"]) this.camera.pos[1] += s; // e, space

				let x = s * Math.sin(this.camera.rot[1]),
					y = s * Math.cos(this.camera.rot[1]);

				if (this.keys["w"]) (this.camera.pos[0] -= x), (this.camera.pos[2] += y); // w
				if (this.keys["s"]) (this.camera.pos[0] += x), (this.camera.pos[2] -= y); // s

				if (this.keys["a"]) (this.camera.pos[0] += y), (this.camera.pos[2] += x); // a
				if (this.keys["d"]) (this.camera.pos[0] -= y), (this.camera.pos[2] -= x); // w
			}
		}
	}

	class ModelRotate {
		constructor() {
			this.keys = [];
		}

		attributes(screen, camera) {
			this.screen = screen;
			this.camera = camera;
		}

		setup() {
			let { canvas } = this.screen;
			let lastMovement = [0, 0];

			const mouse = event => this.mouseRotation([event.movementX, event.movementY]);
			const touch = event => (
				this.mouseRotation([
					-(lastMovement[0] - event.touches[0].screenX),
					lastMovement[1] - event.touches[0].screenY,
				]),
				(lastMovement = [event.touches[0].screenX, event.touches[0].screenY])
			);

			canvas.onmousedown = () => (canvas.onmousemove = mouse);
			window.onmouseup = () => (canvas.onmousemove = null);

			canvas.addEventListener(
				"touchstart",
				event => (lastMovement = [event.touches[0].screenX, event.touches[0].screenY]),
				{ passive: true }
			);
			canvas.addEventListener("touchmove", touch, { passive: true });
			canvas.addEventListener(
				"touchend",
				() => ((canvas.ontouchmove = null), (lastMovement = [0, 0]))
			);
		}

		mouseRotation(movement) {
			rotateY(this.camera.model, this.camera.model, movement[0] * 0.01);
		}

		update() {}
	}

	const Input = {
		None,
		FirstPerson,
		ModelRotate,
	};

	class Webglu {
		constructor(gl) {
			this.gl = gl;

			this.shaders = [];
			this.glprogram = null;

			this.locations = {};

			return this;
		}

		frag(source) {
			this.shader(source, this.gl.FRAGMENT_SHADER);
		}

		vert(source) {
			this.shader(source, this.gl.VERTEX_SHADER);
		}

		shader(source, type) {
			source = source.raw ? source.raw.join("") : source;

			if (!type) {
				let vertReg = new RegExp("// ?vert(ex)?( |_|-)shader", "i"),
					fragReg = new RegExp("// ?frag(ment)?( |_|-)shader", "i");

				if (vertReg.test(source)) type = this.gl.VERTEX_SHADER;
				else if (fragReg.test(source)) type = this.gl.FRAGMENT_SHADER;
				else throw new Error("No shader type found.");
			}

			let shader = this.gl.createShader(type);
			this.gl.shaderSource(shader, source);
			this.gl.compileShader(shader);

			if (this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS))
				return this.shaders.push(shader), shader;

			console.error(
				`Error in shader:\n${source
				.split(/\n/)
				.map((v, i) => `${i + 1}: ${v}`)
				.join("\n")}`
			);
			let err = new Error(this.gl.getShaderInfoLog(shader));
			this.gl.deleteShader(shader);
			throw err;
		}

		program(...shaders) {
			if (shaders.length == 0) shaders = this.shaders;
			if (shaders.length == 0) throw new Error("No shaders were supplied.");

			let program = this.gl.createProgram();

			for (let shader of shaders) {
				this.gl.attachShader(program, shader);
			}

			this.gl.linkProgram(program);

			if (this.gl.getProgramParameter(program, this.gl.LINK_STATUS))
				return (this.glprogram = program), program;

			let err = new Error(this.gl.getProgramInfoLog(program));
			this.gl.deleteProgram(program);
			throw err;
		}

		buffers(arrays, sizes = {}) {
			if (arrays.length == 0) throw new Error("No buffers were supplied.");

			for (let b in arrays) {
				let array = arrays[b];

				this.buffer32f(array, this.gl.ARRAY_BUFFER);

				let attribute = this.gl.getAttribLocation(this.glprogram, b);
				this.gl.enableVertexAttribArray(attribute);

				if (sizes[b])
					this.gl.vertexAttribPointer(attribute, sizes[b], this.gl.FLOAT, false, 0, 0);
				else this.gl.vertexAttribPointer(attribute, 3, this.gl.FLOAT, false, 0, 0);
			}
		}

		uniform3fv(name, v) {
			return this.gl.uniform3fv(this._location(name), v);
		}

		uniformMatrix4fv(name, transpose, value) {
			return this.gl.uniformMatrix4fv(this._location(name), transpose, value);
		}

		uniform1f(name, number) {
			return this.gl.uniform1f(this._location(name), number);
		}

		_location(name) {
			if (!this.locations[name])
				this.locations[name] = this.gl.getUniformLocation(this.glprogram, name);

			return this.locations[name];
		}

		buffer32f(data, type) {
			let buffer = this._bufferInit(type);
			this.gl.bufferData(type, new Float32Array(data), this.gl.STATIC_DRAW);

			return buffer;
		}

		buffer16u(data, type) {
			let buffer = this._bufferInit(type);
			this.gl.bufferData(type, new Uint16Array(data), this.gl.STATIC_DRAW);

			return buffer;
		}

		buffer32u(data, type) {
			let buffer = this._bufferInit(type);
			this.gl.bufferData(type, new Uint32Array(data), this.gl.STATIC_DRAW);

			return buffer;
		}

		_bufferInit(type) {
			const buffer = this.gl.createBuffer();
			this.gl.bindBuffer(type, buffer);

			return buffer;
		}
	}

	var mono = "float lum=(gl_FragColor.r+gl_FragColor.g+gl_FragColor.b)/3.0;vec2 monoColour=vec2(lum,1.0);gl_FragColor=monoColour.xxxy;";

	var posterization = "vec3 c=gl_FragColor.rgb;c=pow(c,vec3(p_gamma,p_gamma,p_gamma));c=c*p_colours;c=floor(c);c=c/p_colours;c=pow(c,vec3(1.0/p_gamma));gl_FragColor=vec4(c,1.0);";

	var lighting = "vec3 normal=normalize(v_normal);vec3 lightd=normalize(light.position-v_fragPos);float strength=0.3;vec3 viewd=normalize(v_viewPos-v_fragPos);vec3 reflectd=reflect(-lightd,normal);\n#if (options.mode == 2)\nvec3 halfwayd=normalize(lightd+viewd);float sp=pow(max(dot(normal,halfwayd),0.0),u_shinyness);vec3 specular=light.colour*sp;\n#else\nfloat sp=pow(max(dot(viewd,reflectd),0.0),u_shinyness);vec3 specular=strength*sp*light.colour;\n#endif\nfloat df=max(dot(normal,lightd),0.0);vec3 diffuse=df*light.colour;vec3 ambient=0.1*light.colour;gl_FragColor=vec4((ambient+diffuse+specular)*gl_FragColor.rgb,1.0);";

	var fragments = /*#__PURE__*/Object.freeze({
		__proto__: null,
		mono: mono,
		posteriz: posterization,
		lighting: lighting
	});

	function preprocess(source, options) {
		let lines = source.split(/\n/),
			lineCount = lines.length;

		var options = options;

		let opText = `let options = ${JSON.stringify(options)};`;

		let depths = {};
		let output = "";

		traverse();
		return output.trim();

		function traverse(currentLine = 0, condition = true, depth = 0) {
			while (currentLine < lineCount) {
				let line = lines[currentLine];

				if (line.trim().startsWith("#")) {
					switch (line.trim().substr(1).split(/\s/)[0]) {
						case "if":
							depths[depth] = condition;
							currentLine = traverse(
								currentLine + 1,
								eval(opText + line.trim().substr(3)) && depths[depth],
								depth + 1
							);
							break;
						case "else":
							currentLine = traverse(
								currentLine + 1,
								!condition && depths[depth - 1],
								depth
							);
							break;
						case "endif":
							currentLine = traverse(currentLine + 1, depths[depth - 1], depth - 1);
							break;
						case "import":
							if (condition)
								output += preprocess(fragments[line.trim().substr(8)], options);
							break;
					}
				} else if (condition) output += `${line}\n`;

				currentLine++;
			}

			return currentLine;
		}
	}

	var vert = "precision mediump float;attribute vec4 position;attribute vec3 normal;varying vec3 v_colour;varying vec3 v_normal;varying float v_shinyness;varying vec3 v_fragPos,v_viewPos;uniform mat4 u_vp,u_model,u_modelit;uniform vec3 u_pos;uniform mat4 u_modelobj;void main(){\n#if (options.primitive == 2 && options.mode !== 0)\nv_fragPos=vec3(u_model*u_modelobj*position);v_viewPos=u_pos;v_normal=mat3(u_modelit)*mat3(u_modelobj)*normal;\n#endif\n#if (options.primitive == 0)\ngl_PointSize=5.0;\n#endif\ngl_Position=(u_vp*u_model)*(u_modelobj*position);}";

	function vertex (options) {
		return preprocess(vert, options);
	}

	var frag = "precision mediump float;varying vec3 v_normal;uniform vec3 u_colour;uniform float u_shinyness;\n#if (options.mode !== 0)\nvarying vec3 v_fragPos,v_viewPos;struct Light{vec3 position;vec3 colour;};uniform Light light;\n#endif\n#if options.posterization\nuniform float p_gamma;uniform float p_colours;\n#endif\nvoid main(){gl_FragColor=vec4(u_colour,1.0);\n#if (options.mode !== 0)\n#import lighting\n#endif\n#if options.mono\n#import mono\n#endif\n#if options.posterization\n#import posteriz\n#endif\n}";

	function fragment (options) {
		return preprocess(frag, options);
	}

	// primitives
	const POINTS = 0;
	const LINES = 1;
	const TRIANGLES = 2;

	//lighting
	const NONE = 0;
	const PHONG = 1;
	const BLINN_PHONG = 2;

	//normals
	const COUNTER_CLOCKWISE = 0;
	const CLOCKWISE = 1;

	var constants = /*#__PURE__*/Object.freeze({
		__proto__: null,
		POINTS: POINTS,
		LINES: LINES,
		TRIANGLES: TRIANGLES,
		NONE: NONE,
		PHONG: PHONG,
		BLINN_PHONG: BLINN_PHONG,
		COUNTER_CLOCKWISE: COUNTER_CLOCKWISE,
		CLOCKWISE: CLOCKWISE
	});

	class Object3d {
		/**
		 * Creates a new Object3d
		 *
		 * @param {Number} [primitive=mjsr.TRIANGLES] - The primitive the object should be rendered with
		 * @param {Boolean} [materials=false] - Use materials instead of colours
		 *
		 * @returns {Object3d}
		 */
		constructor(primitive = TRIANGLES, materials = false) {
			this.primitive = primitive;

			this.verts = [];
			this.edges = [];
			this.faces = [];

			this.model = create();

			this.transformations = {
				scale: [1, 1, 1],
				rotateX: 0,
				rotateY: 0,
				rotateZ: 0,
				translate: [0, 0, 0],
			};

			switch (primitive) {
				case TRIANGLES:
					materials ? (this.materials = []) : (this.colours = []);
					break;
				case LINES:
				case POINTS:
					this.colours = [];
					break;
				default:
					throw new Error(`The primitive ${primitive} is not a valid primitive`);
			}
		}

		/**
		 * Scales the object
		 *
		 * @param {Number[]} vector - The vector by which the object should be scaled
		 */
		scale(vector) {
			this.transformations.scale = vector;
			this._updateModel();
			return this;
		}

		/**
		 * Rotates the object around the X axis
		 *
		 * @param {number} rad - Degrees to rotate by
		 */
		rotateX(rad) {
			this.transformations.rotateX = rad;
			this._updateModel();
			return this;
		}

		/**
		 * Rotates the object around the Y axis
		 *
		 * @param {number} rad - Degrees to rotate by
		 */
		rotateY(rad) {
			this.transformations.rotateY = rad;
			this._updateModel();
			return this;
		}

		/**
		 * Rotates the object around the Z axis
		 *
		 * @param {number} rad - Degrees to rotate by
		 */
		rotateZ(rad) {
			this.transformations.rotateZ = rad;
			this._updateModel();
			return this;
		}

		/**
		 * Translates the object
		 *
		 * @param {Number[]} vector - The vector by which the object should be translated
		 */
		translate(vector) {
			this.transformations.translate = vector;
			this._updateModel();
			return this;
		}

		_updateModel() {
			scale(this.model, create(), this.transformations.scale);

			rotate(this.model, this.model, this.transformations.rotateX, [1, 0, 0]);
			rotate(this.model, this.model, this.transformations.rotateY, [0, 1, 0]);
			rotate(this.model, this.model, this.transformations.rotateZ, [0, 0, 1]);

			translate(this.model, this.model, this.transformations.translate);
		}

		/**
		 * Creates a new instance of Object3d from a JavaScript Object
		 *
		 * @param {Object} object - The Object
		 */
		static from(object) {
			const out = new Object3d();

			const props = {
				0: ["verts", "colours", "primitive"],
				1: ["verts", "edges", "colours", "primitive"],
				2: ["verts", "faces", "colours", "primitive"],
			};

			const primitives = ["points", "lines", "triangles"];
			let primitive = -1;

			if (
				typeof object.primitive === "string" &&
				primitives.includes(object.primitive) !== undefined
			)
				primitive = primitives.indexOf(object.primitive);
			else if (typeof object.primitive == "number") primitive = object.primitive;
			else throw new Error("No primitive type supplied.");

			for (let prop of props[primitive]) {
				if (object[prop] === undefined) {
					if (prop == "colours" && object["materials"]) continue;
					throw new Error(`Object doesn't have required property ${prop}.`);
				}

				out[prop] = object[prop];
			}

			out.primitive = primitive;

			return out;
		}
	}

	function crossProduct(triangle) {
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

	function normalize(vec) {
		let v = Math.sqrt(vec[0] ** 2 + vec[1] ** 2 + vec[2] ** 2);
		return [(vec[0] /= v), (vec[1] /= v), (vec[2] /= v)];
	}

	function clamp(number, min, max) {
		return Math.max(Math.min(number, max), min);
	}

	// export { crossProduct, normalize, clamp, parseColour, shuffle, distance, shadeColour, dotProduct };

	function parseColour(colour, type) {
		colour = colour.trim();

		if (!type) {
			if (/rgb\([^\)]*\)/.test(colour)) type = "rgb";
			else if (/(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b/i.test(colour)) type = "hex";
			else throw new Error(`${colour} is not a valid colour.`);
		}

		switch (type) {
			case "hex":
				colour = colour.substr(1);
				if (colour.length == 3)
					colour = colour.split("").reduce((r, e) => r.push(e + e) && r, []);
				else colour = colour.match(/.{1,2}/g);

				return [...colour.map(c => clamp(parseInt(c, 16) / 255, 0.0, 1.0))];
			case "rgb":
				colour = colour.substr(4).slice(0, -1);
				colour = colour.split(",");

				return [...colour.map(c => clamp(parseInt(c) / 255, 0.0, 1.0))];

			default:
				throw new Error(`${type} is not a valid colour type.`);
		}
	}

	class Material {
		/**
		 *
		 * @constructor
		 *
		 * @param {String} colour - The colour of the material
		 * @param {Number} [shinyness=32.0] - The shinyness of the material
		 *
		 * @returns {Material}
		 */
		constructor(colour, shinyness = 32.0) {
			if (typeof colour == "string") this.colour = parseColour(colour);
			else if (Array.isArray(colour)) this.colour = colour;
			else throw new Error(`${colour} is not a valid colour.`);

			this.shinyness = shinyness;
		}
	}

	function generateMesh(object) {
		const primitives = ["points", "lines", "triangles"];
		let primitive = -1;

		const props = {
			0: ["verts", "colours", "primitive"],
			1: ["verts", "edges", "colours", "primitive"],
			2: ["verts", "faces", "colours", "primitive"],
		};

		if (typeof object.primitive === "string" && primitives.includes(object.primitive) !== undefined)
			primitive = primitives.indexOf(object.primitive);
		else if (typeof object.primitive == "number") primitive = object.primitive;
		else throw new Error("No primitive type supplied.");

		for (let prop of props[primitive]) {
			if (object[prop] === undefined) {
				if (prop == "colours" && object["materials"]) continue;
				throw new Error(`Object doesn't have required property ${prop}.`);
			}
		}

		let meshes = [];

		if (object.materials) {
			for (let m in object.materials) {
				meshes[m] = {
					material: object.materials[m],
					data: {
						position: [],
						normal: [],
						primitive,
					},
				};
			}
		} else {
			for (let c in object.colours) {
				meshes[c] = {
					material: new Material(object.colours[c]),
					data: {
						position: [],
						normal: [],
						primitive,
					},
				};
			}
		}
		try {
			switch (primitive) {
				case 0:
					for (let vert of object.verts)
						meshes[vert[3]].data.position.push(vert[0], vert[1], vert[2]);

					break;
				case 1:
					for (let edge of object.edges) {
						meshes[edge[2]].data.position.push(
							...object.verts[edge[1]],
							...object.verts[edge[0]]
						);
					}
					break;
				case 2:
					for (let triangle of object.faces) {
						let cross = crossProduct([
							object.verts[triangle[0]],
							object.verts[triangle[1]],
							object.verts[triangle[2]],
						]);

						meshes[triangle[3]].data.position.push(
							...object.verts[triangle[2]],
							...object.verts[triangle[1]],
							...object.verts[triangle[0]]
						);

						meshes[triangle[3]].data.normal.push(...cross, ...cross, ...cross);
					}
					break;
				default:
					throw new Error("Invalid primitive");
			}
		} catch (error) {
			if (error instanceof TypeError)
				throw new Error("There was an unexpected error while parsing the mesh.");
			else throw error;
		}
		return meshes;
	}

	class Renderer {
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
				lighting: BLINN_PHONG,
				culling: true,
				posterization: false,
			}
		) {
			this.options = {};
			this.options.mono = options.mono ?? false;
			this.options.lighting = options.lighting ?? BLINN_PHONG;
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

			if (assert(inputHandler.attributes, "Input handler doesn't have a .attributes() method."))
				inputHandler.attributes(screen, camera);

			assert(inputHandler.setup, "Input handler doesn't have a .setup() method.");
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
			const { gl } = this.screen;

			this.scenes = [];
			this.__scene = 0;

			this.primitives = {
				0: false,
				1: false,
				2: false,
			};
			this.shaders = {};

			for (let s in scenes) {
				let scene = scenes[s];
				let sceneMeshes = [];

				assert(scene.length, `Scene ${s} has no objects.`);

				for (let o in scene) {
					let object = scene[o];
					assert(typeof object == "object", "Invalid object in scene.");

					if (!(object instanceof Object3d)) object = Object3d.from(object);

					let meshes = generateMesh(object);

					this.primitives[meshes[0].data.primitive] = true;
					sceneMeshes.push(
						...meshes.map(v => {
							v.object = o;
							return v;
						})
					);
				}

				this.scenes.push({ meshes: sceneMeshes, objects: scene });
			}

			for (let primitive in this.primitives) {
				if (this.primitives[primitive]) {
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
			}

			gl.clearColor(1.0, 1.0, 1.0, 1.0);
			gl.enable(gl.DEPTH_TEST);

			if (this.options.culling) gl.enable(gl.CULL_FACE);

			this.input.setup();
		}

		/**
		 * Draws the frame
		 */
		draw() {
			const { gl } = this.screen;
			let primitives = [gl.POINTS, gl.LINES, gl.TRIANGLES];

			gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

			for (let s in this.shaders) {
				let shader = this.shaders[s];

				gl.useProgram(shader.glprogram);

				shader.uniform3fv("u_pos", this.camera.pos);

				shader.uniformMatrix4fv("u_modelit", false, this.camera.modelit());
				shader.uniformMatrix4fv("u_model", false, this.camera.model);
				shader.uniformMatrix4fv("u_vp", false, this.camera.vp(this.screen.canvas));

				if (this.options.lighting !== NONE) {
					shader.uniform3fv("light.position", this.lighting.position);
					shader.uniform3fv("light.colour", this.lighting.colour);
				}

				if (this.options.posterization) {
					shader.uniform1f("p_gamma", this.posterization.gamma);
					shader.uniform1f("p_colours", this.posterization.colours);
				}

				gl.useProgram(null);
			}

			for (let mesh of this.scenes[this.__scene].meshes) {
				const primitive = mesh.data.primitive;
				const shader = this.shaders[primitive];

				gl.useProgram(shader.glprogram);

				shader.uniform1f("u_shinyness", mesh.material.shinyness);
				shader.uniform3fv("u_colour", mesh.material.colour);

				let model = this.scenes[this.__scene].objects[mesh.object].model;
				if (model) shader.uniformMatrix4fv("u_modelobj", false, model);
				else
					//prettier-ignore
					shader.uniformMatrix4fv("u_modelobj", false, [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,]);

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

			this.dt = now - this.last;
			this.last = now;

			this.input.update(this.dt);
		}

		get scene() {
			return this.__scene;
		}

		set scene(index) {
			if (assert(typeof index == "number" && this.scenes[index], "Invalid scene index."))
				this.__scene = index;
		}
	}

	function assert(condition, message) {
		if (!condition) throw new Error("Assertion failed: " + message);
		else return true;
	}

	class Cube {
		constructor(coords = [0, 0, 0]) {
			let [x, y, z] = coords;

			this.coords = coords;

			this.primitive = "triangles";

			this.verts = [
				[x - 1, y - 1, z - 1],
				[x + 1, y - 1, z - 1],
				[x + 1, y + 1, z - 1],
				[x - 1, y + 1, z - 1],
				[x - 1, y - 1, z + 1],
				[x + 1, y - 1, z + 1],
				[x + 1, y + 1, z + 1],
				[x - 1, y + 1, z + 1],
			];

			this.edges = [
				[0, 1],
				[1, 2],
				[2, 3],
				[3, 0],
				[4, 5],
				[5, 6],
				[6, 7],
				[7, 4],
				[0, 4],
				[1, 5],
				[2, 6],
				[3, 7],
			];

			this.faces = [
				[0, 1, 2, 0],
				[2, 3, 0, 0],

				[1, 5, 6, 1],
				[6, 2, 1, 1],

				[4, 5, 1, 2],
				[1, 0, 4, 2],

				[6, 5, 4, 3],
				[4, 7, 6, 3],

				[7, 4, 0, 4],
				[0, 3, 7, 4],

				[2, 6, 7, 5],
				[7, 3, 2, 5],
			];

			this.colours = ["#0ff", "#0f0", "#f0f", "#00f", "#ff0", "#f00"];
		}
	}

	class Plane {
		constructor(coords = [0, 0, 0]) {
			this.coords = coords;
			let [x, y, z] = coords;

			this.primitive = "triangles";

			this.verts = [
				[x - 1, y, z - 1],
				[x - 1, y, z + 1],
				[x + 1, y, z + 1],
				[x + 1, y, z - 1],
			];

			this.faces = [
				[0, 1, 2, 0],
				[2, 3, 0, 0],
				[2, 1, 0, 1],
				[0, 3, 2, 1],
			];

			this.colours = ["#faf", "#aff"];
		}
	}

	const Geometry = {
		Cube,
		Plane,
	};

	class OBJLoader {
		/**
		 *
		 * @param {String} url - The URL of the .obj file
		 * @param {mjsr.CLOCKWISE|mjsr.COUNTER_CLOCKWISE} [normals=mjsr.CLOCKWISE] - The order of the normals
		 * @param {Object3d} [object=new Object3d(constants.TRIANGLES, true)] - The object to which the data should be appended
		 * @param {Material} [material=new Material("#fff", 128)] - The material that should be used to draw the object
		 *
		 * @returns {OBJLoader}
		 */
		constructor(url, normals = CLOCKWISE, material = new Material("#fff", 128)) {
			this.url = url;
			this.object = new Object3d(TRIANGLES, true);
			this.normals = normals;

			if (material instanceof Material) this.object.materials[0] = material;
			else throw new Error(`${material} is not a valid material`);
		}

		/**
		 * Load and parse the .obj
		 *
		 *  @returns {Object3d}
		 */
		async load() {
			const obj = (await loadFile(this.url)).split(/\n/);

			for (let line of obj) {
				line = line.trim().split(/\s/);
				let ltype = line.shift();

				switch (ltype) {
					case "#":
						break;
					case "v":
						this.object.verts.push(line.map((v, i) => parseFloat(v)));
						break;
					case "f":
						line = line.map(v => parseInt(v.split(/\//)[0]) - 1);

						if (this.normals == COUNTER_CLOCKWISE)
							this.object.faces.push([line[0], line[1], line[2], 0]);
						else this.object.faces.push([line[2], line[1], line[0], 0]);
						break;
				}
			}

			if (!this.object.verts.length) throw new Error("Object doesn't have any vertices.");
			else if (!this.object.faces.length) throw new Error("Object doesn't have any faces.");

			return this.object;
		}
	}

	async function loadFile(url) {
		try {
			return (await fetch(url)).text();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Mjsr - Minimalistic JavaScript renderer
	 *
	 * @description mjsr is a simple, lightweight 3d library for JavaScript.
	 */
	var index = {
		VERSION: version,
		...constants,

		Renderer,
		Screen,
		Camera,
		Input,
		Geometry,
		Material,
		Object3d,
		OBJLoader,
	};

	console.log(`Loaded mjsr version: %c${version}`, "text-decoration:underline");

	return index;

}());
