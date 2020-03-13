function PlatformLayer() {

	let projection = null;
	const camera = new Camera();
	let p1, p2, p3;

	this.attach = function (context) {

		const playerShader = context.createShader(PLAYER_ASSETS.vsSource, PLAYER_ASSETS.fsSource);
		const playerMesh = context.createMesh(PLAYER_ASSETS.vertices, PLAYER_ASSETS.stride);
		playerMesh.addAttribPointer(playerShader.retrieveAttribLocation("aPosition"), 3, 0);

		p1 = new Player(playerShader, playerMesh);
		p1.color = [0.7, 0.2, 0, 1];
		p1.position = [-5, 0, -12];
		p1.rotation = [0, Math.PI / 2, 0];

		p2 = new Player(playerShader, playerMesh);
		p2.color = [0.3, 1, 0.6, 1];
		p2.position = [1, 1, -18];
		p2.rotation = [10, 0, 0];

		p3 = new Player(playerShader, playerMesh);
		p3.color = [0.1, 0.8, 0.7, 1];
		p3.position = [2, 2, -21];

	};

	let duration = 0;

	this.update = function (ts) {

		duration += ts;

		p1.rotation[1] += 2 * ts;

		p1.position[0] = Math.sin(duration * 2 * Math.PI) * 5;
		p1.position[2] = -20 + Math.cos(duration * 2 * Math.PI) * 5;
		p1.position[1] = Math.sin(duration * 4 * Math.PI);

		p2.rotation[0] += 3 * ts;
		p2.rotation[1] += 1 * ts;
		p2.rotation[2] += 2 * ts;

		p3.rotation[2] += ts;
	};

	this.draw = function () {
		p1.draw(projection.getProjectionMatrix(), camera.getViewMatrix());
		p2.draw(projection.getProjectionMatrix(), camera.getViewMatrix());
		p3.draw(projection.getProjectionMatrix(), camera.getViewMatrix());
	}

	this.event = function (e) {
		if (e.type === "WindowResize") {
			projection = new Perspective(
				45 * Math.PI / 180,
				e.width / e.height,
				0.1, 100
			);
		}
	};

}