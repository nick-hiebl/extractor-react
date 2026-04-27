import React, { useSyncExternalStore } from 'react';

import { GameManager } from '../game/manager';

type Props = {
	game: GameManager;
}

export const Game = ({ game }: Props) => {
	const state = useSyncExternalStore(game.externalStore.subscribe, game.externalStore.getSnapshot);
	console.log(state);

	return (
		<pre>{JSON.stringify(state)}</pre>
	);
};
