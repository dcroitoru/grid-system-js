export const create = (grid) => ({
	unhighlightCell: ({ x, y }) => {
		if (!grid[y][x].data?.allow) return;
		grid[y][x].data = {
			...grid[y][x].data,
			allow: false
		};
	},

	highlightCell: ({ x, y }) => {
		if (grid[y][x].data?.allow) return;
		grid[y][x].data = {
			...grid[y][x].data,
			allow: true
		};
	},

	highlight: (startCell, endCell) => {
		console.log('');

		// const rect = createRect(startCell, cell);
		// highlighted.map(unhighlightCell);
		// highlighted = rect.map(toXY);
		// highlighted.map(highlightCell);
		// console.log('should hilight rect', rect);
	},

	performAction: (start, end) => {
		console.log('should perform action on', start, end);
		console.log('what is the current selected tool?');
	}
});
