import React, { useEffect, useState } from 'react'

import { World } from '../game/world'

import { CardComponent } from './Card'
import { Card } from '../game/cards/deck'
import { useExternalStore } from '../state/external-store'

type CardArrayProps = {
	cards: Card[]
	title: React.ReactNode
	onPlay: (cardId: number) => void
}

type CardWithUiMetadata = {
	card: Card
	removed?: boolean
}

const PLAY_ANIMATION_DURATION = 500

const CardArray = ({ cards, title, onPlay }: CardArrayProps) => {
	const [myCards, setMyCards] = useState<CardWithUiMetadata[]>(cards.map(card => ({ card })))

	useEffect(() => {
		if (cards.length === myCards.length && cards.every(card => myCards.some(c => c.card.id === card.id))) {
			return
		}

		const notRemovingCards = myCards.filter(c => !c.removed)

		if (cards.length === notRemovingCards.length) {
			return
		}

		const cardsToRemoveIds = myCards
			.filter(({ card }) => !cards.some(c => c.id === card.id))
			.map(({ card }) => card.id)

		const removedCardIdSet = new Set(cardsToRemoveIds)

		setMyCards(currentHand => {
			return currentHand.map(({ card, removed }) => {
				if (removedCardIdSet.has(card.id)) {
					return { card, removed: true }
				}

				return { card, removed }
			})
		})

		setTimeout(() => {
			setMyCards(currentHand => {
				return currentHand.filter(c => !removedCardIdSet.has(c.card.id) || !c.removed)
			})
		}, PLAY_ANIMATION_DURATION)
	}, [cards, myCards])

	return (
		<div className="column">
			{title}
			<div className="row">
				{myCards.map(({ card, removed }) => (
					<CardComponent key={card.id} card={card} onClick={() => onPlay(card.id)} removed={removed} />
				))}
			</div>
		</div>
	)
}

type Props = {
	world: World
}

export const WorldComponent = ({ world }: Props) => {
	const deck = useExternalStore(world.deckWatcher)
	const state = useExternalStore(world.stateWatcher)

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowDown') {
				world.move(0, 1)
			} else if (e.key === 'ArrowLeft') {
				world.move(-1, 0)
			} else if (e.key === 'ArrowUp') {
				world.move(0, -1)
			} else if (e.key === 'ArrowRight') {
				world.move(1, 0)
			}
		}

		document.addEventListener('keydown', onKeyDown)

		return () => {
			document.removeEventListener('keydown', onKeyDown)
		}
	}, [world])

	return (
		<div>
			<div>Moves: {state.moves}</div>
			<div>Pick-ups: {state.pickUps}</div>
			<div>Draw pile: {deck.draw.length}</div>
			<CardArray
				cards={deck.hand}
				title="Hand"
				onPlay={cardId => {
					world.playCard(cardId)
				}}
			/>
			<div>Discard pile: {deck.discard.length}</div>
			<div>Destroyed pile: {deck.destroyed.length}</div>
		</div>
	)
}
