function Orthographic(left, right, bottom, top, near, far) {

	const projectionMatrix = mat4.create();
	mat4.ortho(projectionMatrix, left, right, bottom, top, near, far);

	this.getProjectionMatrix = function () {
		return projectionMatrix;
	}

}