import lib from "./lib.wasm";
import { format } from "./format.js";

export async function main() {
	const imports = {};
	const decoder = new TextDecoder("utf-8");


	imports.memory = new WebAssembly.Memory({ 'initial': 4 });
	const mem = new Uint8Array(imports.memory.buffer);

	
	imports.memset = function(str, chr, len) {
		const arr = [];

		for (let i=0; i<len; i++)
			arr[i] = chr;

		mem.set(arr, str);
		console.warn("memset called: ", str, chr, len)
	}

	imports.__js_console_log = function (str, len) {
		console.log(...format(decoder.decode(mem.subarray(str, str + len))));
	};

	imports.__js_console_error = function (str, len) {
		console.error(decoder.decode(mem.subarray(str, str + len)).trim());
	};

	const wasm = await lib({ env: imports });
	const { main } = wasm.instance.exports;

	let code = main();
	if (code !== 0) console.warn(`The function "main()" exited with code ${code}.`);
}
