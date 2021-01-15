const { Renderer, Screen, Camera, Input } = mjsr;

const r = new Renderer(
	new Screen({}).fullscreen(),
	new Camera([0, -2, -5], [0.4, 0, 0]),
	new Input.FirstPerson(),
	{ mono: false, lighting: mjsr.BLINN_PHONG }
);

let teapot = new mjsr.OBJLoader("./teapot.obj", mjsr.COUNTER_CLOCKWISE);
teapot.load().then((tp) => {
	let scene = [tp];
	console.log(tp);
	r.setup(scene);

	function frame(now) {
		r.draw();
		r.update(now);

		requestAnimationFrame(frame);
	}

	requestAnimationFrame(frame);
});
