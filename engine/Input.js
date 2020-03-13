function Input(eventUserCallback) {

	const keys = {};

	// System function events
	this.keyUpHandle = function (e) {
		keys[e.key] = false;
	};

	this.keyDownHandle = function (e) {
		keys[e.key] = true;
	};

	this.windowResizeHandle = function () {
		const evento = {
			type: "WindowResize",
			width: document.body.clientWidth,
			height: document.body.clientHeight
		};
		eventUserCallback(evento);
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