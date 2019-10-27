function OpenGL(id) {

	const gl = document.querySelector(id).getContext('webgl');
	if (!gl) {
		alert('Unable to initialize WebGL. Your browser or machine may not support it.');
		return;
	}

	this.updateWindowSize = function () {
		gl.canvas.width = document.body.clientWidth;
		gl.canvas.height = document.body.clientHeight;
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	};
	this.updateWindowSize();

	this.getContext = function () {
		return gl;
	};

	this.setClearColor = function (red, green, blue, alpha) {
		gl.clearColor(red, green, blue, alpha);  // Clear to black, fully opaque
	};

	this.clear = function () {
		gl.clearDepth(1.0);                 // Clear everything
		gl.enable(gl.DEPTH_TEST);           // Enable depth testing
		gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	};

	this.draw = function (programInfo, mesh, projection, camera, modelMatrix) {

		// Tell WebGL to use our program when drawing
		gl.useProgram(programInfo.program);

		// Set the shader uniforms
		gl.uniformMatrix4fv(
			programInfo.uniformLocations.projectionMatrix,
			false,
			projection.getProjectionMatrix()
		);
		gl.uniformMatrix4fv(
			programInfo.uniformLocations.viewMatrix,
			false,
			camera.getViewMatrix()
		);
		gl.uniformMatrix4fv(
			programInfo.uniformLocations.modelMatrix,
			false,
			modelMatrix
		);

		mesh.draw();

	};

	this.drawEn = function (projection, camera, entity) {
		const modelMatrix = mat4.create();
		mat4.translate(modelMatrix, modelMatrix, entity.position);
		this.draw(entity.shader, entity.mesh, projection, camera, modelMatrix);
	};

	this.setUpdate = function (loopFunction) {
		let then = 0;

		function loop(now) {
			now *= 0.001;
			const ts = now - then;
			then = now;
			loopFunction(ts);
			requestAnimationFrame(loop);
		}

		requestAnimationFrame(loop);
	};

}