vec3 normal = normalize(v_normal);
vec3 lightd = normalize(light.position - v_fragPos);

// specular
float strength = 0.3;
vec3 viewd = normalize(v_viewPos - v_fragPos);
vec3 reflectd = reflect(-lightd, normal);

#if (options.mode == 2)
    vec3 halfwayd = normalize(lightd + viewd);

    float sp = pow(max(dot(normal, halfwayd), 0.0), u_shinyness);
    vec3 specular = light.colour * sp;
#else
    float sp = pow(max(dot(viewd, reflectd), 0.0), u_shinyness);
    vec3 specular = strength * sp * light.colour; 
#endif

// diffuse
float df = max(dot(normal, lightd), 0.0);
vec3 diffuse = df * light.colour;

// ambient
vec3 ambient = 0.1 * light.colour;


gl_FragColor = vec4((ambient + diffuse + specular) * gl_FragColor.rgb, 1.0);
