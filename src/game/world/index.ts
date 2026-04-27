import { type Card, type Deck, setUpDeck } from '../cards/deck';
import { createGrid } from '../../common/grid-utils';
import { Canvas } from '../../dom/canvas';

type Cell = null | true;

const SCALE = 16;

const WORLD_WIDTH = 20;
const WORLD_HEIGHT = 10;

export class World {
	grid: Cell[][];
	screen: Canvas;

	deck: Deck;

	constructor(cardList: Card[]) {
		this.grid = createGrid(WORLD_HEIGHT, WORLD_WIDTH, () => Math.random() > 0.7 ? true : null);

		this.screen = Canvas.create(WORLD_WIDTH * SCALE, WORLD_HEIGHT * SCALE);

		this.deck = setUpDeck(cardList);
	}

	draw() {
		const ctx = this.screen.ctx;

		const INSET = 5;

		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, this.screen.width, this.screen.height);

		ctx.fillStyle = '#fff4';
		ctx.beginPath();

		for (let r = 0; r < this.grid.length; r++) {
			for (let c = 0; c < this.grid[r].length; c++) {
				if (!this.grid[r][c]) {
					ctx.rect(c * SCALE + INSET, r * SCALE + INSET, SCALE - 2 * INSET, SCALE - 2 * INSET);
				}
			}
		}

		ctx.fill();

		ctx.fillStyle = 'red';
		ctx.beginPath();

		for (let r = 0; r < this.grid.length; r++) {
			for (let c = 0; c < this.grid[r].length; c++) {
				if (this.grid[r][c]) {
					ctx.rect(c * SCALE, r * SCALE, SCALE, SCALE);
				}
			}
		}

		ctx.fill();
	}
}
