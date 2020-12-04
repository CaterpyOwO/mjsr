(()=>{"use strict";var __webpack_modules__={548:(e,t,r)=>{let i="undefined"!=typeof Float32Array?Float32Array:Array;function s(){let e=new i(16);return i!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function n(e,t,r){let i=Math.sin(r),s=Math.cos(r),n=t[0],o=t[1],a=t[2],h=t[3],l=t[8],c=t[9],u=t[10],m=t[11];return t!==e&&(e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=n*s-l*i,e[1]=o*s-c*i,e[2]=a*s-u*i,e[3]=h*s-m*i,e[8]=n*i+l*s,e[9]=o*i+c*s,e[10]=a*i+u*s,e[11]=h*i+m*s,e}Math.random,Math.PI,Math.hypot||(Math.hypot=function(){for(var e=0,t=arguments.length;t--;)e+=arguments[t]*arguments[t];return Math.sqrt(e)});class o{constructor(e=[0,0,0],t=[0,0,0],r=45){return this.pos=e,this.rot=t,this.fov=r,this.model=s(),this.view=s(),this.projection=s(),this}vp(e){let t=function(e,t,r,i,s){let n,o=1/Math.tan(t/2);return e[0]=o/r,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=o,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,n=1/-99.9,e[10]=100.1*n,e[14]=20*n,e}(s(),this.fov*(Math.PI/180),e.width/e.height),r=s();return function(e,t,r){let i=Math.sin(r),s=Math.cos(r),n=t[4],o=t[5],a=t[6],h=t[7],l=t[8],c=t[9],u=t[10],m=t[11];t!==e&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[4]=n*s+l*i,e[5]=o*s+c*i,e[6]=a*s+u*i,e[7]=h*s+m*i,e[8]=l*s-n*i,e[9]=c*s-o*i,e[10]=u*s-a*i,e[11]=m*s-h*i}(r,r,this.rot[0]),n(r,r,this.rot[1]),function(e,t,r){let i,s,n,o,a,h,l,c,u,m,d,p,f=r[0],v=r[1],g=r[2];t===e?(e[12]=t[0]*f+t[4]*v+t[8]*g+t[12],e[13]=t[1]*f+t[5]*v+t[9]*g+t[13],e[14]=t[2]*f+t[6]*v+t[10]*g+t[14],e[15]=t[3]*f+t[7]*v+t[11]*g+t[15]):(i=t[0],s=t[1],n=t[2],o=t[3],a=t[4],h=t[5],l=t[6],c=t[7],u=t[8],m=t[9],d=t[10],p=t[11],e[0]=i,e[1]=s,e[2]=n,e[3]=o,e[4]=a,e[5]=h,e[6]=l,e[7]=c,e[8]=u,e[9]=m,e[10]=d,e[11]=p,e[12]=i*f+a*v+u*g+t[12],e[13]=s*f+h*v+m*g+t[13],e[14]=n*f+l*v+d*g+t[14],e[15]=o*f+c*v+p*g+t[15])}(r,r,this.pos),function(e,t,r){let i=t[0],s=t[1],n=t[2],o=t[3],a=t[4],h=t[5],l=t[6],c=t[7],u=t[8],m=t[9],d=t[10],p=t[11],f=t[12],v=t[13],g=t[14],_=t[15],w=r[0],b=r[1],y=r[2],E=r[3];return e[0]=w*i+b*a+y*u+E*f,e[1]=w*s+b*h+y*m+E*v,e[2]=w*n+b*l+y*d+E*g,e[3]=w*o+b*c+y*p+E*_,w=r[4],b=r[5],y=r[6],E=r[7],e[4]=w*i+b*a+y*u+E*f,e[5]=w*s+b*h+y*m+E*v,e[6]=w*n+b*l+y*d+E*g,e[7]=w*o+b*c+y*p+E*_,w=r[8],b=r[9],y=r[10],E=r[11],e[8]=w*i+b*a+y*u+E*f,e[9]=w*s+b*h+y*m+E*v,e[10]=w*n+b*l+y*d+E*g,e[11]=w*o+b*c+y*p+E*_,w=r[12],b=r[13],y=r[14],E=r[15],e[12]=w*i+b*a+y*u+E*f,e[13]=w*s+b*h+y*m+E*v,e[14]=w*n+b*l+y*d+E*g,e[15]=w*o+b*c+y*p+E*_,e}(s(),t,r)}modelit(){let e=this.model;return function(e,t){let r=t[0],i=t[1],s=t[2],n=t[3],o=t[4],a=t[5],h=t[6],l=t[7],c=t[8],u=t[9],m=t[10],d=t[11],p=t[12],f=t[13],v=t[14],g=t[15],_=r*a-i*o,w=r*h-s*o,b=r*l-n*o,y=i*h-s*a,E=i*l-n*a,k=s*l-n*h,L=c*f-u*p,P=c*v-m*p,A=c*g-d*p,x=u*v-m*f,M=u*g-d*f,C=m*g-d*v,R=_*C-w*M+b*x+y*A-E*P+k*L;R&&(R=1/R,e[0]=(a*C-h*M+l*x)*R,e[1]=(s*M-i*C-n*x)*R,e[2]=(f*k-v*E+g*y)*R,e[3]=(m*E-u*k-d*y)*R,e[4]=(h*A-o*C-l*P)*R,e[5]=(r*C-s*A+n*P)*R,e[6]=(v*b-p*k-g*w)*R,e[7]=(c*k-m*b+d*w)*R,e[8]=(o*M-a*A+l*L)*R,e[9]=(i*A-r*M-n*L)*R,e[10]=(p*E-f*b+g*_)*R,e[11]=(u*b-c*E-d*_)*R,e[12]=(a*P-o*x-h*L)*R,e[13]=(r*x-i*P+s*L)*R,e[14]=(f*w-p*y-v*_)*R,e[15]=(c*y-u*w+m*_)*R)}(e,e),function(e,t){if(e===t){let r=t[1],i=t[2],s=t[3],n=t[6],o=t[7],a=t[11];e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=r,e[6]=t[9],e[7]=t[13],e[8]=i,e[9]=n,e[11]=t[14],e[12]=s,e[13]=o,e[14]=a}else e[0]=t[0],e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=t[1],e[5]=t[5],e[6]=t[9],e[7]=t[13],e[8]=t[2],e[9]=t[6],e[10]=t[10],e[11]=t[14],e[12]=t[3],e[13]=t[7],e[14]=t[11],e[15]=t[15]}(e,e),e}}class a{constructor(e={width:640,height:480},t=document.body,r){return r instanceof HTMLCanvasElement?this.canvas=r:this.canvas=document.createElement("canvas"),this.canvas.width=e.width,this.canvas.height=e.height,this.gl=this.canvas.getContext("webgl"),this.parent=t,t instanceof HTMLElement&&t.appendChild(this.canvas),this}fullscreen(){this.canvas.width=innerWidth,this.canvas.height=innerHeight,window.addEventListener("resize",(()=>{this.canvas.width=innerWidth,this.canvas.height=innerHeight}));let e=document.createElement("style");return e.innerText="html,body{margin:0;overflow:hidden}",document.head.appendChild(e),this}fillParent(){return this.canvas.width=this.parent.clientWidth,this.canvas.height=this.parent.clientHeight,window.addEventListener("resize",(()=>{this.canvas.width=this.parent.clientWidth,this.canvas.height=this.parent.clientHeight})),this}square(e){return this.canvas.width=e,this.canvas.height=e,this}rect(e,t){return this.canvas.width=e,this.canvas.height=t,this}}const h={None:class{update(){}setAttributes(){}setupMovement(){}},FirstPerson:class{constructor(){this.keys=[]}setAttributes(e,t){this.screen=e,this.camera=t}setupMovement(){let{canvas:e}=this.screen;window.addEventListener("keydown",(e=>this.keys[e.key.toLowerCase()]=!0)),window.addEventListener("keyup",(e=>this.keys[e.key.toLowerCase()]=!1));let t=e=>Math.abs(e.movementX)>50||Math.abs(e.movementY)>50?void 0:this.mouseRotation([e.movementX,e.movementY]);e.requestPointerLock=e.requestPointerLock||e.mozRequestPointerLock,document.exitPointerLock=document.exitPointerLock||document.mozExitPointerLock,e.onclick=()=>e.requestPointerLock();let r=()=>{document.pointerLockElement===e||document.mozPointerLockElement===e?e.onmousemove=t:e.onmousemove=null};document.addEventListener("pointerlockchange",r),document.addEventListener("mozpointerlockchange",r)}mouseRotation(e,t=3){let[r,i]=e;r/=t*=100,i/=t,this.camera.rot[0]+i<Math.PI/2&&this.camera.rot[0]+i>-Math.PI/2&&(this.camera.rot[0]+=i),this.camera.rot[1]+=r}update(e){let{canvas:t}=this.screen;if(document.pointerLockElement==t||document.mozPointerLockElement==t){let t=e/160;this.keys.q&&(this.camera.pos[1]+=t),this.keys.e&&(this.camera.pos[1]-=t);let r=t*Math.sin(this.camera.rot[1]),i=t*Math.cos(this.camera.rot[1]);this.keys.w&&(this.camera.pos[0]+=r,this.camera.pos[2]-=i),this.keys.s&&(this.camera.pos[0]-=r,this.camera.pos[2]+=i),this.keys.a&&(this.camera.pos[0]-=i,this.camera.pos[2]-=r),this.keys.d&&(this.camera.pos[0]+=i,this.camera.pos[2]+=r)}}},ModelRotate:class{constructor(){this.keys=[]}setAttributes(e,t){this.screen=e,this.camera=t}setupMovement(){let{canvas:e}=this.screen,t=[0,0];const r=e=>this.mouseRotation([e.movementX,e.movementY]);e.onmousedown=()=>e.onmousemove=r,window.onmouseup=()=>e.onmousemove=null,e.addEventListener("touchstart",(e=>t=[e.touches[0].screenX,e.touches[0].screenY]),{passive:!0}),e.addEventListener("touchmove",(e=>(this.mouseRotation([-(t[0]-e.touches[0].screenX),t[1]-e.touches[0].screenY]),t=[e.touches[0].screenX,e.touches[0].screenY])),{passive:!0}),e.addEventListener("touchend",(()=>(e.ontouchmove=null,t=[0,0])))}mouseRotation(e){n(this.camera.model,this.camera.model,.01*e[0])}update(){}}};function l(e){let t=[e[1][0]-e[0][0],e[1][1]-e[0][1],e[1][2]-e[0][2]],r=[e[2][0]-e[0][0],e[2][1]-e[0][1],e[2][2]-e[0][2]];return function(e){let t=Math.sqrt(e[0]**2+e[1]**2+e[2]**2);return[e[0]/=t,e[1]/=t,e[2]/=t]}([t[1]*r[2]-t[2]*r[1],t[2]*r[0]-t[0]*r[2],t[0]*r[1]-t[1]*r[0]])}function c(e,t,r){return Math.max(Math.min(e,r),t)}function u(e,t){if(e=e.trim(),!t)if(/rgb\([^\)]*\)/.test(e))t="rgb";else{if(!/(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b/i.test(e))throw new Error(`${e} is not a valid colour.`);t="hex"}switch(t){case"hex":return[...(e=3==(e=e.substr(1)).length?e.split("").reduce(((e,t)=>e.push(t+t)&&e),[]):e.match(/.{1,2}/g)).map((e=>c(parseInt(e,16)/255,0,1))),1];case"rgb":return[...(e=(e=e.substr(4).slice(0,-1)).split(",")).map((e=>c(parseInt(e)/255,0,1))),1];default:throw new Error(`${t} is not a valid colour type.`)}}class m{constructor(e){return this.gl=e,this.shaders=[],this.glprogram=null,this}frag(e){this.shader(e,this.gl.FRAGMENT_SHADER)}vert(e){this.shader(e,this.gl.VERTEX_SHADER)}shader(e,t){if(e=e.raw?e.raw.join(""):e,!t){let r=new RegExp("// ?vert(ex)?( |_|-)shader","i"),i=new RegExp("// ?frag(ment)?( |_|-)shader","i");if(r.test(e))t=this.gl.VERTEX_SHADER;else{if(!i.test(e))throw new Error("No shader type found.");t=this.gl.FRAGMENT_SHADER}}let r=this.gl.createShader(t);if(this.gl.shaderSource(r,e),this.gl.compileShader(r),this.gl.getShaderParameter(r,this.gl.COMPILE_STATUS))return this.shaders.push(r),r;console.error(`Error in shader:\n${e.split(/\n/).map(((e,t)=>`${t+1}: ${e}`)).join("\n")}`);let i=new Error(this.gl.getShaderInfoLog(r));throw this.gl.deleteShader(r),i}program(...e){if(0==e.length&&(e=this.shaders),0==e.length)throw new Error("No shaders were supplied.");let t=this.gl.createProgram();for(let r of e)this.gl.attachShader(t,r);if(this.gl.linkProgram(t),this.gl.getProgramParameter(t,this.gl.LINK_STATUS))return this.glprogram=t,t;let r=new Error(this.gl.getProgramInfoLog(t));throw this.gl.deleteProgram(t),r}buffers(e,t){if(0==e.length)throw new Error("No buffers were supplied.");for(let r in e){let i=e[r];this.buffer32f(i,this.gl.ARRAY_BUFFER);let s=this.gl.getAttribLocation(this.glprogram,r);this.gl.enableVertexAttribArray(s),t[r]?this.gl.vertexAttribPointer(s,t[r],this.gl.FLOAT,!1,0,0):this.gl.vertexAttribPointer(s,3,this.gl.FLOAT,!1,0,0)}}buffer32f(e,t){let r=this._bufferInit(t);return this.gl.bufferData(t,new Float32Array(e),this.gl.STATIC_DRAW),r}buffer16u(e,t){let r=this._bufferInit(t);return this.gl.bufferData(t,new Uint16Array(e),this.gl.STATIC_DRAW),r}buffer32u(e,t){let r=this._bufferInit(t);return this.gl.bufferData(t,new Uint32Array(e),this.gl.STATIC_DRAW),r}_bufferInit(e){const t=this.gl.createBuffer();return this.gl.bindBuffer(e,t),t}}var d=r(930);function p(e={primitive:2,lighting:!0}){return(0,d.d)("\n    precision mediump float;\n\n    attribute vec4 position;\n    attribute vec4 colour;\n    attribute vec3 normal;\n    attribute float shinyness;\n\n    varying vec4 v_colour;\n    varying vec3 v_normal;\n    varying float v_shinyness;\n\n\tvarying vec3 v_fragPos, v_viewPos;\n\n    uniform mat4 u_vp, u_model, u_modelit;\n    uniform vec3 u_pos;\n\n    void main() {\n        v_colour = colour;\n        v_shinyness = shinyness;\n\n        #if (options.primitive == 2 && options.mode !== 0) \n            v_fragPos = vec3(u_model * position);\n            v_viewPos = u_pos;\n            v_normal = mat3(u_modelit) * normal;\n        #endif\n\n        #if (options.primitive == 0)\n            gl_PointSize = 5.0;\n        #endif\n\n        mat4 mvp = u_vp * u_model;\n        gl_Position = mvp * position;\n    }",e)}function f(e={primitive:2,mono:!0,mode:0}){return(0,d.d)("\n\tprecision mediump float;\n\n\tvarying vec3 v_normal;\n\tvarying vec4 v_colour;\n\tvarying float v_shinyness;\n\n\t#if (options.mode !== 0)\n\t\tvarying vec3 v_fragPos, v_viewPos;\n\t\tvec3 light = vec3(0.0, -2.0, -5.0);\n\t#endif\n\n\tvoid main() {\n\t\t#if options.mono\n\t\t\t\n    float lum = (v_colour.r + v_colour.g + v_colour.b) / 3.0;\n    vec2 monoColour = vec2(lum, v_colour.a);\n\n    gl_FragColor = monoColour.xxxy;\n\n\t\t#else\n\t\t\tgl_FragColor = v_colour;\n\t\t#endif\n\n\t\t#if (options.mode !== 0)\n\t\t\t\n    vec3 lightColour = vec3(1.0, 1.0, 1.0);\n\n    vec3 normal = normalize(v_normal);\n    vec3 lightd = normalize(light - v_fragPos);\n\n    // specular\n    float strength = 0.3;\n    vec3 viewd = normalize(v_viewPos - v_fragPos);\n    vec3 reflectd = reflect(-lightd, normal);\n\n    #if (options.mode == 2)\n        vec3 halfwayd = normalize(lightd + viewd);\n\n        float sp = pow(max(dot(normal, halfwayd), 0.0), v_shinyness);\n        vec3 specular = lightColour * sp;\n    #else\n        float sp = pow(max(dot(viewd, reflectd), 0.0), v_shinyness);\n        vec3 specular = strength * sp * lightColour; \n    #endif\n\n    // diffuse\n    float df = max(dot(normal, lightd), 0.0);\n    vec3 diffuse = df * lightColour;\n\n    // ambient\n    vec3 ambient = 0.1 * lightColour;\n\n\n    gl_FragColor = vec4((ambient + diffuse + specular) * gl_FragColor.rgb, gl_FragColor.a);\n\n\t\t#endif\n\t}",e)}e=r.hmd(e);const v={Renderer:class{constructor(e=new a,t=new o,r=new h.None){return this.screen=e,this.camera=t,r.setAttributes(e,t),this.input=r,this.dt=0,this.last=0,this}setup(e){this.scene=e,this.meshes=[],this.primitives=new Set,this.shaders={};for(let e of this.scene){if("object"!=typeof e)throw new Error("Invalid object in scene.");const t={0:["coords","verts","colours","primitive"],1:["coords","verts","edges","colours","primitive"],2:["coords","verts","faces","colours","primitive"]},r=["points","lines","triangles"];let i=-1;if("string"!=typeof e.primitive||void 0===r.includes(e.primitive))throw new Error("No primitive type supplied.");i=r.indexOf(e.primitive);for(let r of t[i])if(void 0===e[r]){if("colours"==r&&e.materials)continue;throw new Error(`Object doesn't have required property ${r}.`)}let s={position:[],colour:[],normal:[],shinyness:[],primitive:i};switch(i){case 0:for(let t of e.verts){let r=u(e.colours[t[3]]);s.position.push(t[0],t[1],t[2]),s.colour.push(...r)}break;case 1:for(let t of e.edges){let r=u(e.colours[t[2]]);s.position.push(...e.verts[t[1]],...e.verts[t[0]]),s.colour.push(...r,...r)}break;case 2:for(let t of e.faces){let r=l([e.verts[t[0]],e.verts[t[1]],e.verts[t[2]]]),i=[],n=32;e.materials?(i=e.materials[t[3]].colour,n=e.materials[t[3]].shinyness):i=u(e.colours[t[3]]),s.position.push(...e.verts[t[2]],...e.verts[t[1]],...e.verts[t[0]]),s.colour.push(...i,...i,...i),s.shinyness.push(n,n,n),s.normal.push(...r,...r,...r)}break;default:throw new Error("Invalid primitive")}this.primitives.add(i),this.meshes.push(s)}const{gl:t}=this.screen;for(let e of this.primitives){let r=new m(t),i=2==e?2:0;r.vert(p({mode:i,primitive:e})),r.frag(f({mode:i,primitive:e,mono:!1})),r.program(),this.shaders[e]=r}t.clearColor(1,1,1,1),t.enable(t.DEPTH_TEST),t.enable(t.CULL_FACE),this.input.setupMovement()}draw(){const{gl:e}=this.screen;let t=[e.POINTS,e.LINES,e.TRIANGLES];e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);for(let t in this.shaders){let r=this.shaders[t];e.useProgram(r.glprogram),e.uniform3fv(e.getUniformLocation(r.glprogram,"u_pos"),this.camera.pos),e.uniform2fv(e.getUniformLocation(r.glprogram,"u_resolution"),[e.drawingBufferWidth,e.drawingBufferHeight]),e.uniformMatrix4fv(e.getUniformLocation(r.glprogram,"u_modelit"),!1,this.camera.modelit()),e.uniformMatrix4fv(e.getUniformLocation(r.glprogram,"u_model"),!1,this.camera.model),e.uniformMatrix4fv(e.getUniformLocation(r.glprogram,"u_vp"),!1,this.camera.vp(this.screen.canvas)),e.useProgram(null)}for(let r of this.meshes){const i=r.primitive,s=this.shaders[i];e.useProgram(s.glprogram);let n={position:r.position,colour:r.colour,shinyness:r.shinyness};2==r.primitive&&(n.normal=r.normal),s.buffers(n,{colour:4,shinyness:1}),e.drawArrays(t[i],0,r.position.length/(i+1)),e.useProgram(null)}}update(e){this.dt=this.last-e,this.last=e,this.input.update(this.dt)}},Screen:a,Camera:o,Input:h,Geometry:{Cube:class{constructor(e=[0,0,0]){let[t,r,i]=e;this.coords=e,this.primitive="triangles",this.verts=[[t-1,r-1,i-1],[t+1,r-1,i-1],[t+1,r+1,i-1],[t-1,r+1,i-1],[t-1,r-1,i+1],[t+1,r-1,i+1],[t+1,r+1,i+1],[t-1,r+1,i+1]],this.edges=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]],this.faces=[[0,1,2,0],[2,3,0,0],[1,5,6,1],[6,2,1,1],[4,5,1,2],[1,0,4,2],[6,5,4,3],[4,7,6,3],[7,4,0,4],[0,3,7,4],[2,6,7,5],[7,3,2,5]],this.colours=["#0ff","#0f0","#f0f","#00f","#ff0","#f00"]}},Plane:class{constructor(e=[0,0,0]){this.coords=e;let[t,r,i]=e;this.primitive="triangles",this.verts=[[t-1,r,i-1],[t-1,r,i+1],[t+1,r,i+1],[t+1,r,i-1]],this.faces=[[0,1,2,0],[2,3,0,0],[2,1,0,1],[0,3,2,1]],this.colours=["#faf","#aff"]}}},Material:class{constructor(e,t=32){if("string"==typeof e)this.colour=u(e);else{if(!Array.isArray(e))throw new Error(`${e} is not a valid colour.`);this.colour=e}this.shinyness=t}},Object3d:class{constructor(e,t,r=!1){switch(this.coords=e,this.primitive=t,this.verts=[],this.edges=[],this.faces=[],t){case"triangles":r?this.materials=[]:this.colours=[];break;case"lines":case"points":this.colours=[];break;default:throw new Error(`The primitive ${t} is not a valid primitive`)}}}};"function"==typeof define&&r.amdO?define([],(()=>v)):"object"==typeof exports?e.exports=v:window.mjsr=v},930:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function preprocess(source,options){let lines=source.split(/\n/),lineCount=lines.length,depths={},output="";return traverse(),output.trim();function traverse(currentLine=0,condition=!0,depth=0){for(;currentLine<lineCount;){let line=lines[currentLine];if(line.trim().startsWith("#"))switch(line.trim().substr(1).split(/\s/)[0]){case"if":depths[depth]=condition,currentLine=traverse(currentLine+1,eval(line.trim().substr(3))&&depths[depth],depth+1);break;case"else":currentLine=traverse(currentLine+1,!condition&&depths[depth-1],depth);break;case"endif":currentLine=traverse(currentLine+1,depths[depth-1],depth-1)}else condition&&(output+=`${line}\n`);currentLine++}return currentLine}}__webpack_require__.d(__webpack_exports__,{d:()=>preprocess})}},__webpack_module_cache__={};function __webpack_require__(e){if(__webpack_module_cache__[e])return __webpack_module_cache__[e].exports;var t=__webpack_module_cache__[e]={id:e,loaded:!1,exports:{}};return __webpack_modules__[e](t,t.exports,__webpack_require__),t.loaded=!0,t.exports}__webpack_require__.amdO={},__webpack_require__.d=(e,t)=>{for(var r in t)__webpack_require__.o(t,r)&&!__webpack_require__.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},__webpack_require__.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),__webpack_require__(548)})();