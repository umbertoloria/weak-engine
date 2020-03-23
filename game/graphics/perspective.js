function Perspective(fieldOfView, aspect, zNear, zFar) {

	// Create a perspective matrix, a special matrix that is
	// used to simulate the distortion of perspective in a camera.
	// Our field of view is 45 degrees, with a width/height
	// ratio that matches the display size of the canvas
	// and we only want to see objects between 0.1 units
	// and 100 units away from the camera.
	// ...

	// note: glmatrix.js always has the first argument
	// as the destination to receive the result.
	const projectionMatrix = mat4.create();
	mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

	this.getProjectionMatrix = function () {
		return projectionMatrix;
	}

	this.getAspectRatio = function () {
		return aspect;
	}

}