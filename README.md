# Minimalistic JavaScript Renderer

This is a minimalistic WebGL/Canvas2d 3d renderer.
Designed with simplicity in mind.

To use it download `mjsr.js` from the releases tab, or build it yourself with webpack using `npm i && npm run build`. Then include it in your html file with:
```html
<script src="./path/to/mjsr.js"></script>
```

You can also use the `serve.js` file supplied to host a HTTP server on port 8080, to use mjsr without need of bundling it with webpack.

## Example

This example will result in a fullscreen document with a cube in the middle of the screen. You can lock the cursor by pressing on it, then you can move around with `WASD` keys, and use your mouse for rotating.

```js
const { Renderer, Screen, Camera } = mjsr;
const r = new Renderer(new Screen().fullscreen(), new Camera([0,0,-7]));

let scene = [new mjsr.objects.Cube([0,0,0])];
r.setup(scene);

function frame(now) {
	requestAnimationFrame(frame);

	r.draw();
	r.update(now);
}

requestAnimationFrame(frame);
```
All objects in the `scene` array should have at least four properties:
* `coords` - The coordinatese of the object in model space. Should be an array with three elements: `[x, y, z]`
* `verts` - The vertices of the object in model space. Should be an array of arrays with three elements: `[x, y, z]`
* `faces ` - The faces of the object. Should be an array of arrays with four elements: `[i1, i2, i3, c]`, where 
  - `i1`, `i2`, and `i3` are the indices of the vertices of the triangle.
  - `c` is the index of the colour in the `colours` array.
* `colours` - The colours of the faces of the object. Should be an array of HEX colours.

## An example object
This is an example object in the scene. It is taken directly from `src/objects/cube.js`, and is shipped with mjsr as `mjsr.objects.Cube`
```js
class Cube {
	constructor(coords = [0,0,0]) {
		let [x, y, z] = coords;

		this.coords = coords

		this.verts = [
			[x - 1, y - 1, z - 1],
			[x + 1, y - 1, z - 1],
			[x + 1, y + 1, z - 1],
			[x - 1, y + 1, z - 1],
			[x - 1, y - 1, z + 1],
			[x + 1, y - 1, z + 1],
			[x + 1, y + 1, z + 1],
			[x - 1, y + 1, z + 1],
		];

		this.faces = [
			[0, 1, 2, 0],
			[2, 3, 0, 0],

			[1, 5, 6, 1],
			[6, 2, 1, 1],

			[4, 5, 1, 2],
			[1, 0, 4, 2],

			[6, 5, 4, 3],
			[4, 7, 6, 3],

			[7, 4, 0, 4],
			[0, 3, 7, 4],

			[2, 6, 7, 5],
			[7, 3, 2, 5],
		];

		this.colours = ["#0ff", "#0f0", "#f0f", "#00f", "#ff0", "#f00"];
	}
}
```
