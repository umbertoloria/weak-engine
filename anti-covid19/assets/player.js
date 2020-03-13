const PLAYER_ASSETS = {};

PLAYER_ASSETS.vsSource = `
	attribute vec4 aPosition;
	uniform mat4 uProjectionMatrix;
	uniform mat4 uViewMatrix;
	uniform mat4 uModelMatrix;
	void main(void) {
		gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * aPosition;
	}`;

PLAYER_ASSETS.fsSource = `
	precision mediump float;
	uniform vec4 uColor;
	void main(void) {
		gl_FragColor = uColor;
	}`;

PLAYER_ASSETS.vertices = [
	/* position */
	1.0, 1.0, 0,
	-1.0, 1.0, 0,
	1.0, -1.0, 0,
	-1.0, -1.0, 0,
];

PLAYER_ASSETS.stride = 3;