const { Renderer, Screen, Camera, Input } = mjsr;
const r = new Renderer(
	new Screen().fullscreen(),
	new Camera([0, -2, -5], [0.4, 0, 0]),
	new Input.ModelRotate()
);

// prettier-ignore
class Donut {
	constructor(coords = [0, 0, 0], sides = 8, size = 0.5, hole = 1) {
		this.coords = coords;

		this.colours = ["#ca3", "#f6f"];

		this.verts = [];
		this.faces = [];

		this.primitive = "triangles";

		for (let j = 0; j <= sides - 1; j++) {
			let s = Math.sin(((2 * Math.PI) / sides) * j),
				c = Math.cos(((2 * Math.PI) / sides) * j);

			for (let i = 0; i <= sides - 1; i++) {
				this.verts[i + j * sides] = [hole + size * Math.cos((i * 2 * Math.PI) / sides), this.coords[1] + size * Math.sin((i * 2 * Math.PI) / sides), 0];

				let [a0, a1] = [0, 2];
				let [x, y] = [
					this.verts[i + j * sides][a0],
					this.verts[i + j * sides][a1],
				];

				let colour = this.verts[i + j * sides][1] < this.coords[1] - size / 4 ? 1 : 0;

				// this.verts[i + j * sides][3] = colour

				this.verts[i + j * sides][a0] = this.coords[0] + (x * c - y * s);
				this.verts[i + j * sides][a1] = this.coords[2] + (y * c + x * s);

				// this.edges.push((j !== sides - 1) ? [i + j * sides, i + (j + 1) * sides] : [i + j * sides, i]);
				// this.edges.push((i !== sides - 1) ? [i + j * sides, i + j * sides + 1] : [i + j * sides, j * sides]);


				if (j !== sides - 1 && i !== sides - 1) {
					this.faces.push([ i + (j + 1) * sides, i + j * sides + 1, i + j * sides, colour]);
					this.faces.push([ i + j * sides + 1, i + (j + 1) * sides, i + (j + 1) * sides + 1, colour]);
				} else if (j == sides - 1 && i !== sides - 1) {
					this.faces.push([i, i + j * sides + 1, i + j * sides, colour]);
					this.faces.push([i + j * sides + 1, i, i + 1, colour]);
				} else if (j !== sides - 1 && i == sides - 1) {
					this.faces.push([ i + (j + 1) * sides, j * sides, i + j * sides, colour]);
					this.faces.push([ i + (j + 1) * sides, (j + 1) * sides, j * sides, colour]);
				} else if (j == sides - 1 && i == sides - 1) {
					this.faces.push([i, j * sides, i + j * sides, colour]);
					this.faces.push([i, i - (sides - 1), j * sides, colour]);
				}
			}
		}
	}
}


let scene = [new Donut([0, 0, 0], 20)];
r.setup(scene);

function frame(now) {
	requestAnimationFrame(frame);

	r.draw();
	r.update(now);
}

requestAnimationFrame(frame);