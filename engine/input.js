function Input(opengl) {

	const keys = {};

	// System function events
	this.keyUpHandle = function (e) {
		keys[e.key] = false;
	};

	this.keyDownHandle = function (e) {
		keys[e.key] = true;
	};

	this.windowResizeHandle = function () {
		const width = document.body.clientWidth;
		const height = document.body.clientHeight;
		// opengl.updateWindowSize(width, height); // TODO: Usare gli eventi, inglobare in opengl.js
		const evento = {
			type: "WindowResize",
			width: width,
			height: height
		};
		opengl.newEvent(evento);
	};

	// Init
	this.init = function () {
		this.windowResizeHandle();
	};

	// Direct queries
	this.isKeyDown = function (key) {
		return keys[key];
	};

}