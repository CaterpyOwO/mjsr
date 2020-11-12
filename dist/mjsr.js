(()=>{"use strict";var t={658:(t,e,r)=>{class s{constructor(t=[0,0,0],e=[0,0,0],r=6){return this.pos=t,this.rot=e,this.fov=100*r,this}projectVertex(t,e){let[r,s,o]=t;r-=this.pos[0],s-=this.pos[1],o-=this.pos[2],[r,o]=this.rotateVertex2d([r,o],this.rot[1]),[s,o]=this.rotateVertex2d([s,o],this.rot[0]);let i=this.fov/Math.max(0,o);r*=i,s*=i;let a=e.getBoundingClientRect();return[(r-a.left)/e.width*2,0-(s-a.top)/e.height*2,o/100]}projectVertex2d(t,e){let[r,s,o]=t;r-=this.pos[0],s-=this.pos[1],o-=this.pos[2],[r,o]=this.rotateVertex2d([r,o],this.rot[1]),[s,o]=this.rotateVertex2d([s,o],this.rot[0]);let i=this.fov/Math.max(0,o);return r*=i,s*=i,[r+e.width/2,s+e.height/2,o]}rotateVertex2d(t,e){let[r,s]=t,o=Math.sin(e),i=Math.cos(e);return[r*i-s*o,s*i+r*o]}}class o{constructor(t={width:640,height:480,appendTo:document.body}){return this.canvas=document.createElement("canvas"),this.canvas.width=t.width,this.canvas.height=t.height,this.gl=this.canvas.getContext("webgl2"),t.appendTo.appendChild(this.canvas),this}fullscreen(){this.canvas.width=innerWidth,this.canvas.height=innerHeight,window.onresize=()=>this.canvas.width=innerWidth,this.canvas.height=innerHeight;let t=document.createElement("style");return t.innerText="html,body{margin:0;overflow:hidden}",document.head.appendChild(t),this}square(t){return this.canvas.width=t,this.canvas.height=t,this}rect(t,e){return this.canvas.width=t,this.canvas.height=e,this}}function i(t){let e=[t[1][0]-t[0][0],t[1][1]-t[0][1],t[1][2]-t[0][2]],r=[t[2][0]-t[0][0],t[2][1]-t[0][1],t[2][2]-t[0][2]];return h([e[1]*r[2]-e[2]*r[1],e[2]*r[0]-e[0]*r[2],e[0]*r[1]-e[1]*r[0]])}function a(t,e){return Math.sqrt(Math.pow(e[0]-t[0],2)+Math.pow(e[1]-t[1],2)+Math.pow(e[2]-t[2],2))}function h(t){let e=Math.sqrt(t[0]**2+t[1]**2+t[2]**2);return[t[0]/=e,t[1]/=e,t[2]/=e]}function n(t){if("#"==!t.charAt(0))throw new Error(t+" is not a HEX colour.");return[...(t=3==(t=t.substr(1)).length?t.split("").reduce(((t,e)=>t.push(e+e)&&t),[]):t.match(/.{1,2}/g)).map((t=>{return e=parseInt(t,16)/255,0,1,Math.max(Math.min(e,1),0);var e})),1]}function c(t,e){if("#"==!t.charAt(0))throw new Error(t+" is not a HEX colour.");return["#",...(t=3==(t=t.substr(1)).length?t.split("").reduce(((t,e)=>t.push(e+e)&&t),[]):t.match(/.{1,2}/g)).map((t=>Renderer.Math.clamp(Math.floor(parseInt(t,16)*(.5*(e+1))),25,255).toString(16)))].join("")}t=r.hmd(t);let l={Renderer:class{constructor(t=new o,e=new s){return this.screen=t,this.camera=e,this.keys=[],this.dt=0,this.last=0,this}setup(t){this.scene=t;for(let t of this.scene){if("object"!=typeof t.coords)throw new Error("Object doesn't haves valid property coords.");if("object"!=typeof t.verts)throw new Error("Object doesn't haves valid property verts.");if("object"!=typeof t.faces)throw new Error("Object doesn't haves valid property faces.");if("object"!=typeof t.colours)throw new Error("Object doesn't haves valid property colours.")}const{gl:e}=this.screen,r=new class{constructor(t){return this.gl=t,this.shaders=[],this.glprogram=null,this}frag(t){this.shader(t,this.gl.FRAGMENT_SHADER)}vert(t){this.shader(t,this.gl.VERTEX_SHADER)}shader(t,e){if(t=t.raw?t.raw.join(""):t,!e){let r=new RegExp("// ?vert(ex)?( |_|-)shader","i"),s=new RegExp("// ?frag(ment)?( |_|-)shader","i");if(r.test(t))e=this.gl.VERTEX_SHADER;else{if(!s.test(t))throw new Error("No shader type found.");e=this.gl.FRAGMENT_SHADER}}let r=this.gl.createShader(e);if(this.gl.shaderSource(r,t),this.gl.compileShader(r),this.gl.getShaderParameter(r,this.gl.COMPILE_STATUS))return this.shaders.push(r),r;console.log(this.gl.getShaderInfoLog(r)),this.gl.deleteShader(r)}program(...t){if(0==t.length&&(t=this.shaders),0==t.length)throw new Error("No shaders were supplied.");let e=this.gl.createProgram();for(let r of t)this.gl.attachShader(e,r);if(this.gl.linkProgram(e),this.gl.getProgramParameter(e,this.gl.LINK_STATUS))return this.glprogram=e,e;console.log(this.gl.getProgramInfoLog(e)),this.gl.deleteProgram(e)}buffers(t,e){if(0==t.length)throw new Error("No buffers were supplied.");for(let r in t){let s=t[r];this.buffer32f(s,this.gl.ARRAY_BUFFER);let o=this.gl.getAttribLocation(this.glprogram,r);this.gl.enableVertexAttribArray(o),e[r]?this.gl.vertexAttribPointer(o,e[r],this.gl.FLOAT,!1,0,0):this.gl.vertexAttribPointer(o,3,this.gl.FLOAT,!1,0,0)}}buffer32f(t,e){let r=this._bufferInit(e);return this.gl.bufferData(e,new Float32Array(t),this.gl.STATIC_DRAW),r}buffer16u(t,e){let r=this._bufferInit(e);return this.gl.bufferData(e,new Uint16Array(t),this.gl.STATIC_DRAW),r}buffer32u(t,e){let r=this._bufferInit(e);return this.gl.bufferData(e,new Uint32Array(t),this.gl.STATIC_DRAW),r}_bufferInit(t){const e=this.gl.createBuffer();return this.gl.bindBuffer(t,e),e}}(e);this.w=r,r.vert("\n            attribute vec4 position;\n            attribute vec4 colour;\n            attribute vec4 normal;\n\n            uniform mat4 u_projection;\n            \n            varying vec4 v_colour;\n            varying vec4 v_normal;\n\n            void main() {\n                v_colour = colour;\n                v_normal = normal;\n\n                gl_Position = vec4(position.xyz, 1.0);\n            }\n        "),r.frag("\n            precision mediump float;\n\n            varying vec4 v_normal;\n            varying vec4 v_colour;\n\n            void main() {\n                // gl_FragColor = v_colour;\n                float intensity = ((dot(normalize(v_normal), vec4(0.0, 1.0, 1.0, 1.0)) + 1.0) / 2.0);\n                gl_FragColor = vec4(v_colour.xyz * clamp(intensity, 0.1, 1.0), v_colour.w);\n            }\n        "),this.program=r.program(),e.clearColor(1,1,1,1),e.enable(e.DEPTH_TEST),e.enable(e.CULL_FACE),this.__setupMovement()}draw(){const{gl:t,canvas:e}=this.screen;t.viewport(0,0,t.canvas.width,t.canvas.height),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT);for(let r of this.scene){const s={position:[],colour:[],normal:[]};for(let t of r.faces){let o=i([r.verts[t[0]],r.verts[t[1]],r.verts[t[2]]]),a=n(r.colours[t[3]]);s.position.push(...this.camera.projectVertex(r.verts[t[2]],e),...this.camera.projectVertex(r.verts[t[1]],e),...this.camera.projectVertex(r.verts[t[0]],e)),s.colour.push(...a,...a,...a),s.normal.push(...o,...o,...o)}t.useProgram(this.program),this.w.buffers(s,{colour:4}),t.drawArrays(t.TRIANGLES,0,s.position.length)}}setup2d(t){this.scene=t,this.__setupMovement()}draw2d(){const{c:t,canvas:e}=this.screen;t.clearRect(0,0,e.width,e.height),this.scene.sort(((t,e)=>a(cam.pos,e.coords)-a(cam.pos,t.coords)));for(let o of this.scene)if(o.faces&&0!=o.faces.length){let a=o.faces;a.sort(((t,r)=>{let s=this.camera.projectVertex2d(o.verts[t[0]],e)[2]+this.camera.projectVertex2d(o.verts[t[1]],e)[2]+this.camera.projectVertex2d(o.verts[t[2]],e)[2]/3;return this.camera.projectVertex2d(o.verts[r[0]],e)[2]+this.camera.projectVertex2d(o.verts[r[1]],e)[2]+this.camera.projectVertex2d(o.verts[r[2]],e)[2]/3-s}));for(let n of a){let a=i([o.verts[n[0]],o.verts[n[1]],o.verts[n[2]]]);if(a[0]*(o.verts[n[0]][0]-this.camera.pos[0])+a[1]*(o.verts[n[0]][1]-this.camera.pos[1])+a[2]*(o.verts[n[0]][2]-this.camera.pos[2])>0){if(t.lineWidth=1,t.beginPath(),t.moveToD(this.camera.projectVertex2d(o.verts[n[0]],e)),t.lineToD(this.camera.projectVertex2d(o.verts[n[1]],e)),t.lineToD(this.camera.projectVertex2d(o.verts[n[2]],e)),t.closePath(),o.lighting){let e=(s=h(o.lighting),(r=cross)[0]*s[0]+r[1]*s[1]+r[2]*s[2]),i=c(o.colours[n[3]],-e);t.strokeStyle=i,t.fillStyle=i}else t.strokeStyle=o.colours[n[3]],t.fillStyle=o.colours[n[3]];t.fill(),t.stroke(),t.strokeStyle="#111",t.fillStyle="#111"}}}else{for(let r of o.edges)t.lineWidth=1,t.beginPath(),t.moveToD(this.camera.projectVertex2d(o.verts[r[0]],e)),t.lineToD(this.camera.projectVertex2d(o.verts[r[1]],e)),t.strokeStyle="#111",t.stroke(),t.closePath();for(let r of o.verts){let[s,o]=this.camera.projectVertex2d(r,e),i=a(this.camera.pos,r);t.beginPath(),t.arc(s,o,30/i,0,2*Math.PI,!1),t.closePath(),t.fillStyle="#ff00ff",t.strokeStyle="#111",t.fill(),t.stroke()}}var r,s}update(t){this.dt=this.last-t,this.last=t,this.__updateKeys(this.dt)}__setupMovement(){let{canvas:t}=this.screen;window.onkeydown=t=>this.keys[t.keyCode]=!0,window.onkeyup=t=>this.keys[t.keyCode]=!1;let e=t=>Math.abs(t.movementX)>50||Math.abs(t.movementY)>50?void 0:this.__mouseRotation([t.movementX,t.movementY]);t.requestPointerLock=t.requestPointerLock||t.mozRequestPointerLock,document.exitPointerLock=document.exitPointerLock||document.mozExitPointerLock,t.onclick=()=>t.requestPointerLock();let r=()=>{document.pointerLockElement===t||document.mozPointerLockElement===t?t.onmousemove=e:t.onmousemove=null};document.onpointerlockchange=()=>r(),document.onmozpointerlockchange=()=>r()}__mouseRotation(t,e=3){let[r,s]=t;r/=e*=100,s/=e,this.camera.rot[0]+s<Math.PI/2&&this.camera.rot[0]+s>-Math.PI/2&&(this.camera.rot[0]+=s),this.camera.rot[1]+=r}__updateKeys(t){let e=t/160;(this.keys[81]||this.keys[16])&&(this.camera.pos[1]+=e),(this.keys[69]||this.keys[32])&&(this.camera.pos[1]-=e);let r=e*Math.sin(this.camera.rot[1]),s=e*Math.cos(this.camera.rot[1]);this.keys[87]&&(this.camera.pos[0]-=r,this.camera.pos[2]-=s),this.keys[83]&&(this.camera.pos[0]+=r,this.camera.pos[2]+=s),this.keys[65]&&(this.camera.pos[0]+=s,this.camera.pos[2]-=r),this.keys[68]&&(this.camera.pos[0]-=s,this.camera.pos[2]+=r)}},Screen:o,Screen2d:class{constructor(t={width:640,height:480,appendTo:document.body}){return this.canvas=document.createElement("canvas"),this.canvas.width=t.width,this.canvas.height=t.height,this.c=this.canvas.getContext("2d"),this.c.moveToD=t=>this.c.moveTo(t[0],t[1]),this.c.lineToD=t=>this.c.lineTo(t[0],t[1]),t.appendTo.appendChild(this.canvas),this}fullscreen(){this.canvas.width=innerWidth,this.canvas.height=innerHeight,window.onresize=()=>this.canvas.width=innerWidth,this.canvas.height=innerHeight;let t=document.createElement("style");return t.innerText="html,body{margin:0;overflow:hidden}",document.head.appendChild(t),this}square(t){return this.canvas.width=t,this.canvas.height=t,this}rect(t,e){return this.canvas.width=t,this.canvas.height=e,this}},Camera:s,objects:{Cube:class{constructor(t=[0,0,0]){let[e,r,s]=t;this.coords=t,this.verts=[[e-1,r-1,s-1],[e+1,r-1,s-1],[e+1,r+1,s-1],[e-1,r+1,s-1],[e-1,r-1,s+1],[e+1,r-1,s+1],[e+1,r+1,s+1],[e-1,r+1,s+1]],this.edges=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]],this.faces=[[0,1,2,0],[2,3,0,0],[1,5,6,1],[6,2,1,1],[4,5,1,2],[1,0,4,2],[6,5,4,3],[4,7,6,3],[7,4,0,4],[0,3,7,4],[2,6,7,5],[7,3,2,5]],this.colours=["#0ff","#0f0","#f0f","#00f","#ff0","#f00"]}}}};"function"==typeof define&&r.amdO?define([],(()=>l)):"object"==typeof exports?t.exports=l:window.mjsr=l}},e={};function r(s){if(e[s])return e[s].exports;var o=e[s]={id:s,loaded:!1,exports:{}};return t[s](o,o.exports,r),o.loaded=!0,o.exports}r.amdO={},r.hmd=t=>((t=Object.create(t)).children||(t.children=[]),Object.defineProperty(t,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+t.id)}}),t),r(658)})();