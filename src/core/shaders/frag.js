export function generate(options = {primitive: 2, lighting: true, mono: false}) {

return `
precision mediump float;

varying vec4 v_normal;
varying vec4 v_colour;

${options.lighting ? `
varying vec3 v_surfaceLight;
vec4 lightd = vec4(0.0, 5.0, 5.0, 1.0);` : ""}


void main() {
    ${options.mono ? `
    float lum = (v_colour.r + v_colour.g + v_colour.b) / 3.0;
    vec2 monoColour = vec2(lum, v_colour.a);

    gl_FragColor = monoColour.xxxy;
    ` : "gl_FragColor = v_colour;"}

    ${options.lighting ? `
    float light = dot(normalize(v_normal.xyz), normalize(v_surfaceLight));
    gl_FragColor.rgb *= clamp(light, 0.3, 1.0);` : ""}
}
`;
};