import { preprocess } from "../../utility/preprocess.js";

export default function generate(options = { primitive: 2, lighting: true }) {
	return preprocess(
		`
    precision mediump float;

    attribute vec4 position;
    attribute vec3 normal;

    varying vec3 v_colour;
    varying vec3 v_normal;
    varying float v_shinyness;

	varying vec3 v_fragPos, v_viewPos;

    uniform mat4 u_vp, u_model, u_modelit;
    uniform vec3 u_pos;

    uniform mat4 u_modelobj;

    void main() {
        #if (options.primitive == 2 && options.mode !== 0) 
            v_fragPos = vec3(u_model * position);
            v_viewPos = u_pos;
            v_normal = mat3(u_modelit) * normal;
        #endif

        #if (options.primitive == 0)
            gl_PointSize = 5.0;
        #endif
        

        gl_Position = (u_vp * u_model) * (u_modelobj * position);
    }`,
		options
	);
}
