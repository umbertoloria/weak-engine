function Bullet(x, z, direction) {

	this.color = [1, 0.5, 0, 1];
	this.position = [x, 0, z];
	this.rotation = [0, -Math.PI / 2 + direction, 0];
	this.scale = [0.2, 1, 1];
	const sin = Math.sin(direction);
	const cos = Math.cos(direction);
	// const speed = Math.random() * Math.PI * 2;
	const speed = 10;

	this.update = function (ts) {
		this.position[0] += cos * speed * ts;
		this.position[2] -= sin * speed * ts;
	}

	this.draw = function (projM, viewM) {
		const modelM = mat4.create();
		mat4.translate(modelM, modelM, this.position);
		mat4.rotate(modelM, modelM, -Math.PI / 2 + direction, [0, 1, 0]);
		mat4.scale(modelM, modelM, this.scale);
		BULLET_ASSETS.draw(projM, viewM, modelM, this.color);
	};

}