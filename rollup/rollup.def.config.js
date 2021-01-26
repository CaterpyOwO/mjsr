import { terser } from "rollup-plugin-terser";
import glsl from "rollup-plugin-glsl";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import { wasm } from "@rollup/plugin-wasm";

export default {
	input: "src/index.js",
	output: [
		{
			file: "dist/mjsr.js",
			format: "iife",
			name: "mjsr",
		},
		{
			file: "dist/mjsr.min.js",
			format: "iife",
			name: "mjsr",
			plugins: [terser()],
		},
	],
	plugins: [
		glsl({
			include: "src/**/*.glsl",
			exclude: ["**/index.html"],
			sourceMap: false,
		}),
		json(),
		resolve(),
		wasm({
			sync: ["src/wasm/lib.wasm"],
		}),
	],
};
