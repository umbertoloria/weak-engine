function Partita() {

	this.setMainPlayerCallback = null;
	this.playersUpdaterCallback = null;
	this.positionsUpdaterCallback = null;

	let conn;
	let state;

	this.init = function (name) {
		const ths = this;
		state = new HandshakeReceiverState(name);
		conn = new WebSocket("ws://localhost:8080/anticovid19/players");
		conn.onopen = function () {
			conn.send(MessageCommunicator.handshake_req(name));
		};
		conn.onmessage = function (evt) {
			// console.log("----------------------->", JSON.parse(evt.data));
			const newState = state.process(evt.data, ths);
			if (newState instanceof Object)
				state = newState;
		};
		conn.onclose = function () {
			console.log("connessione chiusa")
		};
	}

	this.newPlayerPosition = function (position) {
		const x = position[0];
		const z = position[2];
		if (conn.readyState === WebSocket.OPEN)
			conn.send(MessageCommunicator.position_imposer(x, z));
		else
			console.log("oddio, la connessione è saltata! Non posso comunicare la mia posizione...")
	}

}