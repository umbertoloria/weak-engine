function PlatformLayer() {

	let projection;
	const camera = new Camera();
	let me;
	let players = {};
	const ctrl2d = new Controls2D("w", "a", "s", "d", 6);

	this.attach = function (context) {
		camera.setPosition(0, 20, 0);
		camera.setRotation(-Math.PI * 0.5, 0, 0);
		PLAYER_ASSETS.init(context);
		BULLET_ASSETS.init(context);
	};

	this.event = function (e) {
		if (e.type === "WindowResize") {
			projection = new Perspective(
				45 * Math.PI / 180,
				e.width / e.height,
				0.001, 100
			);
		} else if (e.type === "LeftMouseDown") {
			lastMouseDown = {
				x: e.x,
				y: e.y
			};
		}
	};

	let lastMouseDown;
	const proiettili = [];

	this.update = function (ts) {
		if (!(me instanceof Player))
			return;
		// Spostamento
		const move = ctrl2d.getMoveVector(ts);
		if (move !== null) {
			me.position[0] += move[0];
			me.position[2] -= move[1];
			camera.setPosition(me.position[0], 20, me.position[2]);
			this.newPlayerPositionCallback(me.position);
		}
		// Spari esistenti
		for (const bullet of proiettili)
			bullet.update(ts);
		// Nuovo sparo
		if (lastMouseDown !== undefined) {
			const angle = Math.atan2(50 - lastMouseDown.y, (lastMouseDown.x - 50) * projection.getAspectRatio());
			lastMouseDown = undefined;
			proiettili.push(new Bullet(me.position[0], me.position[2], angle));
		}
	};

	this.draw = function () {
		const projectionMatrix = projection.getProjectionMatrix();
		const viewMatrix = camera.getViewMatrix();
		// bullets
		for (const bullet of proiettili)
			bullet.draw(projectionMatrix, viewMatrix);
		// players
		if (me instanceof Player) {
			for (const name in players)
				if (me.name !== name)
					players[name].draw(projectionMatrix, viewMatrix);
			me.draw(projectionMatrix, viewMatrix);
		} else {
			for (const name in players)
				players[name].draw(projectionMatrix, viewMatrix);
		}
	}

	// communication side

	this.newPlayerPositionCallback = null;

	this.setMainPlayer = function (name) {
		console.log("io sono", name);
		me = new Player(name);
		players[me.name] = me;
	}

	this.playersUpdater = function (playersInfo) {
		for (const plna in players)
			if (playersInfo[plna] === undefined)
				delete players[plna];
		for (const playerName in playersInfo) {
			const posx = playersInfo[playerName].x;
			const posy = playersInfo[playerName].y;
			const color = playersInfo[playerName].color;
			if (players[playerName] === undefined)
				players[playerName] = new Player(playerName);
			const pl = players[playerName];
			pl.position[0] = posx;
			pl.position[2] = posy;
			pl.color = color;
			if (playerName === me.name)
				camera.setPosition(me.position[0], 20, me.position[2]);
		}
	}

	this.positionsUpdater = function (name, x, y) {
		const player = players[name];
		player.position[0] = x;
		player.position[2] = y;
	}

}