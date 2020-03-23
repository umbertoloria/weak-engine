function HandshakeReceiverState(name) {

	this.process = function (msg, partita) {
		const obj = JSON.parse(msg);
		const playersInfo = MessageCommunicator.playersUpdater(obj);
		if (playersInfo instanceof Object) {
			partita.setMainPlayerCallback(name);
			partita.playersUpdaterCallback(playersInfo);
		} else {
			console.log("oh no, non riesco a capire chi sono i partecipanti...")
		}
		return new UpdatesReceiverState();
	}

}