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
	effects: Effect[];
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

export const createDefaultCardList = (): Card[] => {
	return [
		{
			name: 'Go!',
			id: getCardId(),
			tags: [],
			effects: [{ type: 'move', amount: 5 }],
		},
		{
			name: 'Go!',
			id: getCardId(),
			tags: [],
			effects: [{ type: 'move', amount: 5 }],
		},
		{
			name: 'Go!',
			id: getCardId(),
			tags: [],
			effects: [{ type: 'move', amount: 5 }],
		},
		{
			name: 'Go!',
			id: getCardId(),
			tags: [],
			effects: [{ type: 'move', amount: 5 }],
		},
		{
			name: 'Go!',
			id: getCardId(),
			tags: [],
			effects: [{ type: 'move', amount: 5 }],
		},
		{
			name: 'Run!',
			id: getCardId(),
			tags: [],
			effects: [{ type: 'move', amount: 8 }],
		},
		{
			name: 'Grab',
			id: getCardId(),
			tags: ['single-use'],
			effects: [{ type: 'pick-up' }],
		},
	];
};
