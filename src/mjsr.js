"use strict";

import { Camera } from "./core/camera.js";
import { Renderer } from "./core/renderer.js";
import { Screen } from "./core/screen.js";

import { Input } from "./input/input.js";

import { Geometry } from "./geometry/geometry.js";

const mjsr = {
	Renderer,
	Screen,
	Camera,
	Input,
	Geometry,
};

if (typeof define === "function" && define.amd) define([], () => mjsr);
else if (typeof exports === "object") module.exports = mjsr;
else window.mjsr = mjsr;
