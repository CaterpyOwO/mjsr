import { preprocess } from "../../utility/preprocess.js";
import { fragment as mono } from "./fragments/mono.glsl.js";

export default function generate(options = { primitive: 2, lighting: true, mono: false }) {
	return preprocess(
		`
precision mediump float;

varying vec3 v_normal;
varying vec4 v_colour;

#if options.lighting
	varying vec3 v_fragPos, v_viewPos;
	vec3 light = vec3(0.0, -2.0, -5.0);
#endif

void main() {
	#if options.mono
		${mono}
	#else
		gl_FragColor = v_colour;
	#endif

	#if options.lighting
		vec3 lightColour = vec3(1.0, 1.0, 1.0);

		vec3 normal = normalize(v_normal);
		vec3 lightd = normalize(light - v_fragPos);

		// specular
		float strength = 0.3;
		vec3 viewd = normalize(v_viewPos - v_fragPos);
		vec3 reflectd = reflect(-lightd, normal);

		float sp = pow(max(dot(viewd, reflectd), 0.0), 32.0);
		vec3 specular = strength * sp * lightColour;  

		// diffuse
		float df = max(dot(normal, lightd), 0.0);
		vec3 diffuse = df * lightColour;

		// ambient
		vec3 ambient = 0.1 * lightColour;
		

		gl_FragColor = vec4((ambient + diffuse + specular) * v_colour.rgb, v_colour.a);	
	#endif
}`,
		options
	);
}
