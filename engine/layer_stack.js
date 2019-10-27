function Layer_stack() {

	const layers = [];

	this.add = function (layer) {
		layers.push(layer);
	};

	this.attach = function () {
		for (let layer of layers)
			layer.attach();
	};

	this.update = function (ts) {
		for (let layer of layers)
			layer.update(ts);
	};

	this.detach = function () {
		for (let layer of layers)
			layer.detach();
	};

	this.event = function (e) {
		for (let layer of layers) {
			layer.event(e);
			// FIXME: stop propagation
		}
	};

}