const PLAYER_ASSETS = {
	shader: null,
	attribs: {
		position: -1
	},
	uniforms: {
		projectionMatrix: -1,
		viewMatrix: -1,
		modelMatrix: -1,
		color: -1
	},
	meshes: {}
};

PLAYER_ASSETS.init = function (context) {
	const vsSource = `
	attribute vec4 aPosition;
	uniform mat4 uProjectionMatrix;
	uniform mat4 uViewMatrix;
	uniform mat4 uModelMatrix;
	void main(void) {
		gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * aPosition;
	}`;
	const fsSource = `
	precision mediump float;
	uniform vec4 uColor;
	void main(void) {
		gl_FragColor = uColor;
	}`;
	PLAYER_ASSETS.shader = context.createShader(vsSource, fsSource);
	PLAYER_ASSETS.attribs.position = PLAYER_ASSETS.shader.retrieveAttribLocation("aPosition");
	PLAYER_ASSETS.uniforms.projectionMatrix = PLAYER_ASSETS.shader.retrieveUniformLocation("uProjectionMatrix");
	PLAYER_ASSETS.uniforms.viewMatrix = PLAYER_ASSETS.shader.retrieveUniformLocation("uViewMatrix");
	PLAYER_ASSETS.uniforms.modelMatrix = PLAYER_ASSETS.shader.retrieveUniformLocation("uModelMatrix");
	PLAYER_ASSETS.uniforms.color = PLAYER_ASSETS.shader.retrieveUniformLocation("uColor");
	const vertices = [
		0.5, 0.5, 0,
		-0.5, 0.5, 0,
		0.5, -0.5, 0,
		-0.5, -0.5, 0,
	];
	const stride = 3;
	const indices = [0, 1, 2, 1, 2, 3];
	PLAYER_ASSETS.meshes.player = context.createMesh(vertices, stride, indices);
	PLAYER_ASSETS.meshes.player.addAttribPointer(PLAYER_ASSETS.attribs.position, 3, 0);
}