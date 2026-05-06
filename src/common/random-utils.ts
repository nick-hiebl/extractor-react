export const chooseRandom = <T>(items: T[], num: number): T[] => {
	return items.reduce((chosen: T[], item: T, index: number) => {
		const stillNeeded = num - chosen.length;
		if (stillNeeded <= 0) {
			return chosen;
		}

		const stillAvailable = items.length - index;

		if (Math.random() < stillNeeded / stillAvailable) {
			return chosen.concat(item);
		}

		return chosen;
	}, []);
};
