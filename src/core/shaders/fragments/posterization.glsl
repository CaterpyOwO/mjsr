vec3 c = gl_FragColor.rgb;
c = pow(c, vec3(p_gamma, p_gamma, p_gamma));
c = c * p_colours;
c = floor(c);
c = c / p_colours;
c = pow(c, vec3(1.0/p_gamma));

gl_FragColor = vec4(c, 1.0);
