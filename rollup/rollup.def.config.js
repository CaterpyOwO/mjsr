import { terser } from "rollup-plugin-terser";
import glsl from "rollup-plugin-glsl";
import json from "@rollup/plugin-json";
import resolve from '@rollup/plugin-node-resolve';

export default {
	input: "src/mjsr.js",
	output: [
		{
			file: "dist/mjsr.js",
			format: "iife",
			name: "_mjsr_exports",
		},
		{
			file: "dist/mjsr.min.js",
			format: "iife",
			name: "_mjsr_exports",
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
		resolve()
	],
};
