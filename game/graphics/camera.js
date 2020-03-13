function Camera() {

	let viewMatrix;
	// let position = new Vec3();
	// let rotation = new Vec3();

	this.setPosition = function (x, y, z) {
		updateMatrix();
	};

	this.setRotation = function (x, y, z) {
		updateMatrix();
	};

	const updateMatrix = function () {
		viewMatrix = mat4.create();
		// mat4.translate(viewMatrix, viewMatrix, [position.x, position.y, position.z]);
	};
	updateMatrix();

	this.getViewMatrix = function () {
		return viewMatrix;
	};

}