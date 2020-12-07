"use strict";

import { Camera } from "./core/camera.js";
import { Renderer } from "./core/renderer.js";
import { Screen } from "./core/screen.js";

import { Input } from "./input/input.js";

import { Geometry } from "./geometry/geometry.js";

import { Material } from "./object/material.js";
import { Object3d } from "./object/object.js";

import { OBJLoader } from "./utility/objloader.js";

import * as constants from "./core/constants.js";

const mjsr = {
	...constants,

	Renderer,
	Screen,
	Camera,
	Input,
	Geometry,
	Material,
	Object3d,
	OBJLoader,
};

if (typeof define === "function" && define.amd) define([], () => mjsr);
else if (typeof exports === "object") module.exports = mjsr;
else window.mjsr = mjsr;
