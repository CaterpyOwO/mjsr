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
        #import lighting
    #endif

    #if options.mono
        #import mono
    #endif

    #if options.posterization
        #import posteriz
    #endif
}