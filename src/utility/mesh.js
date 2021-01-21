import { crossProduct } from "./math.js";
import { Material } from "../object/material.js";

export function generateMesh(object) {
	const primitives = ["points", "lines", "triangles"];
	let primitive = -1;

	const props = {
		0: ["verts", "colours", "primitive"],
		1: ["verts", "edges", "colours", "primitive"],
		2: ["verts", "faces", "colours", "primitive"],
	};

	if (typeof object.primitive === "string" && primitives.includes(object.primitive) !== undefined)
		primitive = primitives.indexOf(object.primitive);
	else if (typeof object.primitive == "number") primitive = object.primitive;
	else throw new Error("No primitive type supplied.");

	for (let prop of props[primitive]) {
		if (object[prop] === undefined) {
			if (prop == "colours" && object["materials"]) continue;
			throw new Error(`Object doesn't have required property ${prop}.`);
		}
	}

	let meshes = [];

	if (object.materials) {
		for (let m in object.materials) {
			meshes[m] = {
				material: object.materials[m],
				data: {
					position: [],
					normal: [],
					primitive,
				},
			};
		}
	} else {
		for (let c in object.colours) {
			meshes[c] = {
				material: new Material(object.colours[c]),
				data: {
					position: [],
					normal: [],
					primitive,
				},
			};
		}
	}
	try {
		switch (primitive) {
			case 0:
				for (let vert of object.verts)
					meshes[vert[3]].data.position.push(vert[0], vert[1], vert[2]);

				break;
			case 1:
				for (let edge of object.edges) {
					meshes[edge[2]].data.position.push(
						...object.verts[edge[1]],
						...object.verts[edge[0]]
					);
				}
				break;
			case 2:
				for (let triangle of object.faces) {
					let cross = crossProduct([
						object.verts[triangle[0]],
						object.verts[triangle[1]],
						object.verts[triangle[2]],
					]);

					meshes[triangle[3]].data.position.push(
						...object.verts[triangle[2]],
						...object.verts[triangle[1]],
						...object.verts[triangle[0]]
					);

					meshes[triangle[3]].data.normal.push(...cross, ...cross, ...cross);
				}
				break;
			default:
				throw new Error("Invalid primitive");
		}
	} catch (error) {
		if (error instanceof TypeError)
			throw new Error("There was an unexpected error while parsing the mesh.");
		else throw error;
	}
	return meshes;
}
