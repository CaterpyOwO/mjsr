import { preprocess } from "../../utility/preprocess.js";

export function generate(options = { primitive: 2, lighting: true, mono: false }) {
	return preprocess(
		`
precision mediump float;

varying vec4 v_normal;
varying vec4 v_colour;

#if options.lighting
	varying vec3 v_surfaceLight;
	vec4 lightd = vec4(0.0, 5.0, 5.0, 1.0);
#endif

void main() {
	#if options.mono
		float lum = (v_colour.r + v_colour.g + v_colour.b) / 3.0;
		vec2 monoColour = vec2(lum, v_colour.a);

		gl_FragColor = monoColour.xxxy;
	#else
		gl_FragColor = v_colour;
	#endif

	#if options.lighting
		float light = dot(normalize(v_normal.xyz), normalize(v_surfaceLight));
		gl_FragColor.rgb *= clamp(light, 0.3, 1.0);
	#endif
}`,
		options
	);
}
