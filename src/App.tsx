import React, { useEffect, useRef, useState } from 'react';

import { GameManager } from './game/manager';
import { Game } from './components/Game';

let global_game;

export const App = () => {
	const [game, setGame] = useState<GameManager | undefined>();
	const done = useRef<boolean>(false);

	useEffect(() => {
		if (done.current) {
			return;
		}

		done.current = true;
		global_game = new GameManager()

		global_game.start();

		setGame(global_game);
	}, []);

	return (
		<div>
			<header className="App-header">
				<h1>Extractor</h1>
				<canvas id="canvas" width="800" height="600"></canvas>
				{game && <Game game={game} />}
			</header>
		</div>
	);
}
