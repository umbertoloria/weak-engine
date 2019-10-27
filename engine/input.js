function Input(opengl) {

	const keys = {};

	// TODO: Gestire diversi tipi di handles
	const resizeWindowHandles = [];

	// Handlers management
	this.addResizeWindowHandle = function (handle) {
		resizeWindowHandles.push(handle);
	};

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
		opengl.updateWindowSize(width, height);
		for (let resizeWindowHandle of resizeWindowHandles) {
			resizeWindowHandle(width, height);
		}
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