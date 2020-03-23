function GLContextManager(id) {

	const gl = document.querySelector(id).getContext('webgl2');
	if (!gl) {
		alert('Unable to initialize WebGL. Your browser or machine may not support it.');
		return;
	}

	this.createShader = function (vsSource, fsSource) {
		return new GLShader(gl, vsSource, fsSource);
	};

	this.createMesh = function (vertices, stride, indices) {
		return new GLMesh(gl, vertices, stride, indices);
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

	this.setViewport = function (width, height) {
		gl.canvas.width = width;
		gl.canvas.height = height;
		gl.viewport(0, 0, width, height);
	}

}