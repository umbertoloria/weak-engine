function layersDefinition(layerStack) {
	layerStack.addLayer(new MyLayer());
}

function clearColorDefinition() {
	return [0, 0, 0, 1];
}

function MyLayer() {

	let projection;
	const camera = new Camera();
	const ctrl2d = new Controls2D("w", "a", "s", "d", 10);
	let entity;

	this.attach = function (context) {
		entity = new QuadEntity(context);
		entity.setPosition(0, 0, -20);
	};

	this.update = function (ts) {
		const move = ctrl2d.getMoveVector(ts);

		entity.setPosition(
			entity.position[0] + move[0],
			entity.position[1] + move[1],
			entity.position[2]);

		let rot = 0;
		if (input.isKeyDown(" "))
			rot = -ts;

		entity.setRotation(
			entity.rotation[0],
			entity.rotation[1],
			entity.rotation[2] + rot);

	};

	this.draw = function () {
		entity.draw(projection.getProjectionMatrix(), camera.getViewMatrix());
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