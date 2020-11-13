import { Screen } from "./screen.js";
import { Camera } from "./camera.js";

import { parseColour, distance, shadeColour, normalize , crossProduct, dotProduct } from "./math.js";

import { default as webglu } from "./webgl.js";


export class Renderer {
    constructor(screen = new Screen(), camera = new Camera()) {
        this.screen = screen;
        this.camera = camera;

        this.keys = [];

        this.dt = 0, this.last = 0;

        return this;

    }

    setup(scene) {
        this.scene = scene;

        for (let object of this.scene) {
            if (typeof object.coords !== "object") throw new Error("Object doesn't haves valid property coords.");
            if (typeof object.verts !== "object") throw new Error("Object doesn't haves valid property verts.");
            if (typeof object.faces !== "object") throw new Error("Object doesn't haves valid property faces.");
            if (typeof object.colours !== "object") throw new Error("Object doesn't haves valid property colours.");
        }

        const { gl } = this.screen;

        const w = new webglu(gl);
        this.w = w;

        w.vert(`
            attribute vec4 position;
            attribute vec4 colour;
            attribute vec4 normal;

            uniform mat4 u_projection;
            
            varying vec4 v_colour;
            varying vec4 v_normal;

            void main() {
                v_colour = colour;
                v_normal = normal;

                gl_Position = vec4(position.xyz, 1.0);
            }
        `);

        w.frag(`
            precision mediump float;

            varying vec4 v_normal;
            varying vec4 v_colour;

            void main() {
                // gl_FragColor = v_colour;
                float intensity = ((dot(normalize(v_normal), vec4(0.0, 0.5, 1.0, 1.0)) + 1.0) / 2.0);
                gl_FragColor = vec4(v_colour.xyz * clamp(intensity, 0.1, 1.0), v_colour.w);
            }
        `);

        this.program = w.program();

        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);

        this.__setupMovement();
    }

    draw() {
        const { gl, canvas } = this.screen;

        // twgl.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        for (let object of this.scene) {

            const arrays = {
                position: [],
                colour: [],
                normal: [],
            };

            for (let triangle of object.faces) {
                let cross = crossProduct([object.verts[triangle[0]], object.verts[triangle[1]], object.verts[triangle[2]]]);
                let colour = parseColour(object.colours[triangle[3]]);
            
                arrays.position.push(
                    ...this.camera.projectVertex(object.verts[triangle[2]], canvas),
                    ...this.camera.projectVertex(object.verts[triangle[1]], canvas),
                    ...this.camera.projectVertex(object.verts[triangle[0]], canvas)
                );

                arrays.colour.push(...colour, ...colour, ...colour);
                arrays.normal.push(...cross, ...cross, ...cross);

                // if (cross[0] * (object.verts[triangle[0]][0] - cam.pos[0]) + cross[1] * (object.verts[triangle[0]][1] - cam.pos[1]) + cross[2] * (object.verts[triangle[0]][2] - cam.pos[2]) > 0) {
            }

            // const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

            gl.useProgram(this.program);

            // console.log(mvp)

            // twgl.setUniforms(this.program, {
            //     u_projection: mvp,
            // });

            // console.log(this.program)

            // twgl.setBuffersAndAttributes(gl, this.program, bufferInfo);

            this.w.buffers(arrays, { colour: 4 });

            gl.drawArrays(gl.TRIANGLES, 0, arrays.position.length / 3);
        }
    }

    // #region Experimantal
    setup2d(scene) {
        this.scene = scene;
        this.__setupMovement();
    }

    draw2d() {
        // const {context: c, canvas: canvasElement} = cam.rcanvas;
        const { c, canvas } = this.screen;
    
        c.clearRect(0, 0, canvas.width, canvas.height);
        
        this.scene.sort((a, b) => distance(cam.pos, b.coords) - distance(cam.pos, a.coords));
    
        for (let object of this.scene) {
            if (!object.faces || object.faces.length == 0) {
                for (let edge of object.edges) {
                    c.lineWidth = 1;
    
                    c.beginPath();

                    c.moveToD(this.camera.projectVertex2d(object.verts[edge[0]], canvas));
                    c.lineToD(this.camera.projectVertex2d(object.verts[edge[1]], canvas));
    
                    c.strokeStyle = "#111";
    
                    c.stroke();
                    c.closePath();
                }
    
                for (let vert of object.verts) {
                    let [x, y] = this.camera.projectVertex2d(vert, canvas);
                    let dst = distance(this.camera.pos, vert);
    
                    c.beginPath();
                    c.arc(x, y, 30 / dst, 0, 2 * Math.PI, false);
                    c.closePath();
    
                    c.fillStyle = "#ff00ff";
                    c.strokeStyle = "#111";
    
                    c.fill();
                    c.stroke();
                }
            } else {
                let facesSorted = object.faces;
                facesSorted.sort((a, b) => {
                    let za = (this.camera.projectVertex2d(object.verts[a[0]], canvas)[2] + this.camera.projectVertex2d(object.verts[a[1]], canvas)[2] + this.camera.projectVertex2d(object.verts[a[2]], canvas)[2] / 3),
                        zb = (this.camera.projectVertex2d(object.verts[b[0]], canvas)[2] + this.camera.projectVertex2d(object.verts[b[1]], canvas)[2] + this.camera.projectVertex2d(object.verts[b[2]], canvas)[2] / 3);
    
                    return zb - za;
                });
    
                for (let triangle of facesSorted) {
                    let normal = crossProduct([object.verts[triangle[0]], object.verts[triangle[1]], object.verts[triangle[2]]]);
    
                    if (normal[0] * (object.verts[triangle[0]][0] - this.camera.pos[0]) + normal[1] * (object.verts[triangle[0]][1] - this.camera.pos[1]) + normal[2] * (object.verts[triangle[0]][2] - this.camera.pos[2]) > 0) {
    
                        c.lineWidth = 1;
    
                        c.beginPath();

                        c.moveToD(this.camera.projectVertex2d(object.verts[triangle[0]], canvas));
                        c.lineToD(this.camera.projectVertex2d(object.verts[triangle[1]], canvas));
                        c.lineToD(this.camera.projectVertex2d(object.verts[triangle[2]], canvas));
    
                        c.closePath();
    
                        if (object.lighting) {
                            let light = normalize(object.lighting);
                            let dp = dotProduct(cross, light);
    
                            let colour = shadeColour(object.colours[triangle[3]], -dp);
                            c.strokeStyle = colour, c.fillStyle = colour;    
                        } else
                            c.strokeStyle = object.colours[triangle[3]], c.fillStyle = object.colours[triangle[3]];
    
                            
                        c.fill();
                        c.stroke();
                            
                        c.strokeStyle = "#111"
                        c.fillStyle = "#111";
                    }
                }
            }
        }
    }
    // #endregion

    update(now) {
        this.dt = this.last - now;
        this.last = now;

        this.__updateKeys(this.dt);
    }

    __setupMovement() {
        let { canvas } = this.screen;

        window.onkeydown = event => this.keys[event.keyCode] = true;
        window.onkeyup = event => this.keys[event.keyCode] = false; 
        
        let movement  = event => {
            if (Math.abs(event.movementX) > 50 || Math.abs(event.movementY) > 50) return
            else return this.__mouseRotation([event.movementX, event.movementY]);
        }

        canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
        document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
        
        canvas.onclick = () => canvas.requestPointerLock();

        let lock = () => {
            if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas)
                canvas.onmousemove = movement;
            else
                canvas.onmousemove = null;
        }

        document.onpointerlockchange = () => lock();
        document.onmozpointerlockchange = () => lock();
    }

    __mouseRotation(movement, sensitivity = 3) {
        let [x, y] = movement;

        sensitivity *= 100;

        x /= sensitivity;
        y /= sensitivity;
        
        if (this.camera.rot[0] + y < Math.PI / 2 && this.camera.rot[0] + y > -(Math.PI / 2)) this.camera.rot[0] += y;
            this.camera.rot[1] += x;
    }

    __updateKeys(dt) {
        let s = dt / 160;
        
        if (this.keys[81] || this.keys[16]) this.camera.pos[1] += s; // q, shift
        if (this.keys[69] || this.keys[32]) this.camera.pos[1] -= s; // e, space

        let x = s * Math.sin(this.camera.rot[1]),
            y = s * Math.cos(this.camera.rot[1]);

        if (this.keys[87]) (this.camera.pos[0] -= x), (this.camera.pos[2] -= y); // w
        if (this.keys[83]) (this.camera.pos[0] += x), (this.camera.pos[2] += y); // s

        if (this.keys[65]) (this.camera.pos[0] += y), (this.camera.pos[2] -= x); // a
        if (this.keys[68]) (this.camera.pos[0] -= y), (this.camera.pos[2] += x); // d
    }
};