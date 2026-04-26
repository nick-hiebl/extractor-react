export const approach = (currentValue: number, step: number, target: number): number => {
	step = Math.abs(step);

	if (currentValue > target) {
		return Math.max(target, currentValue - step);
	} else if (currentValue < target) {
		return Math.min(target, currentValue + step);
	}

	return target;
};
