export const fragment = `
    float gamma = 1.0; 
    float numColors = 5.0; 

    vec3 c = gl_FragColor.rgb;
    c = pow(c, vec3(gamma, gamma, gamma));
    c = c * numColors;
    c = floor(c);
    c = c / numColors;
    c = pow(c, vec3(1.0/gamma));

    gl_FragColor = vec4(c, gl_FragColor.a);
`;
