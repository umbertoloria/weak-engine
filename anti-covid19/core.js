function layersDefinition(layerStack) {

	const partita = new Partita();
	const platformLayer = new PlatformLayer();

	partita.playerMovementCallback = platformLayer.playerMoved;
	partita.setMainPlayerCallback = platformLayer.setMainPlayer;
	partita.playersUpdaterCallback = platformLayer.playersUpdater;
	platformLayer.newPlayerPositionCallback = partita.newPlayerPosition;

	const name = Math.random().toString(36).substring(2, 15);
	/*const color = parseInt(Math.random() * 255) + ","
		+ parseInt(Math.random() * 255) + ","
		+ parseInt(Math.random() * 255);*/

	const color = [Math.random(), Math.random(), Math.random(), 1];

	partita.init(name, color);
	layerStack.addLayer(platformLayer);
}

function clearColorDefinition() {
	return [.15, .2, .2, 1];
}