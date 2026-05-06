import React, { useEffect, useSyncExternalStore } from 'react';

import { World } from '../game/world';

import { CardComponent } from './Card';
import { Card } from '../game/cards/deck';
import { useExternalStore } from '../state/external-store';

type CardArrayProps = {
	cards: Card[];
	title: React.ReactNode;
	onPlay: (cardId: number) => void;
};

const CardArray = ({ cards, title, onPlay }: CardArrayProps) => {
	return (
		<div className="column">
			{title}
			<div className="row">
				{cards.map(card => (
					<CardComponent key={card.id} card={card} onClick={() => onPlay(card.id)} />
				))}
			</div>
		</div>
	)
};

type Props = {
	world: World;
};

export const WorldComponent = ({ world }: Props) => {
	const deck = useExternalStore(world.deckWatcher);
	const state = useExternalStore(world.stateWatcher);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowDown') {
				world.move(0, 1);
			} else if (e.key === 'ArrowLeft') {
				world.move(-1, 0);
			} else if (e.key === 'ArrowUp') {
				world.move(0, -1);
			} else if (e.key === 'ArrowRight') {
				world.move(1, 0);
			}
		};

		document.addEventListener('keydown', onKeyDown);

		return () => {
			document.removeEventListener('keydown', onKeyDown);
		};
	}, []);

	return (
		<div>
			<div>Moves: {state.moves}</div>
			<div>Pick-ups: {state.pickUps}</div>
			<div>Draw pile: {deck.draw.length}</div>
			<CardArray
				cards={deck.hand}
				title="Hand"
				onPlay={cardId => {
					world.playCard(cardId);
				}}
			/>
			<div>Discard pile: {deck.discard.length}</div>
			<div>Destroyed pile: {deck.destroyed.length}</div>
		</div>
	);
};
