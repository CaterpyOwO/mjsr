export const fragment = `
    vec3 lightColour = vec3(1.0, 1.0, 1.0);

    vec3 normal = normalize(v_normal);
    vec3 lightd = normalize(light - v_fragPos);

    // specular
    float strength = 0.3;
    vec3 viewd = normalize(v_viewPos - v_fragPos);
    vec3 reflectd = reflect(-lightd, normal);

    #if (options.mode == 2)
        vec3 halfwayd = normalize(lightd + viewd);

        float sp = pow(max(dot(normal, halfwayd), 0.0), v_shinyness);
        vec3 specular = lightColour * sp;
    #else
        float sp = pow(max(dot(viewd, reflectd), 0.0), v_shinyness);
        vec3 specular = strength * sp * lightColour; 
    #endif

    // diffuse
    float df = max(dot(normal, lightd), 0.0);
    vec3 diffuse = df * lightColour;

    // ambient
    vec3 ambient = 0.1 * lightColour;


    gl_FragColor = vec4((ambient + diffuse + specular) * gl_FragColor.rgb, gl_FragColor.a);
`;
