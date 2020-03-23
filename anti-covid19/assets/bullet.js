const BULLET_ASSETS = {
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

BULLET_ASSETS.init = function (context) {
	const vsSource = `#version 300 es
	in vec4 aPosition;
	uniform mat4 uProjectionMatrix;
	uniform mat4 uViewMatrix;
	uniform mat4 uModelMatrix;
	void main(void) {
		gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * aPosition;
	}`;
	const fsSource = `#version 300 es
	precision mediump float;
	out vec4 FragColor;
	uniform vec4 uColor;
	void main(void) {
		FragColor = uColor;
	}`;
	BULLET_ASSETS.shader = context.createShader(vsSource, fsSource);
	BULLET_ASSETS.attribs.position = BULLET_ASSETS.shader.retrieveAttribLocation("aPosition");
	BULLET_ASSETS.uniforms.projectionMatrix = BULLET_ASSETS.shader.retrieveUniformLocation("uProjectionMatrix");
	BULLET_ASSETS.uniforms.viewMatrix = BULLET_ASSETS.shader.retrieveUniformLocation("uViewMatrix");
	BULLET_ASSETS.uniforms.modelMatrix = BULLET_ASSETS.shader.retrieveUniformLocation("uModelMatrix");
	BULLET_ASSETS.uniforms.color = BULLET_ASSETS.shader.retrieveUniformLocation("uColor");
	const vertices_ = [
		0, 0, 0.5, // top center
		0.5, 0, -0.5, // bottom right
		-0.5, 0, -0.5, // bottom left
	];
	const stride = 3;
	const indices = [0, 1, 2];
	BULLET_ASSETS.meshes.bullet = context.createMesh(vertices_, stride, indices);
};

BULLET_ASSETS.draw = function (projM, viewM, modelM, color) {
	BULLET_ASSETS.meshes.bullet.addAttribPointer(BULLET_ASSETS.attribs.position, 3, 0);
	BULLET_ASSETS.shader.use();
	BULLET_ASSETS.shader.setUniformMat4fv(BULLET_ASSETS.uniforms.projectionMatrix, projM);
	BULLET_ASSETS.shader.setUniformMat4fv(BULLET_ASSETS.uniforms.viewMatrix, viewM);
	BULLET_ASSETS.shader.setUniformMat4fv(BULLET_ASSETS.uniforms.modelMatrix, modelM);
	BULLET_ASSETS.shader.setUniformVec4f(BULLET_ASSETS.uniforms.color, color);
	BULLET_ASSETS.meshes.bullet.draw();
};