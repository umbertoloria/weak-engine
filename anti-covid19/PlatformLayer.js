function PlatformLayer() {

	let projection = null;
	const camera = new Camera();
	let me;
	let players = [];

	this.attach = function (context) {
		camera.setPosition(0, 20, 0);
		camera.setRotation(-Math.PI * 0.5, 0, 0);

		PLAYER_ASSETS.init(context);
		me = new Player();
		me.color = [0.7, 0.2, 0, 1];

		{
			const pl = new Player();
			pl.position = [-1, 0, -1];
			players.push(pl);
		}

		{
			const pl = new Player();
			pl.position = [-2, 0, -2];
			players.push(pl);
		}

		{
			const pl = new Player();
			pl.position = [3, 0, 3];
			players.push(pl);
		}
	};

	const ctrl2d = new Controls2D("w", "a", "s", "d", 6);

	this.update = function (ts) {
		const move = ctrl2d.getMoveVector(ts);
		me.position[0] += move[0];
		me.position[2] -= move[1];
	};

	this.draw = function () {
		for (let pl of players) {
			pl.draw(projection.getProjectionMatrix(), camera.getViewMatrix());
		}
		me.draw(projection.getProjectionMatrix(), camera.getViewMatrix());
	}

	this.event = function (e) {
		if (e.type === "WindowResize") {
			projection = new Perspective(
				45 * Math.PI / 180,
				e.width / e.height,
				0.001, 100
			);
		}
	};

}