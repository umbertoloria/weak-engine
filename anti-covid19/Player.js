function Player(name) {

	this.name = name;
	this.color = [1, 1, 1, 1];
	this.position = [0, 0, 0];
	this.rotation = [Math.PI / 2, 0, 0];
	this.scale = [1, 1, 1];

	this.draw = function (projM, viewM) {
		const modelM = mat4.create();
		mat4.translate(modelM, modelM, this.position);
		mat4.rotate(modelM, modelM, this.rotation[1], [0, 1, 0]);
		mat4.rotate(modelM, modelM, this.rotation[0], [1, 0, 0]);
		mat4.rotate(modelM, modelM, this.rotation[2], [0, 0, 1]);
		mat4.scale(modelM, modelM, this.scale);
		PLAYER_ASSETS.shader.use();
		PLAYER_ASSETS.shader.setUniformMat4fv(PLAYER_ASSETS.uniforms.projectionMatrix, projM);
		PLAYER_ASSETS.shader.setUniformMat4fv(PLAYER_ASSETS.uniforms.viewMatrix, viewM);
		PLAYER_ASSETS.shader.setUniformMat4fv(PLAYER_ASSETS.uniforms.modelMatrix, modelM);
		PLAYER_ASSETS.shader.setUniformVec4f(PLAYER_ASSETS.uniforms.color, this.color);
		PLAYER_ASSETS.meshes.player.draw();
	};

}