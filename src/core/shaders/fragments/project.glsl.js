export const fragment = `    
    vec4 project(vec4 vertex) {
        mat4 mvp = u_vp * u_model;
        return mvp * vertex;
    }
`;
