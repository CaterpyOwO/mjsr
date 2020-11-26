export const fragment = `
uniform vec3 u_pos;
uniform vec3 u_rot;

uniform vec2 u_canvas;	

vec2 rotate2d(vec2 pos, float rad) {
    float s = sin(rad);
    float c = cos(rad);

    return vec2(pos.x * c - pos.y * s, pos.y * c + pos.x * s);
}

vec3 project(vec3 vertex) {
    vertex.x -= u_pos.x;
    vertex.y -= u_pos.y;
    vertex.z -= u_pos.z;
    
    vertex.xz = rotate2d(vertex.xz, u_rot.y);
    vertex.yz = rotate2d(vertex.yz, u_rot.x);
    
    float f = 600.0 / max(0.0, vertex.z);
    vertex.x *= f;
    vertex.y *= f;

    return vec3(vertex.x / u_canvas.x * 2.0, -(vertex.y / u_canvas.y * 2.0), vertex.z / 1000.0);
}`