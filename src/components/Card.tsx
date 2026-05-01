import React from 'react';

import { Card } from '../game/cards/deck';

import './Card.css';

type Props = {
	card: Card;
};

export const CardComponent = ({ card }: Props) => {
	return (
		<div className="column card">
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
