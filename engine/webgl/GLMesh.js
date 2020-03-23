function GLMesh(gl, vertices, stride, indices) {

	const verticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	const indicesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

	this.addAttribPointer = function (attribLocation, size, offset) {
		gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
		gl.vertexAttribPointer(attribLocation, size, gl.FLOAT, false,
			stride * Float32Array.BYTES_PER_ELEMENT, offset * Float32Array.BYTES_PER_ELEMENT);
		gl.enableVertexAttribArray(attribLocation);
	};

	this.draw = function () {
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
		gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
	}

}