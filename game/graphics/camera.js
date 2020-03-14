function Camera() {

	let viewMatrix;
	const position = [0, 0, 0];
	const rotation = [0, 0, 0];

	this.getPosition = function () {
		return [position[0], position[1], position[2]];
	}

	this.setPosition = function (x, y, z) {
		position[0] = x;
		position[1] = y;
		position[2] = z;
		updateMatrix();
	};

	this.getRotation = function () {
		return [rotation[0], rotation[1], rotation[2]];
	}

	this.setRotation = function (x, y, z) {
		rotation[0] = x;
		rotation[1] = y;
		rotation[2] = z;
		updateMatrix();
	};

	const updateMatrix = function () {
		viewMatrix = mat4.create();
		mat4.translate(viewMatrix, viewMatrix, position);
		mat4.rotateX(viewMatrix, viewMatrix, rotation[0]);
		mat4.rotateY(viewMatrix, viewMatrix, rotation[1]);
		mat4.rotateZ(viewMatrix, viewMatrix, rotation[2]);
		mat4.invert(viewMatrix, viewMatrix);
	};
	updateMatrix();

	this.getViewMatrix = function () {
		return viewMatrix;
	};

}