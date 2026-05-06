import React from 'react';

import { Card } from '../game/cards/deck';

import './Card.css';

type Props = {
	card: Card;
	onClick?: () => void;
};

export const CardComponent = ({ card, onClick }: Props) => {
	return (
		<div className="column card" onClick={onClick}>
			<div className="card-title">{card.name}</div>
			<div className="card-bottom">
				<span>{card.text}</span>
				{card.tags.map(tag => (
					<span key={tag}>{tag}</span>
				))}
			</div>
		</div>
	);
};
