import React from 'react'

import { Card } from '../game/cards/deck'

import './Card.css'

type Props = {
	card: Card
	onClick?: () => void
	removed?: boolean
}

export const CardComponent = ({ card, onClick, removed }: Props) => {
	return (
		<div className="column card" onClick={onClick} data-removed={removed}>
			<div className="card-title">{card.name}</div>
			<div className="card-bottom">
				<span>{card.text}</span>
				{card.tags.map(tag => (
					<span key={tag}>{tag}</span>
				))}
			</div>
		</div>
	)
}
