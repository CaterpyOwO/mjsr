import { preprocess } from "../../utility/preprocess.js";
import { fragment as mono } from "./fragments/mono.glsl.js";
import { fragment as lighting } from "./fragments/lighting.glsl.js";

export default function generate(options = { primitive: 2, mono: true, mode: 0 }) {
	return preprocess(
		`
	precision mediump float;

	varying vec3 v_normal;
	varying vec4 v_colour;
	varying float v_shinyness;

	#if (options.mode !== 0)
		varying vec3 v_fragPos, v_viewPos;
		vec3 light = vec3(0.0, -2.0, -5.0);
	#endif

	void main() {
		#if options.mono
			${mono}
		#else
			gl_FragColor = v_colour;
		#endif

		#if (options.mode !== 0)
			${lighting}
		#endif
	}`,
		options
	);
}
