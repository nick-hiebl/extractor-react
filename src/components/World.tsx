import React, { useSyncExternalStore } from 'react';

import { World } from '../game/world';

import { CardComponent } from './Card';
import { Card } from '../game/cards/deck';

type CardArrayProps = {
	cards: Card[];
	title: React.ReactNode;
};

const CardArray = ({ cards, title }: CardArrayProps) => {
	return (
		<div className="column">
			{title}
			<div className="row">
				{cards.map(card => (
					<CardComponent key={card.id} card={card} />
				))}
			</div>
		</div>
	)
};

type Props = {
	world: World;
};

export const WorldComponent = ({ world }: Props) => {
	const deck = useSyncExternalStore(world.deckWatcher.subscribe, world.deckWatcher.getSnapshot);

	return (
		<div>
			<CardArray cards={deck.draw} title="Draw pile" />
			<CardArray cards={deck.hand} title="Hand" />
			<CardArray cards={deck.discard} title="Discard" />
			<CardArray cards={deck.destroyed} title="Destroyed" />
		</div>
	);
};
