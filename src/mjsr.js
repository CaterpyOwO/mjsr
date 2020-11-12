"use strict";

import { Camera } from "./camera.js";
import { Renderer } from "./renderer.js";
import { Screen, Screen2d } from "./screen.js";

import { default as Cube } from "./objects/cube.js";

// import { shuffle } from "./math.js"

let mjsr = {
    Renderer,
    Screen,
    Screen2d,
    Camera,
    
    objects: {
        Cube,
    },
};

if (typeof define === 'function' && define.amd)
    define([], () => mjsr);
else if (typeof exports === 'object')
    module.exports = mjsr;
else
    window.mjsr = mjsr;
    