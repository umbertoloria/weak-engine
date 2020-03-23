function Player(name) {

	this.name = name;
	this.color = [1, 1, 1, 1];
	this.position = [0, 0, 0];
	this.scale = [1, 1, 1];

	this.draw = function (projM, viewM) {
		const modelM = mat4.create();
		mat4.translate(modelM, modelM, this.position);
		mat4.scale(modelM, modelM, this.scale);
		PLAYER_ASSETS.draw(projM, viewM, modelM, this.color);
	};

}