const { Renderer, Screen, Camera, Input } = mjsr;

const r = new Renderer(
	new Screen().fullscreen(),
	new Camera([0, -3, -9], [0.3, 0, 0]),
	new Input.None(),
	{ culling: false }
);

let teapot = new mjsr.OBJLoader("./teapot.obj", mjsr.CLOCKWISE, new mjsr.Material("#aaa", 123));

teapot.load().then(obj => {
	teapot = obj;
	let scene = [teapot];
	r.setup(scene);

	requestAnimationFrame(frame);
});

function frame(now) {
	r.draw();
	r.update(now);

	teapot.rotateX(5e-4 * Date.now()).rotateY(7e-4 * Date.now());

	requestAnimationFrame(frame);
}
