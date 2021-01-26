import lib from "./lib.wasm";

export function main() {
	const imports = {};
	const decoder = new TextDecoder("utf-8");

	let mem = null;

	imports.memset = function (...args) {
		console.log("waht is dis", ...args)
	}

	imports.__js_console_log = function (str, len) {
		console.log(decoder.decode(mem.subarray(str, str + len)).trim());
	};

	imports.__js_console_error = function (str, len) {
		console.error(decoder.decode(mem.subarray(str, str + len)).trim());
	};

	const instance = lib({ env: imports });
	const { main, memory } = instance.exports;

	mem = new Uint8Array(memory.buffer);

	let code = main();
	if (code !== 0) console.warn(`The function "main()" exited with code ${code}.`);
}
