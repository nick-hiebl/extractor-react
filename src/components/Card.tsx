import React from 'react';

import { Card } from '../game/cards/deck';

import './Card.css';

type Props = {
	card: Card;
};

export const CardComponent = ({ card }: Props) => {
	return (
		<div className="stack card">
			<span>{card.name}</span>
		</div>
	);
};
