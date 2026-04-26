import React, { useEffect } from 'react';

import { GameManager } from './game/manager';

export const App = () => {
	useEffect(() => {
		const game = new GameManager();

		game.start();
	});

	return (
		<div>
			<header className="App-header">
				<h1>Extractor</h1>
				<canvas id="canvas" width="800" height="600"></canvas>
			</header>
		</div>
	);
}
