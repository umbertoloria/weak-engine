function Player(shader, mesh) {

	this.color = [1, 1, 1, 1];
	this.position = [0, 0, -10];
	this.rotation = [0, 0, 0];
	this.scale = [1, 1, 1];

	this.draw = function (projM, viewM) {
		const modelM = mat4.create();
		mat4.translate(modelM, modelM, this.position);
		mat4.rotate(modelM, modelM, this.rotation[1], [0, 1, 0]);
		mat4.rotate(modelM, modelM, this.rotation[0], [1, 0, 0]);
		mat4.rotate(modelM, modelM, this.rotation[2], [0, 0, 1]);
		mat4.scale(modelM, modelM, this.scale);
		shader.use();
		shader.setUniformMat4fv(shader.retrieveUniformLocation("uProjectionMatrix"), projM);
		shader.setUniformMat4fv(shader.retrieveUniformLocation("uViewMatrix"), viewM);
		shader.setUniformMat4fv(shader.retrieveUniformLocation("uModelMatrix"), modelM);
		shader.setUniformVec4f(shader.retrieveUniformLocation("uColor"), this.color);
		mesh.draw();
	};

}