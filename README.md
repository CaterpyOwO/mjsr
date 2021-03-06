# mjsr - Minimalistic JavaScript Renderer

[![Language grade: JavaScript][lgtm]](https://lgtm.com/projects/g/CaterpyOwO/mjsr/context:javascript)
[![Github Release][release]](https://github.com/CaterpyOwO/mjsr/releases/latest)
[![Github License][license]](https://github.com/CaterpyOwO/mjsr/blob/master/LICENSE)
![CodeQL](https://github.com/CaterpyOwO/mjsr/workflows/CodeQL/badge.svg)

[lgtm]: https://img.shields.io/lgtm/grade/javascript/g/CaterpyOwO/mjsr.svg?logo=lgtm&logoWidth=18
[license]: https://img.shields.io/github/license/CaterpyOwO/mjsr
[release]: https://img.shields.io/github/v/release/CaterpyOwO/mjsr

`mjsr` is a simple, lightweight 3d library for JavaScript.

## Installation

Using a CDN:

```html
<script src="https://cdn.jsdelivr.net/gh/caterpyowo/mjsr@v1.0.0/dist/mjsr.min.js"></script>
```

Using a local copy (See the [releases tab](https://github.com/CaterpyOwO/mjsr/releases/latest) to find the latest version).

```html
<script src="./mjsr.min.js"></script>
```

## Usage

```js
const r = new mjsr.Renderer(
	new mjsr.Screen().fullscreen(),
	new mjsr.Camera([0, 0, -7]),
	new mjsr.Input.FirstPerson()
);

let scene = [new mjsr.Geometry.Cube([0, 0, 0])];
r.setup(scene);

function frame(now) {
	requestAnimationFrame(frame);

	r.draw();
	r.update(now);
}

requestAnimationFrame(frame);
```

## Documentation

Visit [the wiki](https://github.com/CaterpyOwO/mjsr/wiki) for documentation.

More examples of usage:

-   [`cube`](https://caterpyowo.github.io/mjsr/examples/cube)
-   [`sheep`](https://caterpyowo.github.io/mjsr/examples/sheep)
-   [`teapot`](https://caterpyowo.github.io/mjsr/examples/teapot)

## License

[MIT](https://choosealicense.com/licenses/mit/)
