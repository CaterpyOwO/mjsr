# Minimalistic JavaScript Renderer

This is a minimalistic WebGL/Canvas2d 3d renderer.
Designed with simplicity in mind.

To use it download `mjsr.js` from the releases tab, or build it yourself with webpack using `npm i && npm run build`. Then include it in your html file with:

```html
<script src="./mjsr.js"></script>
```

You can also use the `serve.js` file supplied to host a HTTP server on port 8080, to use mjsr without need of bundling it with webpack.

## Usage

See the [`examples`](examples)folder for examples of usage.

## Scenes

All objects in the `scene` array should have at these four properties:

-   `coords` - The coordinates of the object in model space. Should be an array with three elements: `[x, y, z]`
-   `primitive` - The primitive type which should be drawn: "triangles" | "lines" | "points"
-   `verts` - The vertices of the object in model space. Should be an array of arrays with three elements: `[x, y, z]`
-   `colours` - The colours of the faces of the object. Should be an array of HEX colours.

In case of `triangles` you should also include:

-   `faces ` - The faces of the object. Should be an array of arrays with four elements: `[i1, i2, i3, c]`, where
    -   `i1`, `i2`, and `i3` are the indices of the vertices of the triangle.
    -   `c` is the index of the colour in the `colours` array.

In case of `lines` you should include:

-   `edges ` - The edges of the object. Should be an array of arrays with three elements: `[i1, i2, c]`, where
    -   `i1`, `i2` are the indices of the vertices of the line.
    -   `c` is the index of the colour in the `colours` array.

While in case of `points` no other properties are required, although each element of the `verts` array should have an additional property:

-   `verts` - The vertices of the object in model space. Should be an array of arrays with three elements: `[x, y, z, c]`, where
    -   `x`, `y`, and `z` are the coordinates of the vertex.
    -   `c` is the index of the colour in the `colours` array.

## Objects

This is an example object in the scene. It is taken directly from [`src/geometry/cube.js`](src/geometry/cube.js), and is shipped with mjsr as `mjsr.Geometry.Cube`

```js
class Cube {
	constructor(coords = [0, 0, 0]) {
		let [x, y, z] = coords;

		this.coords = coords;

		this.primitive = "triangles";

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
