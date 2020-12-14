export const fragment = `
    float lum = (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b) / 3.0;
    vec2 monoColour = vec2(lum, v_colour.a);

    gl_FragColor = monoColour.xxxy;
`;
