function Partita() {

	const ths = this;
	let conn;

	this.playerMovementCallback = null;
	this.playersUpdaterCallback = null;
	this.setMainPlayerCallback = null;

	let name;

	this.newPlayerPosition = function (position) {
		const x = position[0];
		const z = position[2];
		if (conn.readyState === WebSocket.OPEN) {
			const msg = MessageCommunicator.position_imposer(x, z)
			conn.send(msg);
		} else {
			console.log("oddio, la connessione è saltata! Non posso comunicare la mia posizione...")
		}
	}

	this.init = function (name_) {
		name = name_;
		conn = new WebSocket("ws://localhost:8080/anticovid19/players");
		conn.onopen = function () {
			conn.send(MessageCommunicator.handshake_req(name));
		};
		conn.onmessage = arriva_messaggio;
		conn.onclose = connessione_chiusa;
	}

	const Attesa = {
		NON_ASPETTO: 0,
		ASPETTO_PLAYERS_UPDATER: 1
	};

	let aspetto_qualcosa = Attesa.ASPETTO_PLAYERS_UPDATER;

	function arriva_messaggio(evt) {
		const obj = JSON.parse(evt.data);
		// console.log("----------------------->", obj);
		if (aspetto_qualcosa === Attesa.ASPETTO_PLAYERS_UPDATER) {
			aspetto_qualcosa = Attesa.NON_ASPETTO;
			const playersInfo = MessageCommunicator.playersUpdater(obj);
			if (playersInfo instanceof Object) {
				ths.setMainPlayerCallback(name);
				ths.playersUpdaterCallback(playersInfo);
			} else {
				console.log("oh no, non riesco a capire chi sono i partecipanti...")
			}
		} else {

			if (obj.type === "positions_updater") {

				const positions = MessageCommunicator.positions_updater(obj);
				if (positions instanceof Object) {
					for (const playerName in positions) {
						const position = positions[playerName];
						if (ths.playerMovementCallback instanceof Function)
							ths.playerMovementCallback(playerName, position.x, position.y);
					}
				} else {
					console.log("Oh no, c'è stato un errore di formato nel positions updater");
				}

			} else if (obj.type === "players_updater") {

				const playersInfo = MessageCommunicator.playersUpdater(obj);
				if (playersInfo instanceof Object)
					ths.playersUpdaterCallback(playersInfo);
				else
					console.log("oh no, non riesco a capire chi sono i partecipanti...")

			}

		}
	}

	function connessione_chiusa() {
		console.log("connessione chiusa")
	}

}