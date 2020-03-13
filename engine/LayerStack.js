function LayerStack() {

	const layers = [];

	this.addLayer = function (layer) {
		layers.push(layer);
	};

	this.attachLayers = function (context) {
		for (let layer of layers)
			layer.attach(context);
	};

	this.updateLayers = function (ts) {
		for (let layer of layers)
			layer.update(ts);
	};

	this.drawLayers = function (renderer) {
		for (let layer of layers)
			layer.draw(renderer);
	}

	this.detachLayers = function () {
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