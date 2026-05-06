import { type Card, type Deck, destroyCard, drawCards, playCard, setUpDeck } from '../cards/deck';
import { createGrid } from '../../common/grid-utils';
import { Vector } from '../../common/vector';
import { Canvas } from '../../dom/canvas';
import { createExternalStore, type ExternalStore } from '../../state/external-store';

import { Player } from './player';

type Cell = null | true;

const SCALE = 16;

const WORLD_WIDTH = 20;
const WORLD_HEIGHT = 10;

type RunningState = {
	moves: number;
	pickUps: number;
};

export class World {
	grid: Cell[][];
	screen: Canvas;

	deck: Deck;

	deckWatcher: ExternalStore<Deck>;
	stateWatcher: ExternalStore<RunningState>;

	player: Player;

	runningState: RunningState;

	constructor(cardList: Card[]) {
		this.grid = createGrid(WORLD_HEIGHT, WORLD_WIDTH, () => Math.random() > 0.7 ? true : null);

		this.screen = Canvas.create(WORLD_WIDTH * SCALE, WORLD_HEIGHT * SCALE);

		this.deck = drawCards(setUpDeck(cardList), 5);

		this.deckWatcher = createExternalStore(() => this.deck);

		this.player = new Player(Vector.zero());

		this.runningState = { moves: 0, pickUps: 0 };

		this.stateWatcher = createExternalStore(() => this.runningState);
	}

	move(x: number, y: number) {
		if (this.runningState.moves <= 0) {
			return;
		}

		const nextPos = this.player.pos.add(new Vector(x, y));

		if (this.grid[nextPos.y][nextPos.x]) {
			return;
		}

		this.player.pos = nextPos;
		this.runningState = { ...this.runningState, moves: this.runningState.moves - 1 };

		this.stateWatcher.triggerUpdate();

		this.draw();
	}

	createCardPlayContext(): CardPlayContext & { anyChanges: () => boolean } {
		let anyStateChanges = false;

		return {
			gainMove: (moves: number) => {
				this.runningState.moves += moves;
				anyStateChanges = true;
			},
			gainPickUp: (pickUps: number) => {
				this.runningState.pickUps += pickUps;
				anyStateChanges = true;
			},
			anyChanges: () => anyStateChanges,
		};
	}

	playCard(cardId: number) {
		const foundCard = this.deck.hand.find(c => c.id === cardId);

		if (!foundCard) {
			return;
		}

		const context = this.createCardPlayContext();
		foundCard.effect(context);

		if (context.anyChanges()) {
			this.runningState = { ...this.runningState };
			this.stateWatcher.triggerUpdate();
		}

		if (foundCard.tags.includes('single-use')) {
			this.deck = destroyCard(this.deck, cardId);
		} else {
			this.deck = playCard(this.deck, cardId);
		}
		this.deckWatcher.triggerUpdate();
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

		ctx.fillStyle = 'skyblue';
		ctx.fillRect(this.player.pos.x * SCALE + INSET, this.player.pos.y * SCALE + INSET, SCALE - 2 * INSET, SCALE - 2 * INSET);
	}
}
