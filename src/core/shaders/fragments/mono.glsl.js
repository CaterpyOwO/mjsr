export const fragment = `
    float lum = (v_colour.r + v_colour.g + v_colour.b) / 3.0;
    vec2 monoColour = vec2(lum, v_colour.a);

    gl_FragColor = monoColour.xxxy;
`;
