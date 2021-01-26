import wasm from "./matrix.wasm";

export class mat4 {
	constructor() {
		this.exports = {};
	}
	
	async init() {
		const imports = {};
		const utf8decoder = new TextDecoder( "utf-8" );

		let memory = null;

		try {

			imports['memory'] = new WebAssembly['Memory']( {'initial':32} );
			memory = new Uint8Array( imports['memory']['buffer'] );

			function console_log (str, len) {
				console.log("console.log from C")
				let arr = memory.subarray( str, str+len );
				console.log( utf8decoder.decode( arr ) );
			}
	
			imports['sinf'] = n => Math.sin(n);
			imports['cosf'] = n => Math.cos(n);
			imports['console_log'] = console_log;

			this.exports =  await wasm({ "env": imports }).then(({instance}) => instance.exports);
			this.array = new Float32Array(this.exports.memory.buffer, 0, 16);
		} catch (e) {
			throw e;
		}


		// console.log(this.exports)
		this.exports.why();
	}

	create() {
		if(this.exports.create(0) === 0) return this.array.slice();
		else throw new Error("Error while creating matrix.")
	}

	transpose(matrix) {
		this.array = matrix;
		if(this.exports.transpose(0) === 0) return this.array.slice();
		else throw new Error("Error while transposing matrix.")
	}

	invert(matrix) {
		this.array = matrix;
		if(this.exports.invert(0) === 0) return this.array.slice();
		else throw new Error("Error while inverting matrix.")
	}

	rotateX(matrix, rad) {
		this.array = matrix;
		if(this.exports.rotateX(0, rad) === 0) return this.array.slice();
		else throw new Error("Error while rotating matrix.")
	}
}