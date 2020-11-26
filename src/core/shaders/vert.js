import { fragment as project } from "./fragments/project.glsl.js";

export function generate(options = { primitive: 2, lighting: true }) {
	return `
    precision mediump float;

    attribute vec4 position;
    attribute vec4 colour;
    attribute vec4 normal;

    varying vec4 v_colour;
    varying vec4 v_normal;

    ${project}

    ${options.lighting ? "varying vec3 v_surfaceLight; vec4 light = vec4(0.0, 5.0, 5.0, 1.0);" : ""}

    void main() {
        v_colour = colour;

        ${
			options.primitive == 2 && options.lighting
				? `
        v_surfaceLight = light.xyz - position.xyz;
        v_normal = normal;`
				: ""
		}

        ${options.primitive == 0 ? "gl_PointSize = 5.0;" : ""}

        vec3 projected = project(position.xyz);
        gl_Position = vec4(projected.xyz, 1.0);
    }`;
}
