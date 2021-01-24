export class Webglu {
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
		let buffer = bufferInit(this.gl, type);
		this.gl.bufferData(type, new Float32Array(data), this.gl.STATIC_DRAW);

		return buffer;
	}

	buffer16u(data, type) {
		let buffer = bufferInit(this.gl, type);
		this.gl.bufferData(type, new Uint16Array(data), this.gl.STATIC_DRAW);

		return buffer;
	}

	buffer32u(data, type) {
		let buffer = bufferInit(this.gl, type);
		this.gl.bufferData(type, new Uint32Array(data), this.gl.STATIC_DRAW);

		return buffer;
	}
}

function bufferInit(gl, type) {
	const buffer = gl.createBuffer();
	gl.bindBuffer(type, buffer);

	return buffer;
}