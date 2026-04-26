type Inputs = 'left' | 'right' | 'up' | 'down';

/**
 * Later this will need to read user input preferences
 */
const KEY_TO_INPUTS: Record<string, Inputs> = {
	'KeyW': 'up',
	'KeyA': 'left',
	'KeyS': 'down',
	'KeyD': 'right',
};

export class InputManager {
	map: Record<string, boolean>;

	constructor() {
		this.map = {};
	}

	start() {
		document.addEventListener('keydown', e => {
			const input = KEY_TO_INPUTS[e.code];
			this.map[input] = true;
		});

		document.addEventListener('keyup', e => {
			const input = KEY_TO_INPUTS[e.code];
			this.map[input] = false;
		});
	}

	isPressed(input: Inputs) {
		return !!this.map[input];
	}
}
