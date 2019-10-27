function Controls2D(up, left, down, right, speed) {

	this.up = up;
	this.left = left;
	this.down = down;
	this.right = right;

	this.getMoveVector = function (ts) {
		const left_f = input.isKeyDown(left);
		const right_f = input.isKeyDown(right);
		const up_f = input.isKeyDown(up);
		const down_f = input.isKeyDown(down);
		result = [0, 0];
		if (left_f ^ right_f) {
			if (left_f)
				result[0]--;
			else
				result[0]++;
		}
		if (up_f ^ down_f) {
			if (up_f)
				result[1]++;
			else
				result[1]--;
		}
		if (vec2.length(result) > 0) {
			vec2.normalize(result, result);
			result[0] *= speed * ts;
			result[1] *= speed * ts;
		}

		return result
	};

}