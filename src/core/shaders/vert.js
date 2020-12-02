import { preprocess } from "../../utility/preprocess.js";

export default function generate(options = { primitive: 2, lighting: true }) {
	return preprocess(
		`
    precision mediump float;

    attribute vec4 position;
    attribute vec4 colour;
    attribute vec3 normal;
    attribute float shinyness;

    varying vec4 v_colour;
    varying vec3 v_normal;
    varying float v_shinyness;

	varying vec3 v_fragPos, v_viewPos;

    uniform mat4 u_vp, u_model, u_modelit;
    uniform vec3 u_pos;

    #if (options.lighting)
        vec3 light = vec3(0.0, 2.0, -5.0);
    #endif

    void main() {
        v_colour = colour;
        v_shinyness = shinyness;

        #if (options.primitive == 2 && options.lighting) 
            v_fragPos = vec3(u_model * position);
            v_viewPos = u_pos;
            v_normal = mat3(u_modelit) * normal;
        #endif

        #if (options.primitive == 0)
            gl_PointSize = 5.0;
        #endif

        mat4 mvp = u_vp * u_model;
        gl_Position = mvp * position;
    }`,
		options
	);
}
