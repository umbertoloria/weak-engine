function UpdatesReceiverState() {

	this.process = function (msg, partita) {
		const obj = JSON.parse(msg);
		if (obj.type === "positions_updater") {

			const positions = MessageCommunicator.positions_updater(obj);
			if (positions instanceof Object) {
				for (const playerName in positions) {
					const position = positions[playerName];
					partita.positionsUpdaterCallback(playerName, position.x, position.y);
				}
			} else {
				console.log("Oh no, c'è stato un errore di formato nel positions updater");
			}

		} else if (obj.type === "players_updater") {

			const playersInfo = MessageCommunicator.playersUpdater(obj);
			if (playersInfo instanceof Object)
				partita.playersUpdaterCallback(playersInfo);
			else
				console.log("oh no, non riesco a capire chi sono i partecipanti...")

		}
	}

}