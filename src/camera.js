export class Camera {
    constructor(position = [0, 0, 0], rotation = [0, 0, 0], fov = 6) {
        this.pos = position;
        this.rot = rotation;

        this.fov = fov * 100;

        return this;
    }

    // projectVertex(coords, canvas) {
    //     let [x, y, z] = coords;

	// 	x -= this.pos[0];
	// 	y -= this.pos[1];
	// 	z -= this.pos[2];
	// 	[x, z] = this.rotateVertex2d([x, z], this.rot[1]);
	// 	[y, z] = this.rotateVertex2d([y, z], this.rot[0]);


	// 	let f = this.fov / Math.max(0.0, z);
	// 	x *= f;
    //     y *= f;

    //     let rect = canvas.getBoundingClientRect();
	// 	return [(x - rect.left) / canvas.width * 2, 0 - (y - rect.top) / canvas.height * 2, z / 100];
    // }

    projectVertex2d(coords, canvas) {
        let [x, y, z] = coords;

		x -= this.pos[0];
		y -= this.pos[1];
		z -= this.pos[2];
		[x, z] = this.rotateVertex2d([x, z], this.rot[1]);
		[y, z] = this.rotateVertex2d([y, z], this.rot[0]);


		let f = this.fov / Math.max(0.0, z);
		x *= f;
        y *= f;

        return [x + canvas.width / 2, y + canvas.height / 2, z];
    }

    rotateVertex2d(pos, rad) {
		let [x, y] = pos;

		let s = Math.sin(rad),
			c = Math.cos(rad);

		return [x * c - y * s, y * c + x * s];
    }
};