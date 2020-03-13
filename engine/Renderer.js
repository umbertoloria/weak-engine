function Renderer(context) {

	this.draw = function (programInfo, mesh, projection, camera, modelMatrix) {
		context.useProgram(programInfo.program);
		context.setUniformMatrix4fv(programInfo.uniformLocations.projectionMatrix,
			projection.getProjectionMatrix());
		context.setUniformMatrix4fv(programInfo.uniformLocations.viewMatrix,
			camera.getViewMatrix());
		context.setUniformMatrix4fv(programInfo.uniformLocations.modelMatrix, modelMatrix);
		mesh.draw();
	};

	this.drawEn = function (projection, camera, entity) {

		const modelMatrix = mat4.create();
		mat4.translate(modelMatrix, modelMatrix, entity.position);
		mat4.rotate(modelMatrix, modelMatrix, entity.rotation[1], [0, 1, 0]);
		mat4.rotate(modelMatrix, modelMatrix, entity.rotation[0], [1, 0, 0]);
		mat4.rotate(modelMatrix, modelMatrix, entity.rotation[2], [0, 0, 1]);
		mat4.scale(modelMatrix, modelMatrix, entity.scale);

		for (let picture of entity.pictures) {
			this.draw(picture.shader, picture.mesh, projection, camera, modelMatrix);
		}

	};

}