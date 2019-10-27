function Input(opengl_) {

	const opengl = opengl_;

	const keys = {};

	this.keyUpHandle = function (e) {
		keys[e.key] = false;
	};

	this.keyDownHandle = function (e) {
		keys[e.key] = true;
	};

	this.isKeyDown = function (key) {
		return keys[key];
	};

}
