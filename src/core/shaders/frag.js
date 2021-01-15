import { preprocess } from "../../utility/preprocess.js";
import mono from "./fragments/mono.glsl";
import posteriz from "./fragments/posterization.glsl";
import lighting from "./fragments/lighting.glsl";

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

		struct Light {
			vec3 position;
			vec3 colour;
		};
	
		uniform Light light;
	#endif

	#if options.posterization
		uniform float p_gamma;
		uniform float p_colours;
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
