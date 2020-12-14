import { preprocess } from "../../utility/preprocess.js";
import { fragment as mono } from "./fragments/mono.glsl.js";
import { fragment as posteriz } from "./fragments/posterization.glsl.js";
import { fragment as lighting } from "./fragments/lighting.glsl.js";

export default function generate(
	options = { primitive: 2, mono: false, mode: 0, posterization: false }
) {
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
		gl_FragColor = v_colour;

		#if (options.mode !== 0)
			${lighting}
		#endif

		#if options.mono
			${mono}
		#endif

		#if options.posterization
			${posteriz}
		#endif
	}`,
		options
	);
}
