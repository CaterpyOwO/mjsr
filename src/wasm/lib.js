import lib from "./lib.wasm";

export function main() {
	const imports = {};
	const decoder = new TextDecoder("utf-8");

	let mem = null;

	// memset(str, '$', 7);
	
	// imports.memset = function (str, char, len) {
	// 	console.log("memset called: ", str, len)
	// }

	imports.memset = function(str, chr, len) {
		const arr = [];

		for (let i=0; i<len; i++)
			arr[i] = chr;

		mem.set(arr, str);
		console.warn("memset called: ", str, char, len)
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
