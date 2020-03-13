function GLMesh(gl, vertices, stride) {

	const buffer = gl.createBuffer();
	const count = vertices.length / stride;
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

	this.addAttribPointer = function (attribLocation, size, offset) {
		gl.vertexAttribPointer(attribLocation, size, gl.FLOAT, false,
			stride * Float32Array.BYTES_PER_ELEMENT, offset * Float32Array.BYTES_PER_ELEMENT);
		gl.enableVertexAttribArray(attribLocation);
	};

	this.draw = function () {
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, count);
	}

}