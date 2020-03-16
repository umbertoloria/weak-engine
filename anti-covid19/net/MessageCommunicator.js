const MessageCommunicator = {
	handshake_req: function (name) {
		const data = {
			type: "handshake_req",
			name: name
		};
		return JSON.stringify(data);
	},
	playersUpdater: function (obj) {
		if (!obj.hasOwnProperty("type") || obj.type !== "players_updater")
			return null;
		if (!obj.hasOwnProperty("players"))
			return null;
		const res = {};
		for (const playerName in obj.players) {
			const player = obj.players[playerName];
			if (!player.hasOwnProperty("position_x") || !player.hasOwnProperty("position_y")
				|| !player.hasOwnProperty("color"))
				return null;
			const color = player.color.split(",")
			color[0] /= 255;
			color[1] /= 255;
			color[2] /= 255;
			color[3] = 1;
			res[playerName] = {x: player.position_x, y: player.position_y, color: color};
		}
		return res;
	},
	handshake_resp: function (msg) {
		const obj = JSON.parse(msg);
		if (!obj.hasOwnProperty("type") || obj.type !== "handshake_resp")
			return false;
		if (!obj.hasOwnProperty("response"))
			return false;
		return obj.response === "ok";
	},
	positions_updater: function (obj) {
		if (!obj.hasOwnProperty("type") || obj.type !== "positions_updater")
			return null;
		if (!obj.hasOwnProperty("positions"))
			return null;
		const res = {};
		for (const playerName in obj.positions) {
			const player_position = obj.positions[playerName];
			res[playerName] = {
				x: player_position.position_x,
				y: player_position.position_y
			};
		}
		return res;
	},
	position_imposer: function (x, y) {
		return JSON.stringify({
			type: "position_imposer",
			position_x: x,
			position_y: y
		});
	}
};