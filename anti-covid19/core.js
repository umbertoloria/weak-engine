function layersDefinition(layerStack) {

	const partita = new Partita();
	const platformLayer = new PlatformLayer();

	partita.setMainPlayerCallback = platformLayer.setMainPlayer;
	partita.playersUpdaterCallback = platformLayer.playersUpdater;
	partita.positionsUpdaterCallback = platformLayer.positionsUpdater;
	platformLayer.newPlayerPositionCallback = partita.newPlayerPosition;

	const name = Math.random().toString(36).substring(2, 15);
	partita.init(name);
	layerStack.addLayer(platformLayer);
}

function clearColorDefinition() {
	return [.15, .2, .2, 1];
}