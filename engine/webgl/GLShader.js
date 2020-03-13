function GLShader(gl, vertexShaderSource, fragmentShaderSource) {

	function initShaderProgram(gl, vsSource, fsSource) {
		const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
		const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

		// Create the shader program

		const shaderProgram = gl.createProgram();
		gl.attachShader(shaderProgram, vertexShader);
		gl.attachShader(shaderProgram, fragmentShader);
		gl.linkProgram(shaderProgram);

		// If creating the shader program failed, alert

		if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
			alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
			return null;
		}

		return shaderProgram;
	}

	function loadShader(gl, type, source) {
		const shader = gl.createShader(type);

		// Send the source to the shader object

		gl.shaderSource(shader, source);

		// Compile the shader program

		gl.compileShader(shader);

		// See if it compiled successfully

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
			gl.deleteShader(shader);
			return null;
		}

		return shader;
	}

	this.program = initShaderProgram(gl, vertexShaderSource, fragmentShaderSource);

	this.attribLocations = {
		position: gl.getAttribLocation(this.program, 'aPosition'),
		color: gl.getAttribLocation(this.program, 'aColor')
	};

	this.uniformLocations = {
		projectionMatrix: gl.getUniformLocation(this.program, 'uProjectionMatrix'),
		viewMatrix: gl.getUniformLocation(this.program, 'uViewMatrix'),
		modelMatrix: gl.getUniformLocation(this.program, 'uModelMatrix')
	};

}