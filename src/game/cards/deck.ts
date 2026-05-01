let n = 0;
export const getCardId = () => {
	return n++;
};

export type Tag =
	| 'single-use'
	| 'fleeting';

export type Effect =
	| { type: 'move'; amount: number }
	| { type: 'pick-up' };

export type Card = {
	name: string;
	id: number;
	tags: Tag[];
	effect: (context: CardPlayContext) => void;
	text: string;
};

export type Deck = {
	hand: Card[];
	discard: Card[];
	destroyed: Card[];
	draw: Card[];
};

export const setUpDeck = (cardList: Card[]): Deck => {
	return {
		hand: [],
		discard: [],
		destroyed: [],
		draw: cardList.slice(),
	};
};

const moveEffect = (num: number) => (context: CardPlayContext) => context.gainMove(num);

const GoCard = (): Card => ({
	name: 'Go!',
	id: getCardId(),
	tags: [],
	effect: moveEffect(5),
	text: 'Move 5',
});

const RunCard = (): Card => ({
	name: 'Run!',
	id: getCardId(),
	tags: [],
	effect: moveEffect(8),
	text: 'Move 8',
});

const GrabCard = (): Card => ({
	name: 'Grab!',
	id: getCardId(),
	tags: ['single-use'],
	effect: context => context.gainPickUp(1),
	text: 'Pick up',
});

export const createDefaultCardList = (): Card[] => {
	return [
		GoCard(),
		GoCard(),
		GoCard(),
		GoCard(),
		GoCard(),
		RunCard(),
		GrabCard(),
	];
};
