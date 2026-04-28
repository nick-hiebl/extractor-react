import React, { useSyncExternalStore } from 'react';

import { GameManager } from '../game/manager';

import { WorldComponent } from './World';

type Props = {
	game: GameManager;
}

export const Game = ({ game }: Props) => {
	const { state } = useSyncExternalStore(game.externalStore.subscribe, game.externalStore.getSnapshot);

	if (state === 'world') {
		return (
			<WorldComponent world={game.world} />
		);
	}

	return (
		<pre>{JSON.stringify(state)}</pre>
	);
};
