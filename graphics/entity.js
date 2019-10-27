// function Entity(shader, mesh) {
function Entity(pictures) {

	// this.shader = shader;
	// this.mesh = mesh;
	this.pictures = pictures;
	this.position = [0, 0, 0];
	this.rotation = [0, 0, 0];

	this.setPosition = function (x, y, z) {
		vec3.set(this.position, x, y, z);
	};

	this.setRotation = function (x, y, z) {
		vec3.set(this.rotation, x, y, z);
	};

}