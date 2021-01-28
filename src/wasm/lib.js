import lib from "./lib.wasm";
import { format } from "./format.js";

function test() {
  let i, j, n;
	 let line = "";
  
  for (i = 0; i < 11; i++) {
    for (j = 0; j < 10; j++) {
      n = 10 * i + j;
	  if (n > 109) break;

      line += `\\033[${n}m${new Array(5 - (""+n).length).join(" ")}${n}\\033[0m`
    }
    console.log(...format(line));
    line = "";
  }
  return 0;
}


export function main() {
	let mem = null;
	const imports = {};
	const decoder = new TextDecoder("utf-8");


	test()


	imports.memset = function(str, chr, len) {
		const arr = [];

		for (let i=0; i<len; i++)
			arr[i] = chr;

		mem.set(arr, str);
		console.warn("memset called: ", str, char, len)
	}

	imports.__js_console_log = function (str, len) {
		console.log(...format(decoder.decode(mem.subarray(str, str + len))));
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
