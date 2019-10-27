const opengl = new OpenGL("#window");
opengl.setClearColor(0, 0, 0, 1);

const gl = opengl.getContext();
window.onresize = opengl.updateWindowSize;
const input = new Input();
document.addEventListener('keyup', input.keyUpHandle);
document.addEventListener('keydown', input.keyDownHandle);

const projection = new Perspective(
	45 * Math.PI / 180,
	gl.canvas.clientWidth / gl.canvas.clientHeight,
	0.1, 100
);

const camera = new Camera();

//  QUAD
const vsSource = `
	attribute vec4 aPosition;
	attribute vec4 aColor;
	uniform mat4 uProjectionMatrix;
	uniform mat4 uViewMatrix;
	uniform mat4 uModelMatrix;
	varying lowp vec4 vColor;
	void main(void) {
		gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * aPosition;
		vColor = aColor;
	}`;

const fsSource = `
	varying lowp vec4 vColor;
	void main(void) {
		gl_FragColor = vColor;
	}`;

const shader = new Shader(
	gl, vsSource, fsSource
);

const vertices = [
	/* position */      /* colour */
	1.0, 1.0, 0,   /**/ 1, 1, 1, 1,
	-1.0, 1.0, 0,  /**/ 1, 0, 0, 1,
	1.0, -1.0, 0,  /**/ 0, 1, 0, 1,
	-1.0, -1.0, 0, /**/ 0, 0, 1, 1
];
const mesh = new Mesh(opengl, shader, vertices);

const entity = new Entity(shader, mesh);
entity.setPosition(0, 0, -50);

const ctrl2d = new Controls2D("w", "a", "s", "d", 10);

function update(ts) {

	const move = ctrl2d.getMoveVector(ts);

	entity.setPosition(
		entity.position[0] + move[0],
		entity.position[1] + move[1],
		entity.position[2]
	);

	opengl.clear();
	opengl.drawEn(projection, camera, entity);
}

opengl.setUpdate(update);
