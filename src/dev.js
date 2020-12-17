import { mjsr } from "./mjsr.js";
const { Renderer, Screen, Camera, Input } = mjsr;

const r = new Renderer(
    new Screen().fullscreen(),
    new Camera([0, -2, -8], [0, 0, 0]),
    new Input.FirstPerson(),
    { mono: false, lighting: mjsr.BLINN_PHONG, culling: false, posterization: true }
);

let teapot = new mjsr.OBJLoader(
    "./geometry/teapot.obj",
    mjsr.COUNTER_CLOCKWISE,
    new mjsr.Object3d([0, 0, 0], mjsr.TRIANGLES, true),
    new mjsr.Material("#f88", 64)
);

(async () => {
    let scene = [await teapot.load()];
    r.setup(scene);

    function frame(now) {
        r.draw();
        r.update(now);

        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
})();