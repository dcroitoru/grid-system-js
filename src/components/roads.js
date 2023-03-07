// const roads = [createSegment(0, 0, 4), createSegment(0, 2, 4, true)];
// roads.map((road) => createGridRoad(road));

import { calcNeighbours } from './grid';
import { max } from './util';

// const newRoads = [createSegment(0, 1, 6), createSegment(1, 2, 4, true)];
// newRoads.map((road) => createGridRoad(road, 2));

export const canPlaceRoad = (grid) => (cell) => {
	const { x, y } = cell;
	const s = calcNeighbours(grid)(x, y);
	grid[y][x].s = s;
	const maxs = s.reduce(max);
	const allow = maxs < 3;

	return allow;
};
