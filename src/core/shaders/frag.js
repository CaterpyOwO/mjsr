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
	
	uniform vec3 u_colour;
    uniform float u_shinyness;

	#if (options.mode !== 0)
		varying vec3 v_fragPos, v_viewPos;
		vec3 light = vec3(0.0, -2.0, -5.0);
	#endif

	void main() {
		gl_FragColor = vec4(u_colour, 1.0);

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
