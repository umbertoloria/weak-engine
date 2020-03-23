function Input(eventUserCallback) {

	const keys = {};
	const mouse = {
		button1: {
			x: -1,
			y: -1,
			pressed: false
		}
	};

	// System function events
	this.keyDownHandle = function (e) {
		keys[e.key] = true;
	};

	this.keyUpHandle = function (e) {
		keys[e.key] = false;
	};

	this.mouseMoveHandle = function (e) {
		const x = e.clientX / document.body.clientWidth * 100;
		const y = e.clientY / document.body.clientHeight * 100;
		mouse.button1.x = x;
		mouse.button1.y = y;
	}

	this.mouseDownHandle = function (e) {
		if (e.button === 0) {
			if (!mouse.button1.pressed) {
				mouse.button1.pressed = true;
				const x = e.clientX / document.body.clientWidth * 100;
				const y = e.clientY / document.body.clientHeight * 100;
				mouse.button1.x = x;
				mouse.button1.y = y;
				eventUserCallback({
					type: "LeftMouseDown",
					x: x,
					y: y
				});
			}
		}
	};

	this.mouseUpHandle = function (e) {
		if (e.button === 0) {
			if (mouse.button1.pressed) {
				mouse.button1.pressed = false;
				const x = e.clientX / document.body.clientWidth * 100;
				const y = e.clientY / document.body.clientHeight * 100;
				mouse.button1.x = x;
				mouse.button1.y = y;
				eventUserCallback({
					type: "LeftMouseUp",
					x: x,
					y: y
				});
			}
		}
	};

	this.windowResizeHandle = function () {
		eventUserCallback({
			type: "WindowResize",
			width: document.body.clientWidth,
			height: document.body.clientHeight
		});
	};

	// Init
	this.init = function () {
		this.windowResizeHandle();
	};

	// Direct queries
	this.isKeyDown = function (key) {
		return keys[key];
	};

	this.isMousePressed = function () {
		return mouse.button1.pressed;
	};

}