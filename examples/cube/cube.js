const { Renderer, Screen, Camera, Input } = mjsr;
const r = new Renderer(new Screen().fullscreen(), new Camera([0, 0, -7]), new Input.FirstPerson());

let scene = [new mjsr.Geometry.Cube([0, 0, 0])];
r.setup(scene);

function frame(now) {
	requestAnimationFrame(frame);

	r.draw();
	r.update(now);
}

requestAnimationFrame(frame);
