import { Vector } from '../common/vector';
import { Canvas } from '../dom/canvas';

import { InputManager } from './input';
import { World } from './world';

export class GameManager {
	input: InputManager;
	screen: Canvas;

	world: World;

	camera: Vector;

	constructor() {
		this.input = new InputManager();
		this.screen = Canvas.fromId('canvas');

		this.world = new World();

		this.camera = Vector.zero();
	}

	start() {
		this.input.start();

		let lastTime = performance.now();

		const mainLoop = () => {
			const currentTime = performance.now();

			const elapsedTime = currentTime - lastTime;
			lastTime = currentTime;

			this.mainStep(elapsedTime);

			requestAnimationFrame(mainLoop);
		};

		this.world.draw();

		requestAnimationFrame(mainLoop);
	}

	mainStep(elapsedTime: number) {
		const MAX_DELTA = 250;

		const deltaTime = Math.min(elapsedTime, MAX_DELTA);

		this.update(deltaTime);
		this.draw();
	}

	update(deltaTime: number) {
		const CAMERA_SPEED = 0.3;

		let dx = 0, dy = 0;
		if (this.input.isPressed('up')) {
			dy -= 1;
		}
		if (this.input.isPressed('down')) {
			dy += 1;
		}
		if (this.input.isPressed('left')) {
			dx -= 1;
		}
		if (this.input.isPressed('right')) {
			dx += 1;
		}

		this.camera = this.camera.add(new Vector(dx, dy).scale(deltaTime * CAMERA_SPEED));
	}

	draw() {
		const ctx = this.screen.ctx;

		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, this.screen.width, this.screen.height);

		ctx.save();

		ctx.translate(this.screen.width / 2, this.screen.height / 2);

		ctx.translate(-this.camera.x, -this.camera.y);

		ctx.drawImage(this.world.screen.element, 0, 0);

		ctx.restore();
	}
}
