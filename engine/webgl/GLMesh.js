function GLMesh(gl, programInfo, vertices) {

	const buffer = gl.createBuffer();
	const count = vertices.length / 7;
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

	gl.vertexAttribPointer(
		programInfo.attribLocations.position,
		3, gl.FLOAT, false,
		7 * Float32Array.BYTES_PER_ELEMENT, 0
	);
	gl.enableVertexAttribArray(programInfo.attribLocations.position);

	gl.vertexAttribPointer(
		programInfo.attribLocations.color,
		4, gl.FLOAT, false,
		7 * Float32Array.BYTES_PER_ELEMENT,
		3 * Float32Array.BYTES_PER_ELEMENT
	);
	gl.enableVertexAttribArray(programInfo.attribLocations.color);

	// this.getBuffer = function () {
	// 	return buffer;
	// };

	// this.getCount = function () {
	// 	return count;
	// };

	this.draw = function () {
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, count);
	}

}