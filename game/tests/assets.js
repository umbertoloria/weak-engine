const QUAD_ASSETS = {}

QUAD_ASSETS.vsSource = `
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

QUAD_ASSETS.fsSource = `
	varying lowp vec4 vColor;
	void main(void) {
		gl_FragColor = vColor;
	}`;

QUAD_ASSETS.vertices = [
	/* position */      /* colour */
	1.0, 1.0, 0,   /**/ 1, 1, 1, 1,
	-1.0, 1.0, 0,  /**/ 1, 0, 0, 1,
	1.0, -1.0, 0,  /**/ 0, 1, 0, 1,
	-1.0, -1.0, 0, /**/ 0, 0, 1, 1
];