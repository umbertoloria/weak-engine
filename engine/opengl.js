function OpenGL(id) {

	const gl = document.querySelector(id).getContext('webgl');
	if (!gl) {
		alert('Unable to initialize WebGL. Your browser or machine may not support it.');
		return;
	}

	this.createShader = function (vsSource, fsSource) {
		return new Shader(gl, vsSource, fsSource);
	};

	this.createMesh = function (shader, vertices) {
		return new Mesh(gl, shader, vertices);
	};

	this.setClearColor = function (red, green, blue, alpha) {
		gl.clearColor(red, green, blue, alpha);
	};

	this.clear = function () {
		gl.clearDepth(1.0);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL); // Near things obscure far things
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

		for (let picture of entity.pictures) {
			this.draw(picture.shader, picture.mesh, projection, camera, modelMatrix);
		}

	};

	// Layer Stack
	this.layerStack = new Layer_stack();

	this.addLayer = function (layer) {
		this.layerStack.add(layer);
	};

	// Rendering
	this.attachLayers = function () {
		this.layerStack.attach()
	};

	this.runLayers = function () {

		const interfaceLayers = this.layerStack;
		let then = 0;

		function loop(now) {
			now *= 0.001;
			const ts = now - then;
			then = now;
			interfaceLayers.update(ts);
			requestAnimationFrame(loop);
		}

		requestAnimationFrame(loop);

	};
	this.detachLayers = function () {
		this.layerStack.detach();
	};

	this.newEvent = function (e) {
		if (e.type === "WindowResize") {
			gl.canvas.width = e.width;
			gl.canvas.height = e.height;
			gl.viewport(0, 0, e.width, e.height);
		}
		this.layerStack.event(e);
	};

}