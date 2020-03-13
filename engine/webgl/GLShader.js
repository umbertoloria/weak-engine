function GLShader(gl, vertexShaderSource, fragmentShaderSource) {

	function initShaderProgram(gl, vsSource, fsSource) {
		const shaderProgram = gl.createProgram();
		gl.attachShader(shaderProgram, loadShader(gl, gl.VERTEX_SHADER, vsSource));
		gl.attachShader(shaderProgram, loadShader(gl, gl.FRAGMENT_SHADER, fsSource));
		gl.linkProgram(shaderProgram);
		if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
			alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
			return null;
		}
		return shaderProgram;
	}

	function loadShader(gl, type, source) {
		const shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
			gl.deleteShader(shader);
			return null;
		}
		return shader;
	}

	this.program = initShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
	const this_handle = this;

	this.retrieveAttribLocation = function (name) {
		return gl.getAttribLocation(this_handle.program, name);
	}

	this.retrieveUniformLocation = function (name) {
		return gl.getUniformLocation(this_handle.program, name);
	}

	this.use = function () {
		gl.useProgram(this.program);
	}

	this.setUniformMatrix4fv = function (channel, matrix) {
		gl.uniformMatrix4fv(channel, false, matrix);
	}

}