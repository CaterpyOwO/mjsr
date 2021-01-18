import { terser } from "rollup-plugin-terser";
import glsl from "rollup-plugin-glsl";
import serve from "rollup-plugin-serve";

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
		serve("dist"),
	],
};