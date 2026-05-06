import { chooseRandom } from '../../common/random-utils';

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

export const drawCards = (deck: Deck, numCards: number): Deck => {
	const drawnCards = chooseRandom(deck.draw, numCards);

	// If we already have enough cards or can't reshuffle discard anyway, only draw these cards
	if (drawnCards.length === numCards || deck.discard.length === 0) {
		return {
			...deck,
			hand: deck.hand.concat(drawnCards),
			draw: deck.draw.filter(c => !drawnCards.some(drawnCard => drawnCard.id === c.id)),
		};
	}

	// Need to reshuffle from discard potentially
	const drawnFromDiscard = chooseRandom(deck.discard, numCards - drawnCards.length);
	return {
		...deck,
		hand: deck.hand.concat(...drawnCards, ...drawnFromDiscard),
		discard: [],
		draw: deck.discard.filter(c => !drawnFromDiscard.some(drawnCard => drawnCard.id === c.id)),
	};
};

export const playCard = (deck: Deck, cardId: number): Deck => {
	return {
		...deck,
		hand: deck.hand.filter(c => c.id !== cardId),
		discard: deck.discard.concat(deck.hand.filter(c => c.id === cardId)),
	};
};

export const destroyCard = (deck: Deck, cardId: number): Deck => {
	const theCard = [...deck.discard, ...deck.draw, ...deck.hand].find(c => c.id === cardId);

	if (!theCard) {
		return deck;
	}

	return {
		...deck,
		hand: deck.hand.filter(c => c.id !== cardId),
		draw: deck.draw.filter(c => c.id !== cardId),
		discard: deck.discard.filter(c => c.id !== cardId),
		destroyed: deck.destroyed.concat(theCard),
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
