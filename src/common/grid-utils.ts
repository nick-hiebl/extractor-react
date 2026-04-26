export const createGrid = <T>(rows: number, columns: number, createCell: (row: number, column: number) => T): T[][] => {
	const grid = [];

	for (let i = 0; i < rows; i++) {
		const row = [];

		for (let j = 0; j < columns; j++) {
			row.push(createCell(i, j));
		}

		grid.push(row);
	}

	return grid;
};
