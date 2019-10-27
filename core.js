const opengl = new OpenGL("#window");

const input = new Input(opengl);
document.addEventListener('keyup', input.keyUpHandle);
document.addEventListener('keydown', input.keyDownHandle);
window.onresize = input.windowResizeHandle;

opengl.setClearColor(0, 0, 0, 1);


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

const programInfo = opengl.createShader(vsSource, fsSource);

const vertices = [
	/* position */      /* colour */
	1.0, 1.0, 0,   /**/ 1, 1, 1, 1,
	-1.0, 1.0, 0,  /**/ 1, 0, 0, 1,
	1.0, -1.0, 0,  /**/ 0, 1, 0, 1,
	-1.0, -1.0, 0, /**/ 0, 0, 1, 1
];

const mesh = opengl.createMesh(programInfo, vertices);

const entity = new Entity(
	[
		{
			shader: programInfo,
			mesh: mesh
		}
	]
);
entity.setPosition(0, 0, -50);

const ctrl2d = new Controls2D("w", "a", "s", "d", 10);

let projection;

input.addResizeWindowHandle(function (width, height) {
	projection = new Perspective(
		45 * Math.PI / 180,
		width / height,
		0.1, 100
	);
});

const camera = new Camera();

input.init();
opengl.setUpdate((ts) => {

	const move = ctrl2d.getMoveVector(ts);

	entity.setPosition(
		entity.position[0] + move[0],
		entity.position[1] + move[1],
		entity.position[2]
	);

	opengl.clear();
	opengl.drawEn(projection, camera, entity);

});
