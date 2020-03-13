function QuadShader(context) {
	const shader = context.createShader(QUAD_ASSETS.vsSource, QUAD_ASSETS.fsSource);
	this.positionAttrib = shader.retrieveAttribLocation("aPosition");
	this.colorAttrib = shader.retrieveAttribLocation("aColor");
	const projectionMatrixUniform = shader.retrieveUniformLocation("uProjectionMatrix")
	const viewMatrixUniform = shader.retrieveUniformLocation("uViewMatrix")
	const modelMatrixUniform = shader.retrieveUniformLocation("uModelMatrix")
	this.use = function (projM, viewM, modelM) {
		shader.use();
		shader.setUniformMat4fv(projectionMatrixUniform, projM);
		shader.setUniformMat4fv(viewMatrixUniform, viewM);
		shader.setUniformMat4fv(modelMatrixUniform, modelM);
	}
}

function QuadMesh(context, positionAttrib, colorAttrib) {
	const mesh = context.createMesh(QUAD_ASSETS.vertices, 7);
	mesh.addAttribPointer(positionAttrib, 3, 0);
	mesh.addAttribPointer(colorAttrib, 4, 3);
	this.draw = function () {
		mesh.draw();
	}
}

function QuadEntity(context) {

	const shader = new QuadShader(context);
	const mesh = new QuadMesh(context, shader.positionAttrib, shader.colorAttrib);

	this.position = [0, 0, 0];
	this.rotation = [0, 0, 0];
	this.scale = [1, 1, 1];

	this.setPosition = function (x, y, z) {
		vec3.set(this.position, x, y, z);
	};

	this.setRotation = function (x, y, z) {
		vec3.set(this.rotation, x, y, z);
	};

	this.draw = function (projectionMatrix, viewMatrix) {
		const modelMatrix = mat4.create();
		mat4.translate(modelMatrix, modelMatrix, this.position);
		mat4.rotate(modelMatrix, modelMatrix, this.rotation[1], [0, 1, 0]);
		mat4.rotate(modelMatrix, modelMatrix, this.rotation[0], [1, 0, 0]);
		mat4.rotate(modelMatrix, modelMatrix, this.rotation[2], [0, 0, 1]);
		mat4.scale(modelMatrix, modelMatrix, this.scale);
		shader.use(projectionMatrix, viewMatrix, modelMatrix);
		mesh.draw();
	}

}