function MyLayer() {

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

	const vertices = [
		/* position */      /* colour */
		1.0, 1.0, 0,   /**/ 1, 1, 1, 1,
		-1.0, 1.0, 0,  /**/ 1, 0, 0, 1,
		1.0, -1.0, 0,  /**/ 0, 1, 0, 1,
		-1.0, -1.0, 0, /**/ 0, 0, 1, 1
	];

	this.projection = null;
	this.camera = new Camera();
	this.ctrl2d = new Controls2D("w", "a", "s", "d", 10);

	this.attach = function () {

		const programInfo = opengl.createShader(vsSource, fsSource);
		const mesh = opengl.createMesh(programInfo, vertices);


		this.entity = new Entity([
			{
				shader: programInfo,
				mesh: mesh
			}
		]);
		this.entity.setPosition(0, 0, -50);

	};

	this.update = function (ts) {
		const move = this.ctrl2d.getMoveVector(ts);

		this.entity.setPosition(
			this.entity.position[0] + move[0],
			this.entity.position[1] + move[1],
			this.entity.position[2]
		);

		opengl.clear();
		opengl.drawEn(this.projection, this.camera, this.entity);
	};

	this.event = function (e) {
		if (e.type === "WindowResize") {
			this.projection = new Perspective(
				45 * Math.PI / 180,
				e.width / e.height,
				0.1, 100
			);
		}
	};

	this.detach = function () {
	}

}