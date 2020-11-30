import { preprocess } from "../../utility/preprocess.js";
import { fragment2 as project } from "./fragments/project.glsl.js";

export default function generate(options = { primitive: 2, lighting: true }) {
	return preprocess(
		`
    precision mediump float;

    attribute vec4 position;
    attribute vec4 colour;
    attribute vec3 normal;

    varying vec4 v_colour;
    varying vec3 v_normal;

	varying vec3 v_fragPos, v_viewPos;

    uniform mat4 u_vp, u_model, u_modelivt;
    vec3 u_pos = vec3(0, -2.0, -5.0);

    ${project}

    #if (options.lighting)
        vec3 light = vec3(0.0, 2.0, -5.0);
    #endif

    void main() {
        v_colour = colour;

        #if (options.primitive == 2 && options.lighting) 
            v_fragPos = vec3(u_model * position);
            v_normal = mat3(u_modelivt) * normal;
        #endif

        #if (options.primitive == 0)
            gl_PointSize = 5.0;
        #endif

        gl_Position = project(position);
    }
    `,
		options
	);
}
